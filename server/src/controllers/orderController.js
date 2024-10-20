const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient
const { Decimal } = require('@prisma/client');
const utils = require("../utils/utils");

class orderController {

    static async newOrder (req, res) {
        try {

            const {cartsIds} = req.body
            const userCarts = await utils.getAllCarts(parseInt(req.params.user_id))

            if (userCarts.length === 0)
                return res.status(204).json({"message": "the given user has no carts yet!"})
            const hasItems = userCarts.some((aCart)=> {
                return aCart.items.length > 0
            })
            if (!hasItems)
                return res.status(400).json({"message": "at least one cart of given cart must have items"})
            let found = 0;
            for (let i = 0; i < cartsIds.length; i++) {
                found = 0
                for (let j = 0; j < userCarts.length; j++) {
                    if (userCarts[j].id === cartsIds[i]) {
                        found = 1
                        break
                    }
                }
                if (found)
                    continue
                break
            }
            if (!found)
                return res.status(401).json({"message": "one of the cart IDs doesn't belong to the given user"})

            const orderCarts = userCarts.filter((aCart) => cartsIds.includes(aCart.id));
            
            const hasInvalidCart = orderCarts.some((aCart) => {
                return aCart.Order && (aCart.Order.order_status !== "completed" && aCart.Order.order_status != "canceled")
            })

            if (hasInvalidCart)
                return res.status(400).json({"message": "one or more of the given cart is already in order"})

            let totalPrice = 0
            for (let i = 0; i < orderCarts.length; i++) {
                for (let j = 0; j < orderCarts[i].items.length; j++){
                    totalPrice += (orderCarts[i].items[j].book.price * orderCarts[i].items[j].quantity)
                }
            }
            
            const newOrder = await prisma.order.create({
                data: {
                    carts: {
                        connect: orderCarts.map(aCart => ({ id: parseInt(aCart.id) })),
                    },
                    user: {
                        connect: { id: parseInt(req.params.user_id) },
                    },
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    pendingTime: utils.getDates()["pendingTime"],
                    deliveryDate: utils.getDates()["deliveringDate"],
                    address: req.params.address,
                    phone_number: req.params.number,
                    order_status: "pending",
                    payementMethod: req.params.payement,
                    total_price: new Decimal(totalPrice),
                },
            });
            if (!newOrder)
                return res.status(500).json({"message": "can't create new order"})

            req.session.user = await utils.getUpdatedUser(parseInt(req.params.user_id))
            const updatedOrders = await utils.getAllOrders(parseInt(req.params.user_id))
            if ("error" in updatedOrders)
                return res.status(500).json("an error occur while fetching user orders")
            return res.status(200).json({
                "message": "order created successfully",
                "orders": updatedOrders
            })
        } catch(error) {
            return res.status(500).json({"message": "can't create new order"})
        }
    }

    static async addCartToOrder(req, res) {
        try {
            const {user_id, order_id, cart_id} = req.params
            const order = await prisma.order.findFirst({
                where: {id: parseInt(order_id), user_id: parseInt(user_id)}
            })
            if (!order)
                return res.status(400).json({"message": "no order found with given id to given user"})

            const cart = await prisma.cart.findFirst({
                where: {id: parseInt(cart_id), user_id: parseInt(user_id)},
                include: {items: {include: {book: true}}, Order: true}
            })
            if (!cart)
                return res.status(400).json({"message": "user cart not found"})

            if (cart.Order && (cart.Order_status !== "completed" && cart.Order_status != "canceled"))
                return res.status(400).json({"message": "given cart is already in order"})

            const totalPrice = new Decimal(order.total_price).plus(
                cart.items.reduce((acc, item) => {
                  return acc + item.book.price * item.quantity;
                }, 0)
            );

            const updated = await prisma.order.update({
                where: {id: parseInt(order_id)},
                data: {
                    carts: {
                        connect: {id: parseInt(cart_id)}
                    },
                    updatedAt: new Date().toISOString(),
                    total_price: totalPrice,
                    order_status: "pending" ,
                    pendingTime: utils.getDates()["pendingTime"],
                    deliveryDate: utils.getDates()["deliveringDate"],
                }
            })
            req.session.user = await utils.getUpdatedUser(parseInt(user_id))
            const userOrders = await utils.getAllOrders(parseInt(user_id))
            return res.status(200).json({
                "message": "new cart added successfully to order",
                orders: userOrders
            })
        } catch(error) {
            console.log(error)
            return res.status(500).json({"message": "an error occour while fetching db"})
        }
    }

