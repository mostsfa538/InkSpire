const router = require("express").Router()
const googelAuthController = require("../controllers/googleAuthController")
const passport = require("passport")

router.get(
    "/auth/google",
    passport.authenticate('google'),
    googelAuthController.getGoogleLogin
)
router.get(
    '/auth/google/redirect',
    googelAuthController.redirectGoogle
)
module.exports = router