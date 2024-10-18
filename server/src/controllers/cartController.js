const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient;
const utils = require("../utils/utils")

class cartController {

    static async getCarts(req, res) {
        try {
            const carts = await utils.getAllCarts(parseInt(req.params.user_id))
            if (carts.length === 0) {
                return res.status(200).json({
                    "message": "user has no carts yet",
                    "carts": carts
                })
            } else if ("error" in carts) {
                return res.status(500).json("an error occur while reading db")
            }
            return res.status(200).json({
                "message": "reading carts done successfully",
                carts: carts
            })
        } catch (error) {
            return res.status(500).json("an error occur while reading db")
        }
    }

    static async addCart(req, res) {
        try {
            const cart = await prisma.cart.create({
                data:{
                    user: {connect: {id: parseInt(req.params.user_id)}},
                    name: req.params.cart_name
                }
            })
            if (!cart) {
                return res.status(500).json({"message": "can't create cart to user"})
            }
            const user = await utils.getUpdatedUser(parseInt(req.params.user_id))
            req.session.user = user
            return res.status(200).json({
                "message": "cart created successfully",
                carts: await utils.getAllCarts(parseInt(req.params.user_id))
            })
        } catch(error) {
            console.log(error)
            return res.status(500).json({"message": "can't create a cart"})
        }
    }

    static async updateCartName(req, res) {
        try {
            const cart = await prisma.cart.update({
                where: {id: parseInt(req.params.cart_id)},
                data: {name: req.params.cart_name}
            })
            if (!cart) {
                return res.status(500).json({"message": "can't update cart name"})
            }
            const user = await utils.getUpdatedUser(parseInt(req.params.user_id))
            req.session.user = user
            return res.status(200).json({
                "message": "cart name updated successfully",
                carts: await utils.getAllCarts(parseInt(req.params.user_id))
            })
        } catch(error) {
            return res.status(500).json({"message": "can't update cart name"})
        }
    }

    static async getCartById(req, res) {
        const {user_id, cart_id} = req.params
        try {
            const cart = await prisma.cart.findFirst({
                where: { 
                    id: parseInt(cart_id),
                    user_id: parseInt(user_id)
                },
                include: {items: {include: {book: true}}}
            })
            if (!cart)
                return res.status(401).json({"message": "no matching exist between userId and cartId"})
            return res.status(200).json({
                "message": "reading cart done successfully",
                "cart": cart
            })
        } catch (error) {
            return res.status(500).json({"message": "error while reading cart"})
        }
    }

    static async deleteCart (req, res){
        try {
            const cart = await prisma.cart.findFirst({
                where: {id: parseInt(req.params.cart_id)},
                include: {Order: true}
            })
            if (!cart)
                return res.status(401).json({"message": "no cart exist with given id"})
            if (cart.Order) {
                if (cart.Order.length !== 0) {
                    if (cart.Order.order_status === "pending" || cart.Order.order_status === "delivering") {
                        return res.status(401).json({"message": "can't delete an active cart, use order route"})
                    }
                }
            }
            const deletedCart = await prisma.cart.delete({
                where: {id: parseInt(req.params.cart_id)}
            })
            if (!deletedCart)
                return res.status(500).json({"message": "can't delete cart"})
            const user = await utils.getUpdatedUser(parseInt(req.params.user_id))
            req.session.user = user
            return res.status(200).json({
                "message": "cart deleted successfully",
                carts: await utils.getAllCarts(parseInt(req.params.user_id))
            })
        } catch (error) {
            return res.status(500).json({"message": "can't delete cart"})
        }
    }

    static async emptyCart (req, res) {
        try {
            const cart = await prisma.cart.findFirst({
                where: {id: parseInt(req.params.cart_id)},
                include: {Order: true}
            })
            if (!cart)
                return res.status(401).json({"message": "no cart exist with given id"})
            if (cart.Order) {
                if (cart.Order.length !== 0) {
                    if (cart.Order.order_status === "pending" || cart.Order.order_status === "delivering") {
                        return res.status(401).json({"message": "can't empty active cart, use order route"})
                    }
                }
            }
            const items = await prisma.cartItem.deleteMany({
                where: {cart_id: parseInt(req.params.cart_id)}
            })
            if (!items)
                return res.status(401).json({"message": "cart is already empty"})
            const user = await utils.getUpdatedUser(parseInt(req.params.user_id))
            req.session.user = user
            return res.status(200).json({
                "message": "emptied successfully",
                carts: await utils.getAllCarts(req.session.user.id)
            })
        } catch(error){
            return res.status(500).json({"message": "can't empty cart"})
        }
    }

