const express = require('express');
const adminBookController = require('../controllers/bookController');
const adminBookValidator = require('../validators/adminBookValidator');
const handleValidationErrors = require('../middlewares/validationErrorHandler');

const router = express.Router();

router.post(
    '/create', 
    adminBookValidator.validateCreateBook, 
    handleValidationErrors, adminBookController.createBook
);
router.get('/', adminBookController.getBooks);

router.put(
    '/update/:id',
    adminBookValidator.validateUpdateBook,
    adminBookValidator.validateID,
    handleValidationErrors,
    adminBookController.updateBook
);
router.delete('/delete/:id', 
    adminBookValidator.validateID,
    handleValidationErrors,
    adminBookController.deleteBook);

module.exports = router;