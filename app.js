//requiring modules 
//const Sequelize = require('sequelize');
const express = require('express');
const sequelize = require('./models').sequelize;

//middleware 
const bodyParse = require('body-parser');

const app = express();

//view engine setup
app.use(express.json());
app.use(express.urlencoded({extended: false}))


                            /*Middleware*/
//set up the 'view engine' to pug 
app.set('view engine', 'pug');                            


                        /*Start Server*/
sequelize.async().then(() => {
    app.listen(3000, () => {
        console.log('This application is running on localhost:3000')
    })
})

