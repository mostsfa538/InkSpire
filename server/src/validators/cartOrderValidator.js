const { param } = require('express-validator')

const validateUserId = [
    param('user_id').isInt({gt: 0}).withMessage("userId must be integer and greater than zero")
]
const validateCartId = [
    param('cart_id').isInt({gt: 0}).withMessage("cartId must be integer and greater than zero")
]
const validateCartItemId = [
    param('cartItem_id').isInt({gt: 0}).withMessage("cartItmeId must be integer and greater than zero")
]
const validateQuantity = [
    param('quantity').isInt({gt: 0}).withMessage("quantity must be greater than zero")
]
const validateBookId = [
    param('book_id').isInt({gt: 0}).withMessage("bookId must be an integer and greater than zero")
]
const validateOrderId = [
    param('order_id').isInt({gt: 0}).withMessage("orderId must be an integer and greater than zero")
]
const validateOrderAdress = [
    param('address').isString().isLength({min: 20})
]
const validateOrderPhoneNumber = [
    param('number').isString().isLength({min: 5, max: 12})
]
const validatePayementMethod = [
    param('payement').isString().withMessage("payement method must be a string")
]
module.exports = {
    validateUserId,
    validateCartId,
    validateCartItemId,
    validateQuantity,
    validateBookId,
    validateOrderId,
    validateOrderAdress,
    validateOrderPhoneNumber,
    validatePayementMethod
}