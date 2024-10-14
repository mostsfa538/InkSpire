const checkSession = require("../middlewares/sessionState");
const cartValidator = require('../validators/cartValidator')
const cartController = require('../controllers/cartController')
const handleValidationErrors = require('../middlewares/validationErrorHandler')

const router = require('express').Router()

// getting all user carts
router.get(
    '/:user_id/carts/',
    checkSession,
    cartValidator.validateUserId,
    handleValidationErrors,
    cartController.getCarts
)

// adding new cart
router.post(
    "/:user_id/carts/add",
    checkSession,
    cartValidator.validateUserId,
    handleValidationErrors,
    cartController.addCart
)

// getting only one cart with id
router.get(
    '/:user_id/carts/:cart_id',
    checkSession,
    cartValidator.validateUserId,
    cartValidator.validateCartId,
    handleValidationErrors,
    cartController.getCartById
)


// deleting an entire cart
router.delete(
    "/:user_id/carts/:cart_id",
    checkSession,
    cartValidator.validateUserId,
    cartValidator.validateCartId,
    handleValidationErrors,
    cartController.deleteCart
)

// only emptying a cart without deleting it
router.put(
    "/:user_id/cart/:cart_id/empty",
    checkSession,
    cartValidator.validateUserId,
    cartValidator.validateCartId,
    handleValidationErrors,
    cartController.emptyCart
)

// adding cartItem to a specific cart
router.post(
    '/:user_id/carts/:cart_id/book/:book_id/:quantity',
    checkSession,
    cartValidator.validateUserId,
    cartValidator.validateCartId,
    cartValidator.validateBookId,
    cartValidator.validateQuantity,
    handleValidationErrors,
    cartController.addCartItem
)

// deleting cartItem from specific cart
router.delete(
    '/:user_id/cart/:cart_id/cartItem/:cartItem_id/',
    checkSession,
    cartValidator.validateUserId,
    cartValidator.validateCartId,
    cartValidator.validateCartItemId,
    handleValidationErrors,
    cartController.deleteCartItem
)


module.exports = router