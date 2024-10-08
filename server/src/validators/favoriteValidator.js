const { check, param } = require('express-validator');

const validateID = [
    check('id')
        .isInt({ gt: 0 }).withMessage('ID must be a positive integer')
];

const validateUserId = [
    param('userId')
    .isInt({ gt: 0 }).withMessage('ID must be a positive integer')
]
const validateCreateFavorite = [
    check('userId')
        .not().isEmpty().withMessage('User ID is required')
        .isInt({ gt: 0 }).withMessage('User ID must be a positive integer'),
    check('bookId')
        .not().isEmpty().withMessage('Book ID is required')
        .isInt({ gt: 0 }).withMessage('Book ID must be a positive integer')
];

module.exports = { validateID,
    validateUserId,
    validateCreateFavorite
};
