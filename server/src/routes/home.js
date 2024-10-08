const router = require('express').Router()
const sessionState = require('../middlewares/sessionState')
const homeController = require('../controllers/homeController')

router.get('/', sessionState, homeController.getHome)

module.exports = router