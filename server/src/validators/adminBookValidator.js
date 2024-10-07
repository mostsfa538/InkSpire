const { check } = require('express-validator');

const validateID = [
    check('id')
        .isInt({ gt: 0 }).withMessage('ID must be a positive integer')
];

const validateCreateBook = [
    check('title')
        .not().isEmpty().withMessage('Title is required')
        .isString().withMessage('Title must be a string'),
    check('author')
        .not().isEmpty().withMessage('Author is required')
        .isString().withMessage('Author must be a string'),
    check('description')
        .not().isEmpty().withMessage('Description is required')
        .isString().withMessage('Description must be a string'),
    check('image')
        .not().isEmpty().withMessage('Image is required')
        .isString().withMessage('Image must be a string (URL or path)'),
    check('price')
        .not().isEmpty().withMessage('Price is required')
        .isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),
    check('category')
        .not().isEmpty().withMessage('Category is required')
        .isString().withMessage('Category must be a string'),
    check('quantity')
        .not().isEmpty().withMessage('Quantity is required')
        .isInt({ gt: 0 }).withMessage('Quantity must be an integer greater than 0')
];

const validateUpdateBook = [
    check('title')
        .optional()
        .isString().withMessage('Title must be a string'),
    check('author')
        .optional()
        .isString().withMessage('Author must be a string'),
    check('description')
        .optional()
        .isString().withMessage('Description must be a string'),
    check('image')
        .optional()
        .isString().withMessage('Image must be a string (URL or path)'),
    check('price')
        .optional()
        .isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),
    check('category')
        .optional()
        .isString().withMessage('Category must be a string'),
    check('quantity')
        .optional()
        .isInt({ gt: 0 }).withMessage('Quantity must be an integer greater than 0')
];

module.exports = { validateID, validateCreateBook, validateUpdateBook };
