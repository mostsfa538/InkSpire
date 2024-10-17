const express = require('express');
const adminController = require('../controllers/adminController');
const adminBookValidator = require('../validators/adminBookValidator');
const handleValidationErrors = require('../middlewares/validationErrorHandler');
const checkAdmin = require('../middlewares/checkAdmin');

const router = express.Router();

router.post(
    '/create-admin',
    adminBookValidator.validateID,
    handleValidationErrors,
    adminController.createAdmin
);

router.post(
    '/create',
    checkAdmin,
    adminBookValidator.validateCreateBook,
    handleValidationErrors, adminController.createBook
);

router.get(
    '/', 
    checkAdmin, 
    adminController.getBooks
);

router.get('/:id',
    adminBookValidator.validateID,
    checkAdmin,
    handleValidationErrors,
    adminController.getBook
);

router.put(
    '/update/:id',
    checkAdmin,
    adminBookValidator.validateUpdateBook,
    adminBookValidator.validateID,
    handleValidationErrors,
    adminController.updateBook
);
router.delete('/delete/:id',
    checkAdmin,
    adminBookValidator.validateID,
    handleValidationErrors,
    adminController.deleteBook
);

router.get(
    '/requests', 
    checkAdmin,
    adminController.getRequests);

router.put('/approve/:id',
    adminBookValidator.validateID,
    checkAdmin,
    handleValidationErrors,
    adminController.approveRequest
);

router.put('/reject/:id',
    checkAdmin,
    adminBookValidator.validateID,
    handleValidationErrors,
    adminController.rejectRequest
);

router.get(
    '/orders',
    checkAdmin,
    adminController.getOrders);

router.put('/update-order/:id',
    adminBookValidator.validateID,
    checkAdmin,
    adminBookValidator.validateUpdateOrder,
    handleValidationErrors,
    adminController.updateOrder
);

router.delete('/delete-order/:id',
    adminBookValidator.validateID,
    checkAdmin,
    handleValidationErrors,
    adminController.deleteOrder
);


module.exports = router;