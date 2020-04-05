'use strick';

//requiring modules 
const Sequelize = require('sequelize');

//export the initialized Book model   
module.exports = (sequelize) => {
    //define a book model 
    class Book extends Sequelize.Model {}
    //initialize & configure the model
    Book.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    //custom error message 
                    msg: 'Please provide a value for "title"',
                }
            },
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    //custom error message 
                    msg: 'Please provide a value for "author"',
                }
            },
        },
        genre: {
            type: Sequelize.STRING
        },
        year: {
            type: Sequelize.INTEGER
        }
    }, {sequelize});
    
    return Book;
};
