const checkSession = require("../middlewares/sessionState");
const cartOrderValidator = require('../validators/cartOrderValidator')
const cartController = require('../controllers/cartController')
const handleValidationErrors = require('../middlewares/validationErrorHandler')

const router = require('express').Router()

// adding new cart
router.post(
    "/:user_id/carts/:cart_name/add",
    checkSession,
    cartOrderValidator.validateUserId,
    handleValidationErrors,
    cartController.addCart
)

// updating cart name
router.put(
    "/:user_id/carts/:cart_id/name/:cart_name",
    checkSession,
    cartOrderValidator.validateUserId,
    cartOrderValidator.validateCartId,
    handleValidationErrors,
    cartController.updateCartName
)

// getting all user carts
router.get(
    '/:user_id/carts/',
    checkSession,
    cartOrderValidator.validateUserId,
    handleValidationErrors,
    cartController.getCarts
)

// getting only one cart with id
router.get(
    '/:user_id/carts/:cart_id',
    checkSession,
    cartOrderValidator.validateUserId,
    cartOrderValidator.validateCartId,
    handleValidationErrors,
    cartController.getCartById
)

// only emptying a cart without deleting it
router.put(
    "/:user_id/cart/:cart_id/empty",
    checkSession,
    cartOrderValidator.validateUserId,
    cartOrderValidator.validateCartId,
    handleValidationErrors,
    cartController.emptyCart
)

// deleting an entire cart
router.delete(
    "/:user_id/carts/:cart_id",
    checkSession,
    cartOrderValidator.validateUserId,
    cartOrderValidator.validateCartId,
    handleValidationErrors,
    cartController.deleteCart
)


// adding cartItem to a specific cart
router.post(
    '/:user_id/carts/:cart_id/book/:book_id/:quantity',
    checkSession,
    cartOrderValidator.validateUserId,
    cartOrderValidator.validateCartId,
    cartOrderValidator.validateBookId,
    cartOrderValidator.validateQuantity,
    handleValidationErrors,
    cartController.addCartItem
)

// updating cartItem quantity
router.put(
    "/:user_id/cart/:cart_id/cartItem/:cartItem_id/:quantity",
    checkSession,
    cartOrderValidator.validateUserId,
    cartOrderValidator.validateCartId,
    cartOrderValidator.validateCartItemId,
    cartOrderValidator.validateQuantity,
    handleValidationErrors,
    cartController.updateQuantity
)

// deleting cartItem from specific cart
router.delete(
    '/:user_id/cart/:cart_id/cartItem/:cartItem_id/',
    checkSession,
    cartOrderValidator.validateUserId,
    cartOrderValidator.validateCartId,
    cartOrderValidator.validateCartItemId,
    handleValidationErrors,
    cartController.deleteCartItem
)
module.exports = router