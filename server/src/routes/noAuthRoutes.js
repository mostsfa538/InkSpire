const express = require('express');
const userController = require('../controllers/userController');
const reviewController = require('../controllers/reviewController');
const userValidator = require('../validators/userValidator');
const handleValidationErrors = require('../middlewares/validationErrorHandler');

const router = express.Router();

router.get('/', userController.getBooks);

router.get(
    '/search/:searchTerm',
    userValidator.validateSearch,
    handleValidationErrors,
    userController.searchByCategory
);

router.get('/:id',
    userValidator.validateBookId,
    handleValidationErrors,
    userController.getBookById
);

router.get('/reviews/:id',
    userValidator.validateBookId,
    handleValidationErrors,
    reviewController.getReviewsByBook
);

router.get('/books/popular', userController.getPopularBooks);

module.exports = router;