const { param } = require('express-validator')

const validateUserId = [
    param('user_id').isInt({gt: 0}).withMessage("userId must be integer")
]
const validateCartId = [
    param('cart_id').isInt({gt: 0}).withMessage("cartId must be integer")
]
const validateCartItemId = [
    param('cartItem_id').isInt({gt: 0}).withMessage("cartItmeId must be integer")
]
const validateQuantity = [
    param('quantity').isInt({gt: 0}).withMessage("quantity must be greater than zero")
]
const validateBookId = [
    param('book_id').isInt({gt: 0}).withMessage("bookId must be an integer")
]
module.exports = {
    validateUserId,
    validateCartId,
    validateCartItemId,
    validateQuantity,
    validateBookId
}