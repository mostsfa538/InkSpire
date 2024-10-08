const {body} = require("express-validator")

const emailValidator = [
    body('email')
    .escape()
    .not().isEmpty().withMessage(`email is required`)
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("invalid email address"),
]
const passwordValidator = [
    body("password")
    .escape()
    .not().isEmpty().withMessage("password is required")
    .trim()
    .isLength({min:8})
    .withMessage(`password can't be less than 8 characters`)
]

module.exports = {emailValidator, passwordValidator}