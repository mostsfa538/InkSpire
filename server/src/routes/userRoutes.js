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
    'reviews/:userId/create',
    checkSession,
    userValidator.validateUserId,
    reviewValidator.validateCreateReview,
    handleValidationErrors,
    reviewController.createReview
);

router.get(
    'reviews/:userId/book/:bookId',
    checkSession,
    userValidator.validateUserId,
    reviewValidator.validateBookId,
    handleValidationErrors,
    reviewController.getReviewsByBook
);

router.get(
    'reviews/:userId',
    checkSession,
    userValidator.validateUserId,
    handleValidationErrors,
    reviewController.getReviewsByUser
);

router.put(
    'reviews/:userId/update/:id',
    checkSession,
    reviewValidator.validateUpdateReview,
    reviewValidator.validateReviewId,
    handleValidationErrors,
    reviewController.updateReview
);

router.delete(
    'reviews/:userId/delete/:id',
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
    '/:userId/upload/',
    checkSession,
    userValidator.validateUserId,
    userValidator.validateUploadBook,
    handleValidationErrors,
    userController.uploadBook
);

router.put(
    '/:userId/update/:id',
    checkSession,
    userValidator.validateUserId,
    userValidator.updateBook,
    handleValidationErrors,
    userController.updateBook
);

router.get(
    '/:userId/status/',
    checkSession,
    userValidator.validateUserId,
    userController.showBooksStatus
);

router.delete(
    '/:userId/delete/:id',
    checkSession,
    userValidator.validateUserId,
    userValidator.validateBookId,
    userController.deleteBook
);

router.post(
    '/:userId/profile',
    checkSession,
    userValidator.validateUpdateProfile,
    userController.updateProfile
);

router.post(
    '/:userId/:cartId/create-order',
    checkSession,
    userValidator.validateCartId,
    userValidator.validateUserId,
    payingController.createOrder);

router.post(
    '/',
    checkSession,
    payingController.captureOrder
);

router.get(
    '/',
    checkSession,
    payingController.cancelOrder
);

module.exports = router;