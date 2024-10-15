const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient
const { Decimal } = require('@prisma/client');
const utils = require("../utils/utils")

class orderController {

    static async addOrder(req, res) {
        const {user_id, cart_id, order_id, address, number, payement} = req.params
        try {

            if (isNaN(number))
                return res.status(401).json({"message": "invalide phone Number"})
            if (payement !== 'cash' && payement !== "visa") {
                console.log(payement)
                console.log(typeof payement)
                return res.status(401).json({"message": "invalide payement method"})
            }

            let order = await prisma.order.findFirst({
                where: { id: parseInt(order_id) },
                include: { cart: { include: { items: { include: { book: true}}}}}
            })
            if (order && (order.order_status === "delivering" || order.order_status === "pending"))
                return res.status(401).json({"message": `order with the same id is already on ${order.order_status}`})
            let warningMessage = {}
            if (order && order.order_status === "completed") {
                warningMessage = {
                    "warning": `the same cart with the same items has been ordered before on ${order.createdAt} and deliverd on ${order.deliveryDate}`,
                    "solve": "you can cancel order within 1 hour if by mistake ordered again"
                }
            }
            // above ensure that there is no active order with the same id
            const cart = await prisma.cart.findFirst({
                where: {
                    id: parseInt(cart_id),
                    user_id: parseInt(user_id)
                },
                include: {items: {include: {book: true}}}
            })
            if (!cart)
                return res.status(401).json({"message": "no cart with given id to user"})
            if (cart.items.length === 0)
                return res.status(401).json({"message": "cart is empty! add some items first"})

            const total_price = cart.items.reduce((sum, item) => sum + Number(item.book.price), 0)

            order = await prisma.order.create({
                data: {
                    cart: {connect: {id: parseInt(cart_id)}},
                    user: {connect: {id: parseInt(user_id)}},
                    total_price: new Decimal(total_price),
                    address: address,
                    phone_number: number,
                    order_status: "pending",
                    createdAt: new Date().toISOString(),
                    pendingTime: utils.getDates()["pendingTime"],
                    deliveryDate: utils.getDates()["deliveringDate"]
                },
                include: {cart: {include: {items: {include: {book: true}}}}}
            })
            if (!order)
                return res.status(500).json({"message": "can't create order"})
            return res.status(200).json({
                "message": "order created successfully",
                ...warningMessage,
                "order": order
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json("an error occurred")
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
            return res.status(200).json({
                "message": "orders read successfully",
                orders: orders
            })
        } catch (error) {
            console.log(error)
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
            return res.status(200).json({
                "message": "order read successfully",
                "order": order
            })
        } catch(error) {
            console.log(error)
            return res.status(500).json("an error occurred")
        }
    }

    static async UpdateOrder(req, res) {

        try {
            const {user_id, order_id, book_id, quantity} = req.params
            const order = await prisma.order.findFirst({
                where: {
                    id: parseInt(order_id),
                    order_status: "pending"
                },
                include: {cart: {include: {items: {include: {book: true}}}}, user: true}
            })

            if (!order) {
                return res.status(401).json({
                    "message": "can't update order, order may not exist or already on the way"
                })
            }
            if (order.payementMethod === 'visa')
                return res.status(401).json({"message": "only can update cash payement orders"})

            if (order.user.id !== parseInt(user_id))
                return res.status(401).json({"message": "invalide userId"})

            const book = await prisma.book.findFirst({
                where: {id: parseInt(book_id)}
            })
            if (!book)
                return res.status(401).json({"message": "no book exists with given id"})
            if (!utils.checkBookAvailablity(book, parseInt(quantity)))
                return res.status(401).json({"message": "book is not available with given quantity"})
            if (utils.checkIfBookExistsInCart(order.cart, book)) {
                return res.status(401).json({
                    "messasge": "item already exist in order",
                    "solve": "try to update the quantity instead"
                })
            }
            const cartItem = await prisma.cartItem.create({
                data: {
                    book: {connect: {id: book.id}},
                    cart: {connect: {id: order.cart_id},},
                    quantity: parseInt(quantity),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                },
                include: {book: true}
            })
            if (!cartItem)
                return res.status(401).json({"message": "can't add new item to order"})

            const updateOrder = await prisma.order.update({
                where: {id: order.id},
                include: {user: true, cart: {include: {items: {include: {book: true}}}}},
                data: {
                    cart: {
                        update: {
                            items: { connect: {id: cartItem.id}}
                        }
                    },
                    total_price: new Decimal(Number(order.total_price) + Number(cartItem.book.price)),
                    order_status: "pending",
                    updatedAt: new Date().toISOString(),
                    pendingTime: utils.getDates()["pendingTime"],
                    deliveryDate: utils.getDates()["deliveringDate"]
                }
            })
            if (!updateOrder)
                return res.status(401).json("can't update order")
            return res.status(200).json({
                "message": "order updated successfully",
                "order": order
            })

        } catch(error) {
            console.log(error)
            return res.status(500).json("an error occurred")
        }
    }

    // update order quantity
// if cancelled state remove order

    // needs createAt logic
    // can update only while in bendig stage within one day of order
    // static async updateOrder(req, res) {
    //     const {user_id, order_id} = req. params
    //     try {
    //         const order = prisma.order.findFirst({
    //             where: {
    //                 id: parseInt(order_id),
    //                 user_id: parseInt(user_id),
    //                 // order_status: "pendign "
    //             }
    //         })
    //         if (!order) {
    //             return res.status(401).json({"message": "no order exist with given id to user"})
    //         }
    //         if (order.order_status !== "pending")
    //             return res.status(401).json({"message": "can't update order, order is already on the way :)"})
    //         // cart can't be updated after order
    //         // change order state to Null untill update

    //     } catch (error) {

    //     }
    // }
    // needs createAt logic
    // can cancel only while in bendig stage within one day of order
    // static async cancelOrder(req, res) {

    // }
}
    // static async afterOrder_DB_update() {

    // }
            // i will keep all carts and orders as it is even after delivering
            // for future reference if needed
            // will only decrease item quantity when order state is pending

module.exports = orderController