const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient;
const utils = require("../utils/utils")

class cartController {

    static async getCarts(req, res) {
        const carts = await prisma.cart.findMany({
            where: {user_id: req.session.user.id},
            include: {items: {include: {book: true}}}
        })
        if (!carts){
            return res.status(200).json({
                "message": "user has no carts yet",
                "carts": carts
            })
        }
        return res.status(200).json({
            "message": "reading carts done successfully",
            carts: carts
        })
    }

    static async addCart(req, res) {
        try {
            const cart = await prisma.cart.create({
                data:{
                    user: {connect: {id: parseInt(req.params.user_id)}}
                }
            })
            if (!cart) {
                return res.status(500).json({"message": "can't create cart to user"})
            }
            return res.status(200).json({"message": "cart created successfully"})
        } catch(error) {
            return res.status(500).json({"message": "can't create a cart"})
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
                include: {
                    items: true,
                }
            })
            if (!cart)
                return res.status(401).json({"message": "no matching exist between userId and cartId"})
            return res.status(200).json({"cart": cart})
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
            console.log(deletedCart)
            console.log(typeof deletedCart)
            if (!deletedCart)
                return res.status(500).json({"message": "can't delete cart"})
            return res.status(200).json({"message": "cart deleted successfully"})
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
            return res.status(200).json({
                "message": "emptied successfully",
                user: await utils.getUpdatedUser(req.session.user.id)
            })
        } catch(error){
            console.log(error)
            return res.status(500).json({"message": "can't empty"})
        }
    }

    static async addCartItem (req, res) {
        const {user_id, cart_id, book_id, quantity} = req.params
        try{
            const cart = await prisma.cart.findFirst({
                where: {id: parseInt(cart_id)},
                include: {Order: true, items: true}
            })
            // no check if cart doesn't exist because we would create any way
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
                return res.status(401).json({"message": "book already exist in cart! try to update quantity instead"})

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
            if(!user)
                return res.status(500).json({"message": "can't get updated user"})
            req.session.user = user
            return res.status(200).json({
                "message": "item added to cart successfully",
                "user": req.session.user
            })
        }catch(err){
            console.log(err)
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
            return res.status(200).json({"message": "cartItem deleted successfully"})
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
            if (!(await utils.checkBookAvailablity(cartItem.book, parseInt(quantity))))
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
            return res.status(200).json({
                "message": "book quantity updated successfully",
                user: await utils.getUpdatedUser(parseInt(user_id))
            })
        } catch(error) {
            console.log(error)
            return res.status(500).json({"message": "an error has occurred"})
        }
    }
}
module.exports = cartController