const express     = require('express'),
    router        = express.Router(),
    controller    = require('../controllers/product');

//  == This route will give us back all products: ==  //

router.get('/', controller.findAll);

//  == This route allow us to add an extr product: ==  //

router.post('/add', controller.insert);

//  == This route allow us to delete one product, it will be that with the id we are providing: ==  //

router.post('/delete', controller.delete);

//  == This route allow us to update one product, it will be that with the id we are providing ==  //

router.post('/update', controller.update);

//  == This route will give us back one product, it will be that with the id we are providing: ==  //

router.get('/:batch', controller.findOne);

module.exports = router;