                        /*require dependencies*/
// app.js requirements to be able to run the app 

const express = require('express');
const path = require('path');
const sequelize = require('./models').sequelize;
//middleware 
const bodyParse = require('body-parser');


const app = express();
const logger = require('morgan');

                            /*Middleware*/
//set up the 'view engine'
//app.set('views', path.join(__dirname, 'views'));



//view engine setup
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));  
app.set('view engine', 'pug');

app.use(bodyParse.urlencoded({extended: false}));
app.use('/static', express.static('public'));

app.use(logger('dev'));

                            /* Route Handler */
//import router 
const mainRoute = require('./routes');
const indexRoute = require('./routes/index');
const bookRoute = require('./routes/books');
const errorRoute = require('./routes/error');

//use imported routes 
//app.use(mainRoute);
app.use('/', indexRoute);
app.use('/books', bookRoute);
app.use(errorRoute);


                        /*Start Server*/
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('This application is running on localhost:3000');
    });
});