const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    categoryRoute = require('./routes/CategoryRoute'),
    productRoute = require('./routes/ProductRoute'),
    userRoute = require('./routes/UserRoute')
    emailRoute = require('./routes/EmailsRoute')

    require("dotenv").config({path: './.env'});
    // to hide env
    const port = process.env.PORT || 3040


// to print incoming requests from mongoose in the terminal
mongoose.set('debug',true)

//=============================    CORS SETTINGS    =============================================
//
const cors = require("cors");
// to send request from different url
// to enable cors for any requests
app.use(cors())

//or enable it only for the specific url
// app.options('/sendEmail', cors());

// allowing requests from the front-end to our server with api calls
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
    next();
  });
//===============================================================================================

// =================== setting to use the body of a request ===================
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// connecting to mongo and checking if DB is running
async function connecting(){
try {
    await mongoose.connect(process.env.MONGO)
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
app.use('/users', userRoute);
app.use('/emails', emailRoute);

// for serving static files if you need to
//.use(app.static('../'))

// // serving 404 page
// var path = require('path');

// // viewed at http://localhost:8080
// app.use('/', function(req, res) {
// 	console.log(res)
// 	res.sendFile(path.join(__dirname + '/../404/'));
// });

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
app.listen(port, () => console.log(`server listening on port ${port}`));