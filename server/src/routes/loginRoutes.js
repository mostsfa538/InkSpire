const loginContoller = require('../controllers/loginController')
const router = require('express').Router()
const loginValidator = require('../validators/loginValidator.js')
const sessionState = require("../middlewares/sessionState.js")
const handleValidationErrors = require('../middlewares/validationErrorHandler');

router.get('/login',
    sessionState,
    loginContoller.getLogin
)

router.post('/login',
    loginValidator.emailValidator,
    loginValidator.passwordValidator,
    handleValidationErrors,
    loginContoller.postLogin
)
router.post('/logout',
    loginContoller.logout
)

module.exports = router