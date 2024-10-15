const router = require("express").Router()
const cartOrderValidator = require("../validators/cartOrderValidator")
const handleValidationErrors = require('../middlewares/validationErrorHandler')
const checkSession = require("../middlewares/sessionState")
const orderController = require("../controllers/orderController")

// creating new order from scratch POST
router.post(
    "/:user_id/cart/:cart_id/order/:order_id/:address/:number/:payement",
    checkSession,
    cartOrderValidator.validateUserId,
    cartOrderValidator.validateCartId,
    cartOrderValidator.validateOrderId,
    cartOrderValidator.validateOrderAdress,
    cartOrderValidator.validateOrderPhoneNumber,
    cartOrderValidator.validatePayementMethod,
    handleValidationErrors,
    orderController.addOrder
)

// getting all user orders
router.get(
    "/:user_id/orders",
    checkSession,
    cartOrderValidator.validateUserId,
    handleValidationErrors,
    orderController.getOrders
)

// getting order wiht id
router.get(
    "/:user_id/order/:order_id",
    cartOrderValidator.validateUserId,
    cartOrderValidator.validateOrderId,
    handleValidationErrors,
    orderController.getOrderById
)

// adding item to order cart (while in pendgin) PUT
router.put(
    "/:user_id/order/:order_id/book/:book_id/:quantity",
    checkSession,
    cartOrderValidator.validateUserId,
    cartOrderValidator.validateOrderId,
    cartOrderValidator.validateBookId,
    cartOrderValidator.validateQuantity,
    handleValidationErrors,
    orderController.UpdateOrder
)

// update order item quantity

// // removing item from order cart(while in pending) DLETE
// router.delete(
//     "/:user_id/order/:order_id/cartItem/:cartItem_id"
// )

// // updating the order wiht a whole new cart
// router.put(
//     "/:user_id:order/cart/cart_id"
// )


module.exports = router