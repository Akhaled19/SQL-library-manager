//requiring modules 
const Sequelize = require('Sequelize');

//export the initialized Book model   
module.exports = (sequelize) => {
    //define a book model 
    class Book extends Sequelize.Model {}
    //initialize & configure the model
    Book.init({
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
        genre: Sequelize.STRING,
        year: Sequelize.INTEGER
    }, {sequelize});
    
    return Book;
}