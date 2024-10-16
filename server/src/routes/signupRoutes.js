const router = require("express").Router()
const loginValidator = require("../validators/loginValidator")
const handleValidationErrors = require("../middlewares/validationErrorHandler")
const singupController = require('../controllers/signupController')

router.get('/signup',
    singupController.getSignup
)
router.post("/signup",
    loginValidator.emailValidator,
    loginValidator.passwordValidator,
    handleValidationErrors,
    singupController.postSignup
)

module.exports = router