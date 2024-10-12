const {check} = require('express-validator');

const validateUserId = [
    check('userId')
        .isInt({ gt: 0 }).withMessage('ID must be a positive integer')
];

const validateSearch = [
    check('searchTerm')
      .trim()
      .notEmpty().withMessage('Search term cannot be empty')
      .isString().withMessage('Search term must be a string')
      .isLength({ max: 100 }).withMessage('Search term is too long (max 100 characters)')
];

const validateUploadBook = [
    check('title')
      .trim()
      .notEmpty().withMessage('Title cannot be empty')
      .isString().withMessage('Title must be a string')
      .isLength({ max: 100 }).withMessage('Title is too long (max 100 characters)'),
    check('author')
      .trim()
      .notEmpty().withMessage('Author cannot be empty')
      .isString().withMessage('Author must be a string')
      .isLength({ max: 100 }).withMessage('Author is too long (max 100 characters)'),
    check('image')
      .trim()
      .notEmpty().withMessage('Image cannot be empty')
      .isString().withMessage('Image must be a string')
      .isLength({ max: 100 }).withMessage('Image is too long (max 100 characters)'),
    check('price')
      .trim()
      .notEmpty().withMessage('Price cannot be empty')
      .isNumeric().withMessage('Price must be a number'),
    check('description')
      .trim()
      .notEmpty().withMessage('Description cannot be empty')
      .isString().withMessage('Description must be a string')
      .isLength({ max: 1000 }).withMessage('Description is too long (max 1000 characters)'),
    check('category')
        .trim()
        .notEmpty().withMessage('Category cannot be empty')
        .isString().withMessage('Category must be a string')
        .isLength({ max: 100 }).withMessage('Category is too long (max 100 characters)'),
];

const validateUpdateProfile = [
    check('f_name')
        .optional()
        .trim()
        .notEmpty().withMessage('First name cannot be empty')
        .isString().withMessage('First name must be a string')
        .isLength({ max: 100 }).withMessage('First name is too long (max 100 characters)'),
    check('l_name')
        .optional()
        .trim()
        .notEmpty().withMessage('Last name cannot be empty')
        .isString().withMessage('Last name must be a string')
        .isLength({ max: 100 }).withMessage('Last name is too long (max 100 characters)'),
    check('image')
        .optional()
        .trim()
        .notEmpty().withMessage('Image cannot be empty')
        .isString().withMessage('Image must be a string')
        .isLength({ max: 100 }).withMessage('Image is too long (max 100 characters)')
]

const updateBook = [
    check('title')
        .optional()
        .trim()
        .notEmpty().withMessage('Title cannot be empty')
        .isString().withMessage('Title must be a string')
        .isLength({ max: 100 }).withMessage('Title is too long (max 100 characters)'),
    check('author')
        .optional()
        .trim()
        .notEmpty().withMessage('Author cannot be empty')
        .isString().withMessage('Author must be a string')
        .isLength({ max: 100 }).withMessage('Author is too long (max 100 characters)'),
    check('image')
        .optional()
        .trim()
        .notEmpty().withMessage('Image cannot be empty')
        .isString().withMessage('Image must be a string')
        .isLength({ max: 100 }).withMessage('Image is too long (max 100 characters)'),
    check('price')
        .optional()
        .trim()
        .notEmpty().withMessage('Price cannot be empty')
        .isNumeric().withMessage('Price must be a number'),
    check('description')
        .optional()
        .trim()
        .notEmpty().withMessage('Description cannot be empty')
        .isString().withMessage('Description must be a string')
        .isLength({ max: 1000 }).withMessage('Description is too long (max 1000 characters)')
];

module.exports = {
    validateUserId,
    validateUploadBook,
    validateSearch,
    validateUpdateProfile,
    updateBook
};