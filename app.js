//requiring modules 
const Sequelize = require('sequelize');
const express = require('express');
const app = express();


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
        console.error('Error connecting to the database: ', error);
    }

})();
