const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const utils = require('../utils/utils.js');

const prisma = new PrismaClient();

async function getAccessToken() {
    const response = await axios({
        method: 'post',
        url: `${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`,
        data: 'grant_type=client_credentials',
        auth: {
            username: process.env.PAYPAL_CLIENT_ID,
            password: process.env.PAYPAL_CLIENT_SECRET,
        },
    });

    return response.data.access_token;
}

exports.createOrder = async (req, res) => {
    const accessToken = await getAccessToken();
    const orderId = parseInt(req.params.order_id);
    const userId = parseInt(req.params.user_id);

    try {
        const order = await prisma.order.findFirst({
            where: {
                id: orderId,
            },
            include: {
                carts: {
                    include: {
                        items: {
                            include: {
                                book: true,
                            },
                        },
                    },
                },
            },
        });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const allItems = order.carts.flatMap(cart => cart.items.map(({ book, quantity }) => ({
            name: book.title,
            unit_amount: {
                currency_code: 'USD',
                value: parseFloat(book.price).toFixed(2),
            },
            quantity: quantity.toString(),
        })));

        if (allItems.length === 0) {
            return res.status(400).json({ error: 'Order is empty' });
        }

        const response = await axios({
            method: 'post',
            url: `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            data: {
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        items: allItems,
                        amount: {
                            currency_code: 'USD',
                            value: parseFloat(order.total_price).toFixed(2),
                            breakdown: {
                                item_total: {
                                    currency_code: 'USD',
                                    value: parseFloat(order.total_price).toFixed(2),
                                },
                            },
                        },
                    },
                ],
                application_context: {
                    return_url: `${process.env.BASE_URL}/api/user/${userId}/order/${orderId}/complete`,
                    cancel_url: `${process.env.BASE_URL}/api/user/${userId}/order/${orderId}/cancel`,
                    shipping_preference: "NO_SHIPPING",
                    user_action: "PAY_NOW",
                    brand_name: "InkSpire",
                },
            },
        });

        const approvalUrl = response.data.links.find(link => link.rel === 'approve').href;

        res.status(200).json(
            {
                approvalUrl,
                orderId: response.data.id,
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.captureOrder = async (orderId) => {
    const accessToken = await getAccessToken();

    try {
        const response = await axios({
            method: 'post',
            url: `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            data: {},
        });

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

exports.completeOrder = async (req, res) => {
    const orderId = req.query.token;
    const userId = parseInt(req.params.user_id);
    const dbOrderId = parseInt(req.params.order_id);
    try {
        const response = await exports.captureOrder(orderId);
        
        // Update the order status in the db
        await prisma.order.update({
            where: {
                id: dbOrderId,
            },
            data: {
                order_status: 'delivering',
            },
        });

        res.status(200).json({ message: 'Order completed successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to capture the order' });
    }
}

exports.cancelOrder = async (req, res) => {
    res.status(200).json({ message: 'Order cancelled successfully' });
}