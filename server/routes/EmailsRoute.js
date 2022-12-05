const router     = require('express').Router();
const controller = require('../controllers/emails.js')

router.post('/send_email',controller.send_email)
router.post('/send_email_confirm',controller.send_email_confirm)


module.exports = router