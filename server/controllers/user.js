const Users = require('../models/usersModel');
const argon2 = require("argon2"); //https://github.com/ranisalt/node-argon2/wiki/Options
const jwt = require("jsonwebtoken");
const validator = require("validator");
const jwt_secret = process.env.JWT_SECRET;
// const ObjectId = require('mongoose').Types.ObjectId;
class UsersController {
    // Display all users
    async findAll(req, res){
        try{
            const users = await Users.find({});
            res.send({ ok: true, data: users});
        }
        catch(e){
            res.send({e})
        }
    }
    // Display one user
    async findOne(req ,res){
        let {user} = req.params;
        try{
            const result = await Users.findOne({email: user.email});
            // console.log(`this is` + result);
            if (result === null) {
                res.send({ ok: true, data: `User ${user.email} doesn't exist` });
            } else {
                res.send({ok:true, data:result});
            } 
        }
        catch(e){
            res.send({e})
        }
    }
    // Create a new user
    async insert (req, res) {
        let { user } = req.body;
        try{
            const result = await Users.findOne({name: user.email});
            // console.log(`this is` + result);
            if (result === null) {
                const done = await Users.create({email: user.email,
                    password: user.password,
                    name: user.name})
                res.send({ ok: true, data: `user ${user.email} added successfully` })
            } else {
                res.send({ ok: true, data: `user ${user.email} already exists` })
            }
        }
        catch(e){
            // console.log(e)
            if (e.code == 11000) {
                res.send({ ok: true, data: `user ${user.email} already exists` })
            } else {res.send({e})}
        }
    }
    // Delete that user 
    async delete (req, res){
        // console.log('delete!!!')
        let { user } = req.body;
        try{
            const removed = await Users.deleteOne({ email: user.email });
            // console.log(removed)
            if (removed.deletedCount === 0 ) {
                res.send({ ok: true, data: `user ${user.email} doesn't exist` });
            } else {
                res.send({ ok: true, data: `user ${user.email} deleted successfully` });
            } 
        }
        catch(error){
            res.send({error});
        };
    }
    // UPDATE info

    async update (req, res){
        let { old_user, new_user } = req.body;
        try{
            const updated = await Users.findOneAndUpdate(
                {email: old_user.email},
                {$set:{ password: new_user.password, 
                    name: new_user.name, 
                    dob: new_user.dob, 
                    address: new_user.address, 
                    phone_number: new_user.phone_number, 
                    favorite: new_user.favorite, 
                    order_history: new_user.order_history}});
             if (updated === null) {
                res.send({ ok: true, data: `user ${old_user.email} doesn't exist` })
             } else {
                res.send({ ok: true, data: `user ${new_user.email} updated successfully` });
             }
        }
        catch(error){
            if (error.code == 11000) {
                res.send({ ok: true, data: `product ${old_user.email} doesn't exist` })
            } else {res.send({error})}
        };
    }


};
module.exports = new UsersController();