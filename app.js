//requiring modules 
const Sequelize = require('sequelize');
const express = require('express');
const app = express();

                            /*Middleware*/
//set up the 'view engine' to pug 
app.set('view engine', 'pug');                            


//Sequelize instance 
//initialize the SQLite database & connect  
// const sequelize = new Sequelize({
//     dialect: "sqlite",
//     storage: "books.db"
// });

//define a book model 
class Book extends Sequelize.Model {}
//initialize & configure the model
Book.init({
    title: Sequelize.STRING
    // author: sequelize.STRING,
    // genre: sequelize.STRING,
    // year: sequelize.INTEGER
}, {Sequelize: sequelize});

//async LIFE function 
(async () => {
    //sync all tables 
    //await Book.sync({ force: true });
    try {
        const book = await Book.create({
            title: 'Hunger Games',
        });
        console.log(book.toJSON());

      //error holds the details about an error  
    } catch (error){
        //if the error is SequelizeValidationError return the error messages array 
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            console.error('Validation errors: ', errors);
        //rethrow other types of errors caught by catch    
        } else {
            throw error;
        }
    }

})();