    static async deleteCartFromOrder(req, res) {
        const {user_id, order_id, cart_id} = req.params
        try {
            const cart = await prisma.cart.findFirst({
                where: {id: parseInt(cart_id),
                    Order: {
                        id: parseInt(order_id)
                    }
                },
                include: {items: {include: {book: true}}, Order: true}
            })
            if (!cart)
                return res.status(400).json({"message": "can't found cart in order"})
            const deletedCart = await prisma.order.update({
                where: {id: parseInt(order_id)},
                data: {
                    carts:{
                        disconnect:{
                            id: parseInt(cart_id)
                        }
                    },
                    pendingTime: utils.getDates()["pendingTime"],
                    deliveryDate: utils.getDates()["deliveringDate"],
                    order_status: "pending",
                    total_price: new Decimal(cart.Order.total_price - utils.getCartTotlaPrice(cart))
                }
            })
            req.session.user = await utils.getUpdatedUser(parseInt(user_id))
            const orders = await utils.getAllOrders(parseInt(user_id))

            return res.status(200).json({
                "message": "cart deleted successfully",
                orders: orders
            })
        } catch(error) {
            console.log(error)
            return res.status(500).json({"message": "an error occur while deleting cart"})
        }
    }

    // static async addItemToOrderCart(req, res) {
    //     const {user_id, cart_id, order_id, address, number, payement} = req.params
    //     try {
    //         // if (isNaN(number))
    //         //     return res.status(401).json({"message": "invalide phone Number"})
    //         if (payement !== 'cash' && payement !== "visa" && payement!= 'paypal') {
    //             return res.status(401).json({"message": "invalide payement method"})
    //         }
    //         let order = await prisma.order.findFirst({
    //             where: { id: parseInt(order_id) },
    //             include: { cart: { include: { items: { include: { book: true}}}}}
    //         })
    //         // if (!order) {
    //         //     return res.status(401).json({
    //         //         "message": "can't update order, order may not exist or already on the way"
    //         //     })
    //         // }
    //         let warningMessage = {}
    //         if (order && order.order_status === "completed") {
    //             warningMessage = {
    //                 "warning": `the same cart with the same items has been ordered before on ${order.createdAt} and deliverd on ${order.deliveryDate}`,
    //                 "solve": "you can cancel order within 1 hour if by mistake ordered again"
    //             }
    //         }

    //         const cart = await prisma.cart.findFirst({
    //             where: {
    //                 id: parseInt(cart_id),
    //                 user_id: parseInt(user_id)
    //             },
    //             include: {items: {include: {book: true}}}
    //         })
    //         if (!cart)
    //             return res.status(401).json({"message": "no cart with given id to user"})
    //         if (cart.items.length === 0)
    //             return res.status(401).json({"message": "cart is empty! add some items first"})

    //         const total_price = cart.items.reduce((sum, item) => sum + (Number(item.book.price) * Number(item.quantity)), 0)

    //         order = await prisma.order.create({
    //             data: {
    //                 cart: {connect: {id: parseInt(cart_id)}},
    //                 user: {connect: {id: parseInt(user_id)}},
    //                 total_price: new Decimal(total_price),
    //                 address: address,
    //                 phone_number: number,
    //                 order_status: "pending",
    //                 createdAt: new Date().toISOString(),
    //                 pendingTime: utils.getDates()["pendingTime"],
    //                 deliveryDate: utils.getDates()["deliveringDate"]
    //             },
    //             include: {cart: {include: {items: {include: {book: true}}}}}
    //         })
    //         if (!order)
    //             return res.status(500).json({"message": "can't create order"})
    //         const user = await utils.getUpdatedUser(parseInt(user_id))
    //         req.session.user = user
    //         return res.status(200).json({
    //             "message": "order created successfully",
    //             ...warningMessage,
    //             "order": order
    //         })
    //     } catch (error) {
    //         console.log(error)
    //         return res.status(500).json({"error": "each order can contains only a single cart"})
    //     }
    // }
    static async addItemToOrderCart(req, res) {
        try {
            const {user_id, order_id, cart_id, book_id, quantity} = req.params
            const cart = await prisma.cart.findFirst({
                where: {id: parseInt(cart_id),
                    Order:{
                        id: parseInt(order_id)
                    }
                },
                include: {items: {include: {book: true}}}
            })
            if(!cart)
                return res.status(400).json({"message": "no cart found with same id in order"})
            const book = await prisma.book.findFirst({
                where: {id: parseInt(book_id)}
            })
            if (!book)
                return res.status(401).json({"message": "no book exists with given id"})
            if (!utils.checkBookAvailablity(book, parseInt(quantity)))
                return res.status(401).json({"message": "book is not available with given quantity"})
            if (utils.checkIfBookExistsInCart(cart, book)) {
                return res.status(401).json({
                    "messasge": "item already exist in order",
                    "solve": "try to update the quantity instead"
                })
            }
            const cartItem = await prisma.cartItem.create({
                data: {
                    book: {connect: {id: book.id}},
                    cart: {connect: {id: cart.id}},
                    quantity: parseInt(quantity),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                },
                include: {book: true}
            })
            if (!cartItem)
                return res.status(401).json({"message": "can't add new item to order cart"})

            const order = await prisma.order.findUnique({
                where: { id: parseInt(order_id) },
                select: { total_price: true }
            });
            if (!order)
                return res.status(404).json({ message: "Order not found" });
            
            const updateOrder = await prisma.order.update({
                where: {id: parseInt(order_id)},
                data: {
                    total_price: new Decimal(Number(order.total_price) + Number(cartItem.book.price * cartItem.quantity))
                }
            })
            if (!updateOrder)
                return res.status(400).json({"message": "can't add item to cart"})
            req.session.user = await utils.getUpdatedUser(parseInt(user_id))
            return res.status(200).json({
                "message": "order updated successfully",
                "orders": await utils.getAllOrders(parseInt(user_id))
            })
        } catch(error) {
            console.log(error)
            return res.status(500).json("an error occurred")
        }
    }
    
