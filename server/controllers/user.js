const Users = require('../models/usersModel');
const argon2 = require("argon2"); //https://github.com/ranisalt/node-argon2/wiki/Options
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("dotenv").config({path: './.env'});
const jwt_secret = process.env.JWT_SECRET;
// const ObjectId = require('mongoose').Types.ObjectId;
class UsersController {
  // Display all users
  async findAll(req, res){
    // let {user} = req.params;
    // if (user.admin === true) {
      try{
        const users = await Users.find({});
        res.send({ ok: true, data: users});
    }
    catch(e){
        res.send({e})
    }
  }

    // Register
    // the client is sending this body object
//  {
//     email: form.email,
//     password: form.password,
//     password2: form.password2
//  }
async register (req, res) {
  const { email, password, password2 } = req.body;
  if (!email || !password || !password2){
    return res.json({ ok: false, message: "All fields required" });
  }
  if (password !== password2){
    return res.json({ ok: false, message: "Passwords must match" });
  }
  if (!validator.isEmail(email)){
    return res.json({ ok: false, message: "Please enter a valid email" });
  }
  try {
    const user = await Users.findOne({ email });
    if (user) return res.json({ ok: false, message: "Email already registered" });
    const hash = await argon2.hash(password); 
    console.log("hash ==>", hash);
    const newUser = {
      email,
      password: hash,
    };
    await Users.create(newUser);
    res.json({ ok: true, message: "Successfully registered" });
  } catch (error) {
    res.json({ ok: false, error });
  }
};
// LOGIN
// the client is sending this body object
//  {
//     email: form.email,
//     password: form.password
//  }
  async login (req, res) {
  const { email, password } = req.body;
  if (!email || !password){
    return res.json({ ok: false, message: "All field are required" });
  }
  if (!validator.isEmail(email)){
    return res.json({ ok: false, message: "Please enter a valid email" });
  }
  try {
    const user = await Users.findOne({ email });
    if (!user) return res.json({ ok: false, message: "You haven't registered yet. Please sign up!" });
    const match = await argon2.verify(user.password, password);
    if (match) {
      // once user is verified and confirmed we send back the token to keep in localStorage in the client and in this token we can add some data -- payload -- to retrieve from the token in the client and see, for example, which user is logged in exactly. The payload would be the first argument in .sign() method. In the following example we are sending an object with key userEmail and the value of email coming from the "user" found in line 142
      const token = jwt.sign({userEmail:user.email,admin:user.admin}, jwt_secret, { expiresIn: "1h" }); //{expiresIn:'365d'}
      // after we send the payload to the client you can see how to get it in the client's Login component inside handleSubmit function
      res.json({ ok: true, message: "Welcome back!", token, email, admin:user.admin });
    } else return res.json({ ok: false, message: "invalid data provided" });
  } catch (error) {
    console.log(error)
    res.json({ ok: false, error });
  }
};
// verify token
async verify_token (req, res) {
  // console.log(req.headers.authorization);
  const token = req.headers.authorization;
  jwt.verify(token, jwt_secret, (err, succ) => {
    err
      ? res.json({ ok: false, message: "something went wrong" })
      : res.json({ ok: true, succ });
  });
}

    // Display one user - check if admin or user itseld - match token 
    async findOne(req ,res){
      let {user} = req.params;
      const token = jwt.sign({userEmail:user.email}, jwt_secret, { expiresIn: "1h" });
      // console.log(token)
      if (!jwt.verify(token, jwt_secret)) {
          res.json({ ok: false, message: "something went wrong" })
        } else {
          try {
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
      }
      
    // Create a new user
    // async insert (req, res) {
    //     let { user } = req.body;
    //     try{
    //         const result = await Users.findOne({name: user.email});
    //         // console.log(`this is` + result);
    //         if (result === null) {
    //             const done = await Users.create({email: user.email,
    //                 password: user.password,
    //                 name: user.name})
    //             res.send({ ok: true, data: `user ${user.email} added successfully` })
    //         } else {
    //             res.send({ ok: true, data: `user ${user.email} already exists` })
    //         }
    //     }
    //     catch(e){
    //         // console.log(e)
    //         if (e.code == 11000) {
    //             res.send({ ok: true, data: `user ${user.email} already exists` })
    //         } else {res.send({e})}
    //     }
    // }

    // Delete that user  - admin or user itself 
    async delete (req, res){
        // console.log('delete!!!')
        let { user } = req.body;
        if (user.admin === true) {
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