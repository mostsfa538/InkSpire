const { PrismaClient } = require('@prisma/client')
const checkSession = require("../middlewares/sessionState")
const prisma = new PrismaClient;
const router = require('express').Router()

router.get(
    '/user/:user_id/carts/',
    async (req, res) => {
        if (parseInt(req.params.user_id) !== req.session.user.id) 
            return res.status(401).json({"message": "user is not authorized"})
        const carts = await prisma.cart.findMany({
            include: {items: true}
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
)
router.get(
    '/user/:user_id/cart/:cart_id',
    checkSession,
    async (req, res) => {

        const {user_id, cart_id} = req.params

        if (!user_id || user_id <=0 ||
            !cart_id || cart_id <=0 ||
            parseInt(user_id) !== parseInt(req.session.user.id)
        )
            return res.status(401).json({"message": "invalide request"})

        try {
            const cart = await prisma.cart.findFirst({
                where: 
                { 
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
)

router.post(
    '/user/:user_id/cart/:cart_id/book/:book_id/add/:quantity',
    async (req, res) => {

        const {user_id, cart_id, book_id, quantity} = req.params

        if (!user_id || user_id <=0 ||
            !cart_id || cart_id <=0 ||
            !book_id || book_id <=0 ||
            quantity <=0
        )
            return res.status(401).json({"message": "invalide request"})

        try{
            let user = await prisma.user.findFirst({
                    where: {id: parseInt(user_id)},
                    include: {
                        carts: true,
                        orders: true,
                        reviews: true,
                        Favorites: true,
                        OnHolds: true
                    }
                })
            if(!user)
                return res.status(401).json({"message": "user not found with the given id"})
            const book = await prisma.book.findFirst({
                where: {id: parseInt(book_id)}
            })
            if(!book) {
                return res.status(401).json({"message": "no book exists with the given id"})
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
                        include: {items: true}
                    },
                },
                include: {
                    cart: true,
                    book: true
                }
            })
            if (!cartItem) {
                return res.status(500).json({"message": "can't create cart item"})
            }
            req.session.user = user
            return res.status(200).json({
                "message": "cart added successfully",
                "user": req.session.user
            })
        }catch(err){
            console.log(err)
            return res.status(500).json({"message": "error has occured"})
        }
    }
)
// router.post(
//     '/user/:user_id/cart/:cart_id/cartItem/:cartItem_id/delete',
// )

module.exports = router