const loginContoller = require('../controllers/loginController')

const router = require('express').Router()

router.get('/login', loginContoller.getLogin)
router.post('/login', loginContoller.postLogin)
router.post('/logout', loginContoller.logout)

module.exports = router