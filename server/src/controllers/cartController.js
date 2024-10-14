const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient;

class cartController {

    static async getUpdatedUser(user_id) {
        try {
            let user = await prisma.user.findFirst({
                where: {id: user_id},
                include: {
                    carts: {include: {items: {include: {book: true}}}},
                    orders: true,
                    reviews: true,
                    Favorites: true,
                    OnHolds: true
            }})
            if(!user)
                return {}
            return {...user, password: ""}
            
        } catch(error) {
            return {error: "An error occurred while fetching the user."}
        }
    }

    static async checkBookAvailablity(book, quantitiy) {
        if (book.available < quantitiy) {
            return false
        }
        return true
    }

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
            const deletedCart = await prisma.cart.delete({
                where: {id: parseInt(req.params.cart_id)}
            })
            if (!deletedCart)
                return res.status(500).json({"message": "can't delete cart"})
            return res.status(200).json({"message": "cart deleted successfully"})
        } catch (error) {
            return res.status(500).json({"message": "can't delete cart"})
        }
    }

    static async emptyCart (req, res) {
        try {
            const items = await prisma.cartItem.deleteMany({
                where: {cart_id: parseInt(req.params.cart_id)}
            })
            if (!items)
                return res.status(500).json({"message": "can't empty cart"})
            return res.status(200).json({
                "message": "emptied successfully",
                user: await cartController.getUpdatedUser(req.session.user.id)
            })
        } catch(error){
            return res.status(500).json({"message": "can't empty"})
        }
    }
    
    static async addCartItem (req, res) {
        const {user_id, cart_id, book_id, quantity} = req.params
        try{
            for (let i = 0; i < req.session.user.carts.length; i++)
                if (req.session.user.carts[i].id === parseInt(req.params.cart_id))
                    for (let j = 0; j < req.session.user.carts[i].items.length; j++)
                        if (req.session.user.carts[i].items[j].book_id === parseInt(req.params.book_id))
                            return res.status(401).json({
                                "message": "book already exists in cart",
                                "solve": "try to update book quantitiy instead",
                                "user": await cartController.getUpdatedUser(req.session.user.id)
                            })
            const book = await prisma.book.findFirst({
                where: {id: parseInt(book_id)}
            })
            if(!book)
                return res.status(401).json({"message": "no book exists with the given id"})
            if (!(await cartController.checkBookAvailablity(book, quantity))) {
                return res.status(401).json({
                    "message": "the book is not available with given quantity",
                    "solve": "try to decrease quantity"
                })
            }
            const cartItem = await prisma.cartItem.create({
                data: {
                    book: { connect: { id: parseInt(book_id) } },
                    quantity: parseInt(quantity),
                    cart: {
                        connectOrCreate:{
                            where: { id: parseInt(cart_id),
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
            const user = await cartController.getUpdatedUser(parseInt(user_id))
            if(!user)
                return res.status(500).json({"message": "can't get updated user"})
            req.session.user = { ...user, password:"" }
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
                    user_id: parseInt(req.params.user_id)
                },
                include: {items: true}
            })
            if (!cart)
                return res.status(404).json({"message": "no match between userId and cartId"})
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
}
module.exports = cartController