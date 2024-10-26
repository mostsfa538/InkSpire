const express = require('express');

const checkSession = require('../middlewares/sessionState');
const reviewController = require('../controllers/reviewController');
const reviewValidator = require('../validators/reviewValidator');
const handleValidationErrors = require('../middlewares/validationErrorHandler');
const favoriteController = require('../controllers/favoriteController');
const favoriteValidator = require('../validators/favoriteValidator');
const userController = require('../controllers/userController');
const userValidator = require('../validators/userValidator');
const payingController = require('../controllers/payingController');

const router = express.Router();

router.post(
    '/reviews/:user_id/create',
    checkSession,
    userValidator.validateUserId,
    reviewValidator.validateCreateReview,
    handleValidationErrors,
    reviewController.createReview
);

router.get(
    '/reviews/:user_id/book/:bookId',
    checkSession,
    userValidator.validateUserId,
    reviewValidator.validateBookId,
    handleValidationErrors,
    reviewController.getReviewsByBook
);

router.get(
    '/reviews/:user_id',
    checkSession,
    userValidator.validateUserId,
    handleValidationErrors,
    reviewController.getReviewsByUser
);

router.put(
    '/reviews/:user_id/update/:id',
    checkSession,
    reviewValidator.validateUpdateReview,
    reviewValidator.validateReviewId,
    handleValidationErrors,
    reviewController.updateReview
);

router.delete(
    '/reviews/:user_id/delete/:id',
    checkSession,
    userValidator.validateUserId,
    reviewValidator.validateReviewId,
    handleValidationErrors,
    reviewController.deleteReview
);

router.post(
    '/:user_id/favorites/:book_id/add',
    checkSession,
    userValidator.validateUserId,
    favoriteValidator.validateCreateFavorite,
    favoriteController.createFavorite
);

router.get(
    '/:user_id/favorites',
    checkSession,
    userValidator.validateUserId,
    favoriteController.getFavoritesByUser
);

router.delete(
    '/:user_id/favorites/:id/delete',
    checkSession,
    favoriteValidator.validateID,
    favoriteController.deleteFavorite
);


router.post(
    '/:user_id/upload/',
    checkSession,
    userValidator.validateUserId,
    userValidator.validateUploadBook,
    handleValidationErrors,
    userController.uploadBook
);

router.put(
    '/:user_id/update/:id',
    checkSession,
    userValidator.validateUserId,
    userValidator.updateBook,
    handleValidationErrors,
    userController.updateBook
);

router.get(
    '/:user_id/status/',
    checkSession,
    userValidator.validateUserId,
    userController.showBooksStatus
);

router.delete(
    '/:user_id/delete/:id',
    checkSession,
    userValidator.validateUserId,
    userValidator.validateBookId,
    userController.deleteBook
);

router.post(
    '/:user_id/profile',
    checkSession,
    userValidator.validateUpdateProfile,
    userController.updateProfile
);

router.post(
    '/:user_id/order/:order_id/checkout',
    checkSession,
    userValidator.validateCartId,
    userValidator.validateUserId,
    payingController.createOrder);

router.get(
    '/:user_id/order/:order_id/complete',
    checkSession,
    payingController.completeOrder
);

router.get(
    '/:user_id/order/:order_id/cancel',
    checkSession,
    payingController.cancelOrder
);

module.exports = router;