    static async addCartItem (req, res) {
        const {user_id, cart_id, book_id, quantity} = req.params
        try{
            const cart = await prisma.cart.findFirst({
                where: {id: parseInt(cart_id)},
                include: {Order: true, items: true}
            })
            // no check if cart doesn't exist
            // because we would create any way
            if (cart) {
                if (cart.Order) {
                    if (cart.Order.length !== 0) {
                        if (cart.Order.order_status === "pending" || cart.Order.order_status === "delivering") {
                            return res.status(401).json({"message": "can't add to active cart, use order route"})
                        }
                    }
                }
            }
            const book = await prisma.book.findFirst({
                where: {id: parseInt(book_id)}
            })
            if(!book)
                return res.status(401).json({"message": "no book exists with the given id"})
            if (!( utils.checkBookAvailablity(book, quantity))) {
                return res.status(401).json({
                    "message": "the book is not available with given quantity",
                    "solve": "try to decrease quantity"
                })
            }
            if (utils.checkIfBookExistsInCart(cart, book))
                return res.status(409).json({"message": "book already exist in cart! try to update quantity instead"})
            const cartItem = await prisma.cartItem.create({
                data: {
                    book: { connect: { id: parseInt(book_id) } },
                    quantity: parseInt(quantity),
                    cart: {
                        connectOrCreate:{
                            where: {
                                id: parseInt(cart_id),
                                user_id: parseInt(user_id)
                            },
                            create: {
                                user: { connect: { id: parseInt(user_id) } },
                            }
                        },
                    },
                },
            })
            if (!cartItem)
                return res.status(500).json({"message": "can't create cart item"})
            const user = await utils.getUpdatedUser(parseInt(user_id))
            req.session.user = user
            const carts = await utils.getAllCarts(parseInt(user_id))
            return res.status(200).json({
                "message": "item added to cart successfully",
                carts: carts
            })
        }catch(err){
            return res.status(500).json({"message": "error has occured"})
        }
    }
    static async deleteCartItem(req, res) {
        try {

            const cart = await prisma.cart.findFirst({
                where: {
                    id: parseInt(req.params.cart_id),
                    user_id: parseInt(req.params.user_id),
                },
                include: {items: true, Order: true}
            })
            if (!cart)
                return res.status(401).json({"message": "no cart exist with given id to given user"})
            if (cart.Order) {
                if (cart.Order.length !== 0) {
                    if (cart.Order.order_status === "pending" || cart.Order.order_status === "delivering") {
                        return res.status(401).json({"message": "can't delet an item of active cart, use order route"})
                    }
                }
            }
            // little algorithm to avoid new request to database
            let deletedItmeIndex = -1;
            for (let i = 0; i < cart.items.length; i++){
                if (cart.items[i].id === parseInt(req.params.cartItem_id)) {
                    deletedItmeIndex = i
                    break
                }
            }
            
            if (deletedItmeIndex == -1)
                return res.status(404).json({"message": "no cartItem exist in cart with given cartItemId"})
            const deletedItem = await prisma.cartItem.delete({
                where: {id: parseInt(req.params.cartItem_id)}
            })
            if (!deletedItem)
                return res.status(500).json({"message": "couldn't delete cartItem"})
            const user = await utils.getUpdatedUser(parseInt(req.params.user_id))
            req.session.user = user
            return res.status(200).json({
                "message": "cartItem deleted successfully",
                carts: await utils.getAllCarts(parseInt(req.params.user_id))
            })
        } catch(error) {
            return res.status(500).json({"message": "error occured while quering from database"})
        }
    }
    static async updateQuantity(req, res) {
        const {user_id, cart_id, cartItem_id, quantity} = req.params  
        try {
            const cart = await prisma.cart.findFirst({
                where: {
                    id: parseInt(cart_id),
                    user_id: parseInt(user_id),
                },
                include: {items: true, Order: true}
            })
            if (!cart)
                return res.status(401).json({"message": "no cart exist with given id to given user"})
            if (cart.Order) {
                if (cart.Order.length !== 0) {
                    if (cart.Order.order_status === "pending" || cart.Order.order_status === "delivering") {
                        return res.status(401).json({"message": "can't update quantity of active cart, use order route"})
                    }
                }
            }
            const cartItem = await prisma.cartItem.findFirst({
                where: {id: parseInt(cartItem_id)},
                include: {book: true}
            })
            if (!cartItem)
                return res.status(401).json({"message": "no cart item exists with given id"})
            if (cartItem.cart_id !== parseInt(cart_id))
                return res.status(401).json({"message": "cart doesn't have given cartItem"})
            if (!(utils.checkBookAvailablity(cartItem.book, parseInt(quantity))))
                return res.status(401).json("the book is not available with given quantity")
            const updatingItem = await prisma.cartItem.update({
                where: {
                    id: parseInt(cartItem_id),
                    cart_id: parseInt(cart_id),
                },
                data: {
                    quantity: parseInt(quantity)
                }
            })
            if (!updatingItem)
                return res.status(500).json({"message": "can't update item quantity"})
            const user = await utils.getUpdatedUser(parseInt(user_id))
            req.session.user = user
            return res.status(200).json({
                "message": "book quantity updated successfully",
                carts: await utils.getAllCarts(parseInt(req.params.user_id))
            })
        } catch(error) {
            return res.status(500).json({"message": "an error has occurred"})
        }
    }
}
module.exports = cartController