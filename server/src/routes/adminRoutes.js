const express = require('express');
const adminController = require('../controllers/adminController');
const adminBookValidator = require('../validators/adminBookValidator');
const handleValidationErrors = require('../middlewares/validationErrorHandler');

const router = express.Router();

router.post(
    '/create', 
    adminBookValidator.validateCreateBook, 
    handleValidationErrors, adminController.createBook
);
router.get('/', adminController.getBooks);

router.put(
    '/update/:id',
    adminBookValidator.validateUpdateBook,
    adminBookValidator.validateID,
    handleValidationErrors,
    adminController.updateBook
);
router.delete('/delete/:id', 
    adminBookValidator.validateID,
    handleValidationErrors,
    adminController.deleteBook
);

router.get('/requests', adminController.getRequests);

router.put('/approve/:id',
    adminBookValidator.validateID,
    handleValidationErrors,
    adminController.approveRequest
);

router.put('/reject/:id',
    adminBookValidator.validateID,
    handleValidationErrors,
    adminController.rejectRequest
);

module.exports = router;