const Category = require('../models/categoriesModel');
const Product = require('../models/productsModel');

class CategoryController {
    // GET FIND ALL
    async findAll(req, res){
        try{
            const category = await Category.find({});
            res.send({ ok: true, data: category});
        }
        catch(e){
            res.send({e})
        }
    }
    // FIND ONE 
    async findOne(req ,res){
        let { category } = req.params;
        //  console.log('this is category')
        // console.log(category)
        try{
            const result = await Category.findOne({ category: category });
            // console.log('this is result')
            // console.log(result)
            if (result === null) {
                // console.log('this is result')
                // console.log(result)
                res.send({ ok: true, data: `Category ${category} doesn't exist` });
            } else {
                // const display = await Product.findOne({ category: category });
                // console.log('this is display')
                // console.log(display)
                res.send({ ok: true, data: [result]});
            } 
        }
        catch(e){
            // console.log(e)
            res.send({e})
        }

    }
    // POST ADD ONE
    async insert (req, res) {
        let { category } = req.body;
        try{
            // console.log({category});
                await Category.create({
                    category: category.category, 
                    price: category.price, 
                    color: category.color, 
                    description: category.description, 
                    nutrients: category.nutrients, 
                    plantation: category.plantation, 
                    manufacturer: category.manufacturer,
                    photo: category.photo,
                    testimonial1: category.testimonial1,
                    testimonial2: category.testimonial2,
                    testimonial3: category.testimonial3,
                    testimonial_photo1: category.testimonial_photo1,
                    testimonial_photo2: category.testimonial_photo2,
                    testimonial_photo3: category.testimonial_photo3,
                    testimonial_name1: category.testimonial_name1,
                    testimonial_name2: category.testimonial_name2,
                    testimonial_name3: category.testimonial_name3
                });
                // console.log(`this is the result`)
                // console.log(done)
                res.send({ ok: true, data: `Category ${category.category} added successfully` })
        }
        catch(e){
            // console.log(e)
            if (e.code == 11000) {
                console.log(`this is`)
                console.log(category.category)
                res.send({ ok: true, data: `Category ${category.category} already exists` })
            } else {res.send({e})}
            
        }
    }
    // DELETE
    async delete (req, res){
        // console.log('delete!!!')
        let { category } = req.body;
        // console.log(category)
        // console.log(category.category)
        try{
            const removed = await Category.deleteOne({ category: category.category });
            if (removed.deletedCount === 0) {
                res.send({ ok: true, data: `Category ${category.category} doesn't exist` })
            } else {
                res.send({ ok: true, data: `Category ${category.category} deleted successfully` });    
            }
        }
        catch(error){
            res.send({error});
        };
    }
    // UPDATE by name

    async update (req, res){
        let { old_category, new_category } = req.body;
        
        try{
            
            // console.log(new_category);
            const updated = await Category.findOneAndUpdate(
                { category: old_category.category },{$set:{ 
                    category: new_category.category,
                    price: new_category.price,
                    color: new_category.color,
                    description: new_category.description,
                    nutrients: new_category.nutrients,
                    manufacturer: new_category.manufacturer,
                    plantation: new_category.plantation,
                    photo: category.photo,
                    testimonial1: category.testimonial1,
                    testimonial2: category.testimonial2,
                    testimonial3: category.testimonial3,
                    testimonial_photo1: category.testimonial_photo1,
                    testimonial_photo2: category.testimonial_photo2,
                    testimonial_photo3: category.testimonial_photo3,
                    testimonial_name1: category.testimonial_name1,
                    testimonial_name2: category.testimonial_name2,
                    testimonial_name3: category.testimonial_name3,
                }}
             );
            //  console.log(updated)
             if (updated.modifiedCount === 0) {
                res.send({ ok: true, data: `Category ${old_category.category} doesn't exist` });
             } else {
                res.send({ ok: true, data: `Category ${new_category.category} updated successfully` });
             }
        }
        catch(error){
            res.send({error})
        };
    }


};
module.exports = new CategoryController();