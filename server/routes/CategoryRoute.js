const express     = require('express'),
    router        = express.Router(),
    controller    = require('../controllers/category');

//  == This route will give us back all categories  //

router.get('/', controller.findAll);

//  == This route allow us to add an extr category //

router.post('/add', controller.insert);

//  == This route allow us to delete one category, it will be that with the id we are providing: ==  //

router.post('/delete', controller.delete);

//  == This route allow us to update one category, it will be that with the id we are providing ==  //

router.post('/update', controller.update);

//  == This route will give us back one category, it will be that with the id we are providing: ==  //

router.get('/:category', controller.findOne);

module.exports = router;