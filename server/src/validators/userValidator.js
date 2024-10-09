const {check} = require('express-validator');

const validateSearch = [
    check('searchTerm')
      .trim()
      .notEmpty().withMessage('Search term cannot be empty')
      .isString().withMessage('Search term must be a string')
      .isLength({ max: 100 }).withMessage('Search term is too long (max 100 characters)')
];

module.exports = {
    validateSearch
};