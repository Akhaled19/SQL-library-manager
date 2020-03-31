'use strict';
const Sequelize = require('sequelize');

//const db = {}

//configure the Sequelize instance and require the Book model defined in the book.js file
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'library.db',
    logging: false
});

const db = {
    sequelize,
    Sequelize,
    models: {},
}

db.models.Book = require('./book.js')(sequelize);

module.exports = db; //export 'db' object 

db.sequelize = sequelize; //Add any new model to the 'db' object
db.Sequelize = Sequelize; //Assign the Sequelize module to a `Sequelize` property in the `db` object

