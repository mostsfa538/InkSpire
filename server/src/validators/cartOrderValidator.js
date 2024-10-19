const {body, param} = require('express-validator')

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
    param('address').isString().withMessage("address must be a string")
    .isLength({min: 20}).withMessage("please add more details to your address")
]
const validateOrderPhoneNumber = [
    param('number').isString()
    .isLength({min: 5, max: 12}).withMessage("phone number can't be less than 5 number or more than 12 number")
    .custom((number) => {
        if (isNaN(parseInt(number)))
            throw new Error("phone number must contain digits only")
        return true
    })
]
const validatePayementMethod = [
    param('payement').isString().withMessage("payement method must be a string")
]
const validateCartsIdsLists= [
    body('cartsIds')
    .not().isEmpty().withMessage("cartsIds can't be empty list")
    .isArray({ min: 1 })
    .withMessage('items must be an array')
    .custom((arr) => {
        // Ensure each element is an array
        if (arr.every(item => isNaN(parseInt(item)))) {
            throw new Error('each element of items must be a number');
        }
        return true;
    })
];
module.exports = {
    validateUserId,
    validateCartId,
    validateCartItemId,
    validateQuantity,
    validateBookId,
    validateOrderId,
    validateOrderAdress,
    validateOrderPhoneNumber,
    validatePayementMethod,
    validateCartsIdsLists
}