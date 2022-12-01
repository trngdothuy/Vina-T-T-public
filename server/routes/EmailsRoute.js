const router     = require('express').Router();
const controller = require('../controllers/emails.js')

router.post('/send_email',controller.send_email)

module.exports = router