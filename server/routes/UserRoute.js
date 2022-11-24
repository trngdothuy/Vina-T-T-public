const express     = require('express'),
    router        = express.Router(),
    controller    = require('../controllers/user');

//  == This route will give us back all users: ==  //'

router.get('/', controller.findAll);


//  == This route allow us to add an extr user: ==  //

// router.post('/login', controller.insert);

//  == This route allow us to delete one user, it will be that with the id we are providing: ==  //

router.post('/delete', controller.delete);

//  == This route allow us to register one user, it will be that with the id we are providing ==  //

router.post('/update', controller.update);

router.post('/register', controller.register);

//login
router.post('/login', controller.login);

//verify token to check who is log in
router.post('/verify-token', controller.verify_token);

//look for the user
router.get('/:user', controller.findOne);


module.exports = router;