const router = require("express").Router()
const cartOrderValidator = require("../validators/cartOrderValidator")
const handleValidationErrors = require('../middlewares/validationErrorHandler')
const checkSession = require("../middlewares/sessionState")
const checkOrderState = require('../middlewares/orderState')
// const cartsParser = require('../middlewares/orderCartParser')
const orderController = require("../controllers/orderController")


// adding new order from scratch
router.post(
    // expected list of cartIds in req.body
    "/:user_id/order/carts/:address/:number/:payement",
    checkSession,
    cartOrderValidator.validateUserId,
    cartOrderValidator.validateCartsIdsLists,
    cartOrderValidator.validateOrderAdress,
    cartOrderValidator.validateOrderPhoneNumber,
    cartOrderValidator.validatePayementMethod,
    handleValidationErrors,
    orderController.newOrder
)

// adding new cart to existing order
router.put(
    "/:user_id/order/:order_id/cart/:cart_id",
    checkSession,
    checkOrderState,
    cartOrderValidator.validateUserId,
    cartOrderValidator.validateOrderId,
    cartOrderValidator.validateCartId,
    handleValidationErrors,
    orderController.addCartToOrder
)

// deleting cart from existing order
router.delete(
    "/:user_id/order/:order_id/cart/:cart_id",
    checkSession,
    checkOrderState,
    cartOrderValidator.validateUserId,
    cartOrderValidator.validateOrderId,
    cartOrderValidator.validateCartId,
    handleValidationErrors,
    orderController.deleteCartFromOrder
)

// adding item to order cart (while in pending) 
router.put(
    "/:user_id/order/:order_id/cart/:cart_id/book/:book_id/:quantity",
    checkSession,
    checkOrderState,
    cartOrderValidator.validateUserId,
    cartOrderValidator.validateOrderId,
    cartOrderValidator.validateBookId,
    cartOrderValidator.validateQuantity,
    handleValidationErrors,
    orderController.addItemToOrderCart
)

// update quantity of order item
router.put(
    "/:user_id/order/:order_id/cart/:cart_id/cartItem/:cartItem_id/:quantity",
    checkSession,
    checkOrderState,
    cartOrderValidator.validateUserId,
    cartOrderValidator.validateOrderId,
    cartOrderValidator.validateCartItemId,
    cartOrderValidator.validateQuantity,
    handleValidationErrors,
    orderController.updateOrderCartItemQuantity
)

// removing item from order cart(while in pending) DLETE
router.delete(
    "/:user_id/order/:order_id/cart/:cart_id/cartItem/:cartItem_id",
    checkSession,
    checkOrderState,
    cartOrderValidator.validateUserId,
    cartOrderValidator.validateOrderId,
    cartOrderValidator.validateCartId,
    cartOrderValidator.validateCartItemId,
    handleValidationErrors,
    orderController.deleteCartItemFromOrderCart
)

//////////////////////////////////////////////
// adding new cart item to one of the order carts
// router.put(
//     "/:user_id/order/:order_id/cart/:cart_id/cartItem/:cartItem_id",
//     checkSession,
//     checkOrderState,
//     cartOrderValidator.validateUserId,
//     cartOrderValidator.validateOrderId,
//     cartOrderValidator.validateCartId,
//     cartOrderValidator.validateCartItemId,
//     handleValidationErrors,
//     orderController.addItemToOrderCart
// )
/////////////////////////////////////////////////

// getting all user orders
router.get(
    "/:user_id/orders",
    checkSession,
    cartOrderValidator.validateUserId,
    handleValidationErrors,
    orderController.getOrders
)

// getting order by id
// router.get(
//     "/:user_id/order/:order_id",
//     cartOrderValidator.validateUserId,
//     cartOrderValidator.validateOrderId,
//     handleValidationErrors,
//     orderController.getOrderById
// )

// deleting order
// router.delete(
//     "/:user_id/order/:order_id"
// )

module.exports = router