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
    const userId = req.params.userId;
    const cartId = req.params.cartId;

    try {
        const cart = await prisma.cart.findUnique({
            where: {
                user_id: parseInt(userId),
                id: parseInt(cartId),
            },
            include: {
                items: {
                    include: {
                        book: true,
                    },
                },
            },
        });

        if (!cart || !cart.items.length) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        const totalAmount = cart.items.reduce((acc, { book, quantity }) => acc + book.price * quantity, 0).toFixed(2);

        let order = await prisma.order.findUnique({
            where: {
                cart_id: parseInt(cartId),
            },
        });

        if (!order) {
            order = await prisma.order.create({
                data: {
                    user_id: parseInt(userId),
                    cart_id: parseInt(cartId),
                    total_price: totalAmount,
                    address: req.body.address || "test address",
                    phone_number: req.body.phone_number || "011",
                    order_status: 'pending',
                    payementMethod: req.body.payementMethod || 'visa',
                },
            });
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
                        items: cart.items.map(({ book, quantity }) => ({
                            name: book.title,
                            unit_amount: {
                                currency_code: 'USD',
                                value: book.price.toString(),
                            },
                            quantity: quantity.toString(),
                        })),
                        amount: {
                            currency_code: 'USD',
                            value: totalAmount,
                            breakdown: {
                                item_total: {
                                    currency_code: 'USD',
                                    value: totalAmount,
                                },
                            },
                        },
                    },
                ],
                application_context: {
                    return_url: `${process.env.BASE_URL}/`,
                    cancel_url: `${process.env.BASE_URL}/`,
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