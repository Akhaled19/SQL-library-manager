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
            allowNull: false
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false
        },
        genre: Sequelize.STRING,
        year: Sequelize.INTEGER
    }, {sequelize});
    
    return Book;
}