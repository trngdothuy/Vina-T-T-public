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
    await mongoose.connect('mongodb://127.0.0.1/project')
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

// Set the server to listen on port 
app.listen(4000, () => console.log(`listening on port 4000`))