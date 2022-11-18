const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    categoryRoute = require('./routes/CategoryRoute')
    productRoute = require('./routes/ProductRoute')
    userRoute = require('./routes/UserRoute')

// to print incoming requests from mongoose in the terminal
mongoose.set('debug',true)
// =================== setting to use the body of a request ===================
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// connecting to mongo and checking if DB is running
async function connecting(){
try {
    await mongoose.connect('mongodb+srv://dtt2312:Trang123@cluster0.b4coe7a.mongodb.net/project1?retryWrites=true&w=majority')
    console.log('Connected to the DB')
} catch ( error ) {
    console.log('ERROR: Seems like your DB is not running, please start it up !!!');
}
}
connecting()
// end of connecting to mongo and checking if DB is running

// routes
app.use('/category', categoryRoute);
app.use('/product', productRoute);
app.use('/user', userRoute);

// Admin Bro
// npm i adminjs @adminjs/express @adminjs/mongoose  tslib express-formidable express-session
const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
// const mongoose =  require('mongoose')
AdminJS.registerAdapter(require("@adminjs/mongoose"));
const Users = require ("./models/usersModel")
const Products = require ("./models/productsModel")
const Categories = require ("./models/categoriesModel")
const adminOptions = {
    resources: [Users, Products, Categories],
    rootPath: "/admin"
  }
const admin = new AdminJS(adminOptions)
const router = AdminJSExpress.buildRouter(admin);
app.use(admin.options.rootPath, router);
// end admin bro

// Set the server to listen on port 
app.listen(4000, () => console.log(`listening on port 4000`))