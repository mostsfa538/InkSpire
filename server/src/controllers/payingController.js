const { PrismaClient } = require('@prisma/client');
const axios = require('axios');

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
    const orderId = req.params.orderId;

    try {
        const order = await prisma.order.findFirst({
            where: {
                id: parseInt(orderId),
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
                value: book.price.toFixed(2),
            },
            quantity: quantity.toString(),
        })));

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
                            value: order.total_price.toFixed(2),
                            breakdown: {
                                item_total: {
                                    currency_code: 'USD',
                                    value: order.total_price.toFixed(2),
                                },
                            },
                        },
                    },
                ],
                application_context: {
                    return_url: `${process.env.BASE_URL}/api/user/complete-order`,
                    cancel_url: `${process.env.BASE_URL}/api/user/cancel-order`,
                    shipping_preference: "NO_SHIPPING",
                    user_action: "PAY_NOW",
                    brand_name: "InkSpire",
                },
            },
        });

        res.status(200).json(response.data.links.find((link) => link.rel === 'approve').href);
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
    try {
        const response = await exports.captureOrder(orderId);
        res.status(200).json({ message: 'Order captured successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to capture the order' });
    }
}

exports.cancelOrder = async (req, res) => {
    res.status(200).json({ message: 'Order cancelled successfully' });
}