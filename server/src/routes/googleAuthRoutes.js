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
    // passport.authenticate('google'),
    googelAuthController.redirectGoogle
)
// router.post('/logout', googelAuthController.logout);
module.exports = router