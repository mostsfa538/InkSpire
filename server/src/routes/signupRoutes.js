const router = require("express").Router()
const  sessionState = require("../middlewares/sessionState.js")
const loginValidator = require("../validators/loginValidator")
const handleValidationErrors = require("../middlewares/validationErrorHandler")
const singupController = require('../controllers/signupController')

router.get('/signup',
    sessionState,
    singupController.getSignup
)
router.post("/signup",
    loginValidator.emailValidator,
    loginValidator.passwordValidator,
    handleValidationErrors,
    singupController.postSignup
)

module.exports = router