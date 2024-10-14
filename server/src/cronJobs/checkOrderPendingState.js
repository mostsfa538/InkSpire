const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient
const cron = require('node-cron')

async function updatePendingOrders () {
    try {
        const now = new Date()
        const pendingOrders = await prisma.order.findMany({
            where: {
                order_status: "pending",
                pendingTime: {lte: now.toISOString()}
            }
        })
        if (!pendingOrders)
            console.error(`can't get pending orders`, pendingOrders)
        for (order of pendingOrders) {
            const updateOrderState = await prisma.order.update({
                where: {id: order.id},
                data: {order_status: "delivering"}
            })
            if (!updateOrderState)
                console.error("can't update orderStatus")
            for (let i = 0; i < order.cart.items.length; i++){
                const decrementBookQuantity = await prisma.book.update({
                    where: {id: order.cart.items[i].book.id},
                    data: {
                        avilable: order.cart.items[i].book.avilable - 1,
                        sold: order.cart.items[i].book.sold + 1
                    }
                })
                if (!decrementBookQuantity)
                    console.error("can't decrement 'available' after order or update 'sold'")
            }
        }
    } catch(error) {
        console.log("catch error", error)
    }
}

async function scheduleOrderStateChange () {
    cron.schedule("* * * * *", async () => {
        console.log("i run now") // for dev leave it please
        await updatePendingOrders()
    })
}

module.exports = scheduleOrderStateChange