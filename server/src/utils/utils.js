const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient;

function checkBookAvailablity(book, quantity) {
    if (book.available < quantity) {
        return false
    }
    return true
}

function checkIfBookExistsInCart (cart, book) {
    for (let j = 0; j < cart.items.length; j++)
        if (cart.items[j].book_id === parseInt(book.id))
            return true
    return false
}

async function getUpdatedUser(user_id) {
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
        return {"error": "An error occurred while fetching the user"}
    }
}

function getDates() {
    const now = new Date()

    now.setMinutes(now.getMinutes() + 1) // for 1 min (testing purpose) 
                                        //will be changed for 1 hour in production
    const pendingTime = now.toISOString()

    now.setDate(now.getDate() + 2) // after 2 day
    const deliveringDate = now.toISOString()

    return {
        "pendingTime": pendingTime,
        "deliveringDate": deliveringDate
    }
}

async function getAllCarts(userId) {
    try {
        const carts = prisma.cart.findMany({
            where: {user_id: userId},
            include: {items: {include: {book: true}}}
        })
        if (!carts)
            return {}
        return carts
    } catch(error) {
        return {"error": "an error occur while fetching user carts"}
    }
}

module.exports = {
    checkBookAvailablity,
    checkIfBookExistsInCart,
    getUpdatedUser,
    getDates,
    getAllCarts
}