    static async updateOrderItemQuantity(req, res) {
        try {
            const {user_id, order_id, cartItem_id, quantity} = req.params
            const order = await prisma.order.findFirst({
                where: {id: parseInt(order_id)},
                include: {cart: {include: {items: {include: {book: true}}}}}
            })
            if (!order)
                return res.status(400).json({"message": "can't get order with given id"})
            if (order.cart_id !== parseInt(cart_id))
                return res.status(401).json({"message": "no match between order and cartId"})
            let cartItemIndex = -1
            for (let i = 0 ; i < order.cart.items.length; i++) {
                if (parseInt(cartItem_id) === order.cart.items[i].id) {
                    cartItemIndex = i
                    break
                }
            }
            if (cartItemIndex === -1)
                return res.status(400).json({"message": "order cart doesn't have cartItem with given id"})
            if (!utils.checkBookAvailablity(order.cart.items[cartItemIndex].book, parseInt(quantity)))
                return res.status(400).json({"message": "too much quantity for the given book"})
            order.total_price -= order.cart.items[cartItemIndex].price * order.cart.items[cartItemIndex].quantity
            const newQuantity = Math.abs(order.cart.items[cartItemIndex].quantity - parseInt(quantity))
            const updateOrder = await prisma.order.update({
                where: {id: parseInt(order_id)},
                include: {cart: {include: {items: {include: {book: true}}}}},
                data: {
                    cart: {
                        upadate: {
                            items: {
                                update: {
                                    where: {id: parseInt(cartItem_id)},
                                    data: {
                                        quantity: parseInt(quantity)
                                    }
                                }
                            }
                        }
                    }
                },
                total_price: new Decimal(Number(order.total_price) + Number(order.cart.items[cartItemIndex].price * newQuantity)),
                order_status: "pending",
                updatedAt: new Date().toISOString(),
                pendingTime: utils.getDates()["pendingTime"],
                deliveryDate: utils.getDates()["deliveringDate"]
            })
            if (!updateOrder)
                return res.status(500).json({"message": "can't update order item quantity"})
            return res.status(200).json({
                "message": "order updated successfully",
                order: updateOrder
            })
        } catch(error) {
            return res.statue(500).json({"message": "an error occurred while updating order item quantity"})
        }
    }

    static async getOrders(req, res) {
        try {
            const orders = await prisma.order.findMany({
                where: {
                    user_id: parseInt(req.params.user_id)
                },
                include: {cart: {include: {items: {include: {book: true}}}}}
            })
            if (orders.length === 0)
                return res.status(200).json({"message": "user doesn't have any orders yet"})
            const user = await utils.getUpdatedUser(parseInt(req.params.user_id))
            req.session.user = user
            return res.status(200).json({
                "message": "orders read successfully",
                orders: orders
            })
        } catch (error) {
            return res.status(500).json({"message": "user doesn't have any orders yet"})
        }
    }

    static async getOrderById(req, res) {
        try {
            const {user_id, order_id} = req.params
            const order = await prisma.order.findFirst({
                where: {
                    id: parseInt(order_id),
                    user_id: parseInt(user_id)
                },
                include: {cart: {include: {items: {include: {book: true}}}}}
            })
            if (!order)
                return res.status(401).json({"message": "no order found with given id to the user"})
            const user = await utils.getUpdatedUser(parseInt(user_id))
            req.session.user = user
            return res.status(200).json({
                "message": "order read successfully",
                "order": order
            })
        } catch(error) {
            return res.status(500).json("an error occurred")
        }
    }
}

    // needs createAt logic
    // can cancel only while in bendig stage within one day of order
    // if cancelled state remove order
    // static async cancelOrder(req, res) {

    // }
    // static async afterOrder_DB_update() {

    // }
            // i will keep all carts and orders as it is even after delivering
            // for future reference if needed
            // will only decrease item quantity when order state is pending

module.exports = orderController