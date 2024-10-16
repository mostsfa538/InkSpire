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

router.get('/:id',
    adminBookValidator.validateID,
    handleValidationErrors,
    adminController.getBook
);

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

router.get('/orders', adminController.getOrders);

router.put('/update-order/:id',
    adminBookValidator.validateID,
    adminBookValidator.validateUpdateOrder,
    handleValidationErrors,
    adminController.updateOrder
);

router.delete('/delete-order/:id',
    adminBookValidator.validateID,
    handleValidationErrors,
    adminController.deleteOrder
);


module.exports = router;