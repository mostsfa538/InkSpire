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

router.post(
    '/create',
    checkSession,
    reviewValidator.validateCreateReview,
    handleValidationErrors,
    reviewController.createReview
);

router.get(
    '/book/:bookId',
    checkSession,
    reviewValidator.validateBookId,
    handleValidationErrors,
    reviewController.getReviewsByBook
);

router.get(
    '/:userId',
    checkSession,
    reviewValidator.validateUserId,
    handleValidationErrors,
    reviewController.getReviewsByUser
);

router.put(
    '/update/:id',
    checkSession,
    reviewValidator.validateUpdateReview,
    reviewValidator.validateReviewId,
    handleValidationErrors,
    reviewController.updateReview
);

router.delete(
    '/delete/:id',
    checkSession,
    reviewValidator.validateReviewId,
    handleValidationErrors,
    reviewController.deleteReview
);

router.post(
    '/add',
    checkSession,
    favoriteValidator.validateCreateFavorite,
    favoriteController.createFavorite
);

router.get(
    '/favorites/:userId',
    checkSession,
    favoriteValidator.validateUserId,
    favoriteController.getFavoritesByUser
);

router.delete(
    '/favorites/delete/:id',
    checkSession,
    favoriteValidator.validateID,
    favoriteController.deleteFavorite
);
// -------------------------
router.get(
    '/search/:searchTerm',
    checkSession,
    userValidator.validateSearch,
    handleValidationErrors,
    userController.searchByCategory
);

module.exports = router;