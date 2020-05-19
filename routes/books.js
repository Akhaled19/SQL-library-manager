const express = require('express');
const Sequelize = require('sequelize');
const {Op} = Sequelize;
const router = express.Router();
const {Book} = require('../models');

//const router = new Router();

/* Handler function to wrap each route */
function asyncHandler(callback) {
    return async(req, res, next) => {
        try {
            await callback(req, res, next)
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
            next(error);
        }
    }
}

/* Get books page listing */
router.get('/', asyncHandler(async(req, res, next) => {
    const page = req.query.page || 1; //page number
    const limit = 5;
    const offset = page  * limit;

        
    //shows the pages of the list of the books 
    const books = await Book.findAndCountAll({
        order: [[ "title", "ASC"]],
        limit: limit,
        offset: offset
    });

    //create an array of page links to iterate through in pug
    const pages = Math.ceil(books.count / limit); //calc for number of pages
 
    let pageLinkArray = [];
    for(let i = 1 ; i <= pages; i++ ){
        pageLinkArray.push(i);
    }

    if(page >= pageLinkArray.length) {
        next();
    } else {
         res.render('index', {books: books.rows, pageLinkArray, title: "Library Application"});
    }
}));





/* Get the new book form */
router.get('/new', asyncHandler(async(req, res) => {
    //shows the create new book form
    res.render('form', { book:{}, title: 'New Book'});
}));


/* Post a new book entry */
router.post('/new', asyncHandler(async(req, res) => {
    //posts a new book to the database
    let book;
    try {
        //new instance with create method when there is NO errors
        book = await Book.create(req.body);
        res.redirect('/books/' + book.id);

    } catch(error) {
        //checking the error
        if(error.name === "SequelizeValidationError") {
            //new instance with build method when there is minor errors 
            //once the minor error is fixed, the non-persistent model instance it will be stored in the database by the create()  
            book = await Book.build(req.body); //keep the filled inputs
            res.render('form', {book, errors: error.errors, title: "New Book"} );
        } else {
            // error caught in the asyncHandler's catch block
            throw error; 
        }
    }
}));


/* Get book details form */
router.get('/:id', asyncHandler(async(req, res) => {
    const book = await Book.findByPk(req.params.id);
    //if the book exists, render the book detail form 
    if(book) {
        res.render('update-book', {book, title: book.title });
    // otherwise, render the HTTP status code 500 template   
    } else {
        res.render('error');
    }
}));


/* Post update book details in db /books/:id */
router.post('/:id', asyncHandler(async(req, res) => {
    //updates book info in the database
    let book
    try {
        book = await Book.findByPk(req.params.id);
        //new instance with update method when there is NO errors
        await book.update(req.body);
        res.redirect('/');
    } catch (error) {
        //check if there is an error with the update
        if(error.name === "SequelizeValidationError") {
            book = await Book.build(req.body); 
            //make sure the correct book gets updated
            book.id = req.params.id; 
            res.render('update-book', {book, errors: error.errors, title: 'Edit Book'})
        } else {
            throw error;
        }  
    }  
}));


/* Get delete book */
router.get('/:id/delete', asyncHandler(async(req,res)=>{
    const book = await Book.findByPk(req.params.id);
    //if the book exists, render the book detail form 
    if(book) {
        res.render('delete-book', {book, title: book.title });
    //otherwise render the HTTP status code 500 template     
    } else {
        res.render('error');
    }
}));

/* Post delete book */
router.post('/:id/delete', asyncHandler(async(req, res) => {
    //Deletes a book. Careful, this can't be undone. It can be helpful to create a new "test" book to test deleting
    const book = await Book.findByPk(req.params.id);
    await book.destroy();
    res.redirect('/');
}));

module.exports = router;