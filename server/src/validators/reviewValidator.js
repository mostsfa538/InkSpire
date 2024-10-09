const { check, param } = require('express-validator');


const validateReviewId = [
    check('id')
        .isInt({ gt: 0 }).withMessage('ID must be a positive integer')
];

const validateBookId = [
    param('bookId')
        .isInt({ gt: 0 }).withMessage('ID must be a positive integer')
];

const validateCreateReview = [
    check('bookId')
        .isInt({ gt: 0 }).withMessage('Book ID must be a positive integer'),
    check('userId')
        .isInt({ gt: 0 }).withMessage('User ID must be a positive integer'),
    check('rating')
        .isInt({ gt: 0, lt: 6 }).withMessage('Rating must be an integer between 1 and 5'),
    check('body')
        .isString().withMessage('Body must be a string')
];

const validateUpdateReview = [
    check('bookId')
        .optional()
        .isInt({ gt: 0 }).withMessage('Book ID must be a positive integer'),
    check('userId')
        .optional()
        .isInt({ gt: 0 }).withMessage('User ID must be a positive integer'),
    check('rating')
        .optional()
        .isInt({ gt: 0, lt: 6 }).withMessage('Rating must be an integer between 1 and 5'),
    check('body')
        .optional()
        .isString().withMessage('Body must be a string')
];

module.exports = {
    validateReviewId,
    validateBookId,
    validateCreateReview, 
    validateUpdateReview
};