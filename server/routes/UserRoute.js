const express     = require('express'),
    router        = express.Router(),
    controller    = require('../controllers/user');

//  == This route will give us back all todos: ==  //'

router.get('/', controller.findAll);

//  == This route will give us back one todo, it will be that with the id we are providing: ==  //

//  == This route allow us to add an extr todo: ==  //

// router.post('/login', controller.insert);

//  == This route allow us to delete one todo t will be that with the id we are providing: ==  //

router.post('/delete', controller.delete);

//  == This route allow us to update one todo t will be that with the id we are providing ==  //

router.post('/update', controller.update);

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/verify-token', controller.verify_token);

router.get('/:user', controller.findOne);


module.exports = router;