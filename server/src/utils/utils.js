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
                orders: {include: {carts: {include: {items: {include: {book: true}}}}}},
                reviews: {include: {user: true, book: true}},
                Favorites: {include: {book: true}},
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
        // findMany returns empty list if no items found
        const carts = prisma.cart.findMany({
            where: {user_id: userId},
            include: {items: {include: {book: true}}, Order: true}
        })
        return carts
    } catch(error) {
        return {"error": "an error occur while fetching user carts"}
    }
}

async function getAllOrders(user_id) {
    try {
        const orders = await prisma.order.findMany({
            where: {user_id: user_id},
            include: {carts: {include: {items: {include: {book: true}}}}}
        })
        return orders
    } catch(err) {
        return {"error": "an error occur while fetching user Orders"}
    }
}

function getCartTotlaPrice(cart) {
    let total_price = 0
    for (let i = 0; i < cart.items.length; i++) {
        total_price += (cart.items[i].book.price * cart.items[i].quantity)
    }
    return total_price
}

async function getAllUserItems(user_id, book_id) {
    try {
        const AllUseritems = await prisma.cartItem.findFirst({
            where: {
                cart: {
                    user: {
                        id: user_id
                    }
                },
                book:{
                    id: book_id
                }
            }
        })
        return AllUseritems
    } catch(error) {
        console.log(error)
        return {"error": "error occur while checking if book is in another cart"}
    }
}

async function getAllUserOrdersItems(user_id, book_id) {
    try {
        const AllUserOrdersitems = await prisma.cartItem.findFirst({
            where: {
                cart: {
                    user: {
                        id: user_id
                    },
                    Order: {isNot: null}
                },
                book:{
                    id: book_id
                }
            }
        })
        return AllUserOrdersitems
    } catch(error) {
        console.log(error)
        return {"error": "error occur while checking if book is in another cart"}
    }
}
module.exports = {
    checkBookAvailablity,
    checkIfBookExistsInCart,
    getUpdatedUser,
    getDates,
    getAllCarts,
    getAllOrders,
    getCartTotlaPrice,
    getAllUserItems,
    getAllUserOrdersItems
}