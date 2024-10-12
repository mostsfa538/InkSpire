const express = require('express');

const checkSession = require('../middlewares/sessionState');
const reviewController = require('../controllers/reviewController');
const reviewValidator = require('../validators/reviewValidator');
const handleValidationErrors = require('../middlewares/validationErrorHandler');
const favoriteController = require('../controllers/favoriteController');
const favoriteValidator = require('../validators/favoriteValidator');
const userController = require('../controllers/userController');
const userValidator = require('../validators/userValidator');

const router = express.Router();


router.get('/', userController.getBooks);

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
    '/favorites/:userId/add',
    checkSession,
    userValidator.validateUserId,
    favoriteValidator.validateCreateFavorite,
    favoriteController.createFavorite
);

router.get(
    '/favorites/:userId',
    checkSession,
    userValidator.validateUserId,
    favoriteController.getFavoritesByUser
);

router.delete(
    '/favorites/delete/:id',
    checkSession,
    favoriteValidator.validateID,
    favoriteController.deleteFavorite
);

router.get(
    '/:userId/search/:searchTerm',
    checkSession,
    userValidator.validateUserId,
    userValidator.validateSearch,
    handleValidationErrors,
    userController.searchByCategory
);

router.post(
    '/:userId/upload/',
    // checkSession,
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
    userController.deleteBook
);

router.post(
    '/:userId/profile',
    checkSession,
    userValidator.validateUpdateProfile,
    userController.updateProfile
);

module.exports = router;