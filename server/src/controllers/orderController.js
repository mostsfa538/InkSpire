const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient
const { Decimal } = require('@prisma/client');

class orderController {

    static async addOrder(req, res) {
        const {user_id, cart_id, address, number} = req.params
        try {
            if (isNaN(number))
                return res.status(401).json({"message": "invalide phone Number"})
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

            const now = new Date()

            now.setMinutes(now.getMinutes() + 1) // for 1 min (testing purpose) 
                                                //will be changed for 1 hour in production
            const pendingTime = now.toISOString()

            now.setDate(now.getDate() + 2) // after 2 day
            const deliveringDate = now.toISOString()

            const total_price = cart.items.reduce((sum, item) => sum += item.book.price, 0)
            const order = await prisma.order.create({
                data: {
                    cart: {connect: {id: parseInt(cart_id)}},
                    user: {connect: {id: parseInt(user_id)}},
                    total_price: new Decimal(total_price),
                    address: address,
                    phone_number: number,
                    order_status: "pending",
                    createdAt: new Date().toISOString(),
                    pendingTime: pendingTime,
                    deliveryDate: deliveringDate
                }
            })
            if (!order)
                return res.status(500).json({"message": "can't create order"})
            return res.status(200).json({"message": "order created successfully"})
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

    // static async getOrderById(req, res) {
        // also has the logic of getorderstatus
    // }

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