                        /*require dependencies*/
// app.js requirements to be able to run the app 

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const sequelize = require('./models').sequelize;
//middleware 
const bodyParse = require('body-parser');

//create an express app
const app = express();


                            /*Middleware*/
//set up the 'view engine' to pug
app.set('view engine', 'pug');

app.use(bodyParse.urlencoded({extended: false}));
app.use(express.urlencoded({extended: false}));

//serve the static files 
app.use('/static', express.static('public'));
app.use('/static', express.static('images'));

// setup morgan which gives us http request logging
app.use(morgan('dev'));

//app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
//app.use(express.static(__dirname + '/public'));  


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