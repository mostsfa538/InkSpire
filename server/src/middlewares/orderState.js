const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient
async function orderState(req, res, next) {
    try {
        const order = await prisma.order.findFirst({
            where: {id: parseInt(req.params.order_id)}
        })
        if (order) {
            // if (order.payementMethod === 'visa' || order.payementMethod === 'paypal')
            //     return res.status(401).json({"message": "only can update cash payement orders"})
            if (order.order_status === "delivering")
                return res.status(401).json({"message": `order with the same id is already on ${order.order_status} state`})
        }
        next()
    } catch(error) {
        return res.status(500).json({"message": "an error occur while checking order state"})
    }
}
module.exports = orderState