const express = require('express');

const reviewController = require('../controllers/reviewController');
const reviewValidator = require('../validators/reviewValidator');
const handleValidationErrors = require('../middlewares/validationErrorHandler');
const favoriteController = require('../controllers/favoriteController');
const favoriteValidator = require('../validators/favoriteValidator');

const router = express.Router();

router.post(
    '/create',
    reviewValidator.validateCreateReview,
    handleValidationErrors,
    reviewController.createReview
);

router.get(
    '/book/:bookId',
    reviewValidator.validateBookId,
    handleValidationErrors,
    reviewController.getReviewsByBook
);

router.get(
    '/:userId',
    reviewValidator.validateUserId,
    handleValidationErrors,
    reviewController.getReviewsByUser
);

router.put(
    '/update/:id',
    reviewValidator.validateUpdateReview,
    reviewValidator.validateReviewId,
    handleValidationErrors,
    reviewController.updateReview
);

router.delete('/delete/:id',
    reviewValidator.validateReviewId,
    handleValidationErrors,
    reviewController.deleteReview
);

router.post(
    '/add',
    favoriteValidator.validateCreateFavorite,
    favoriteController.createFavorite
);

router.get(
    '/favorites/:userId',
    favoriteValidator.validateUserId,
    favoriteController.getFavoritesByUser
);

router.delete(
    '/favorites/delete/:id',
    favoriteValidator.validateID,
    favoriteController.deleteFavorite
);

module.exports = router;