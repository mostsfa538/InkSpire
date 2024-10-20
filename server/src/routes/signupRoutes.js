const router = require("express").Router()
const loginValidator = require("../validators/loginValidator")
const handleValidationErrors = require("../middlewares/validationErrorHandler")
const singupController = require('../controllers/signupController')

// e:x http://localhost:3000/signup
router.get('/signup',
    singupController.getSignup
)
// e:x http://localhost:3000/signup
router.post("/signup",
    loginValidator.emailValidator,
    loginValidator.passwordValidator,
    handleValidationErrors,
    singupController.postSignup
)

module.exports = router