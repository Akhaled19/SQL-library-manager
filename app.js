//requiring modules 
//const Sequelize = require('sequelize');
const express = require('express');
const sequelize = require('./models').sequelize;
//middleware 
//if the req.body doesn't return anything back then run this command in the terminal: npm install body-parser
const bodyParse = require('body-parser');

const app = express();

                            /*Middleware*/
//set up the 'view engine' to pug 
app.set('view engine', 'pug');    

//view engine setup
app.use(express.json());
app.use(express.urlencoded({extended: false}));

                            /* Routes */
//import router 
const mainRoute = require('./routes');
const bookRoute = require('./routes/books');

//use imported routes 
app.use('/', mainRoute);
app.use('/books', bookRoute);



                        /*Start Server*/
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('This application is running on localhost:3000');
    });
});