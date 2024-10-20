const router = require("express").Router()
const cartOrderValidator = require("../validators/cartOrderValidator")
const handleValidationErrors = require('../middlewares/validationErrorHandler')
const checkSession = require("../middlewares/sessionState")
const checkOrderState = require('../middlewares/orderState')
// const cartsParser = require('../middlewares/orderCartParser')
const orderController = require("../controllers/orderController")


// getting all user orders
// e:x http://localhost:3000/api/user/1/orders
router.get(
    "/:user_id/orders",
    checkSession,
    cartOrderValidator.validateUserId,
    handleValidationErrors,
    orderController.getOrders
)

// getting order by id
// e:x http://localhost:3000/api/user/1/order/53
router.get(
    "/:user_id/order/:order_id",
    checkSession,
    cartOrderValidator.validateUserId,
    cartOrderValidator.validateOrderId,
    handleValidationErrors,
    orderController.getOrderById
)

// adding new order from scratch
// e:x http://localhost:3000/api/user/1/order/carts/smouha alnasr-street street-11/01154199659/cash
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
// e:x http://localhost:3000/api/user/1/order/53/cart/23
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
// e:x http://localhost:3000/api/user/1/order/53/cart/23
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
// e:x http://localhost:3000/api/user/1/order/53/cart/21/book/3/1
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
// e:x http://localhost:3000/api/user/1/order/53/cart/21/cartItem/41/2
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
// e:x http://localhost:3000/api/user/1/order/53/cart/21/cartItem/41
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

// deleting order
// router.delete(
//     "/:user_id/order/:order_id"
// )

module.exports = router