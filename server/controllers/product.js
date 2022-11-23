const Products = require('../models/productsModel');
const ObjectId = require('mongoose').Types.ObjectId;
class ProductsController {
    // GET FIND ALL
    async findAll(req, res){
        try{
            const products = await Products.find({});
            res.send({ ok: true, data: products});
        }
        catch(e){
            res.send({e})
        }
    }
    // FIND ONE 
    async findOne(req ,res){
        let {batch} = req.params;
        try{
            const result = await Products.findOne({fruit_batch: batch});
            console.log(result);
            if (result === null) {
                res.send({ ok: true, data: `Product ${product} doesn't exist` });
            } else {
                res.send({ok:true, data:result});
            } 
        }
        catch(e){
            res.send({e})
        }
    }
    // POST ADD ONE
    async insert (req, res) {
        let { product, category } = req.body;
        try{
            const result = await Products.findOne({fruit_batch: product.fruit_batch});
            // console.log(`this is` + result);
            if (result === null) {
                const done = await Products.create({
                    fruit_batch: product.fruit_batch,
                    harvest_date:  product.harvest_date,
                    packaging_date:  product.packaging_date,
                    farmers_name: product.farmers_name,
                    farmers_photo:  product.farmers_photo,
                    videos: product.videos,
                    category: category})
                res.send({ ok: true, data: `product ${category} ${product.fruit_batch} added successfully` })
            } else {
                res.send({ ok: true, data: `product ${category} ${product.fruit_batch} already exists` })
            }
        }
        catch(e){
            // console.log(e)
            if (e.code == 11000) {
                res.send({ ok: true, data: `product ${category} ${product.fruit_batch} already exists` })
            } else {res.send({e})}
        }
    }
    // DELETE 
    async delete (req, res){
        // console.log('delete!!!')
        let { product } = req.body;
        try{
            const removed = await Products.deleteOne({ name: product.name });
            // console.log(removed)
            if (removed.deletedCount === 0 ) {
                res.send({ ok: true, data: `product ${product.name} doesn't exist` });
            } else {
                res.send({ ok: true, data: `product ${product.name} deleted successfully` });
            } 
        }
        catch(error){
            res.send({error});
        };
    }
    // UPDATE 

    async update (req, res){
        let { old_product, new_product } = req.body;
        try{
            const updated = await Products.findOneAndUpdate(
                {fruit_batch: old_product.fruit_batch},{$set:{ fruit_batch: new_product.fruit_batch,
                    harvest_date:  new_product.harvest_date,
                    packaging_date:  new_product.packaging_date,
                    farmers_name: new_product.farmers_name,
                    farmers_photo:  new_product.farmers_photo,
                    videos: new_product.videos,
                    category: new_product.category}}
             );
             if (updated === null) {
                res.send({ ok: true, data: `product ${old_product.category} ${old_product.fruit_batch} doesn't exist` })
             } else {
                res.send({ ok: true, data: `product ${new_product.category} ${new_product.fruit_batch} updated successfully` });
             }
        }
        catch(error){
            if (error.code == 11000) {
                res.send({ ok: true, data: `product ${category} ${old_product.name} doesn't exist` })
            } else {
                console.log(error)
                res.send({error})}
        };
    }


};
module.exports = new ProductsController();