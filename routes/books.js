const express = require('express');
const Sequelize = require('sequelize');
//const Op = Sequelize.Op;
const router = express.Router();
const Book = require('../models').Book;

//const router = new Router();

/* Handler function to wrap each route */
function asyncHandler(callback) {
    return async(req, res, next) => {
        try {
            await callback(req, res, next)
        } catch(error) {
            res.status(500).send(error);
        }
    }
}

/* Get books listing */
router.get('/page/:page', asyncHandler(async(req, res, next) => {
    const page = req.params.page; //page number
    const number = 5
    const limit = number;
    const offset = page  * number;
    //const query = req.query.term;
    
        
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
    }else {
        res.render('index', {books: books.rows, title: 'Books', pageLinkArray: pageLinkArray, page } );
    }
}));


/* Get books listing */
// router.get('/', asyncHandler(async(req, res)=> {
//     //shows the full list of the books 
//     const books = await Book.findAll();
//     res.render('index', {books: books, title: 'Books'} );
// }));


/* Get the new book form */
router.get('/new', asyncHandler(async(req, res) => {
    //shows the create new book form
    res.render('form', { book:{}, title: 'New Book'});
}));


/* Post a new book entry */
router.post('/new', asyncHandler(async(req, res)=>{
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
            res.render('form', {book: book, errors: error.errors, title: "New Book"} );
        } else {
            // error caught in the asyncHandler's catch block
            throw error; 
        }
    }
}));


/* Get book details form */
router.get('/:id', asyncHandler(async(req, res)=>{
    const book = await Book.findByPk(req.params.id);
    //if the book exists, render the book detail form 
    if(book) {
        res.render('update-book', {book: book, title: book.title });
    // otherwise, send a 404 status to the client    
    } else {
        res.sendStatus(404);
    }
}));


/* Post update book details in db /books/:id */
router.post('/:id', asyncHandler(async(req, res)=>{
    //updates book info in the database
    const book = await Book.findByPk(req.params.id);
    try{
        //new instance with update method when there is NO errors
        await book.update(req.body);
        res.redirect('/books/page/1');

    }catch(error){
        //check if there is an error with the update
        if(error.name === "SquelizeValidationError") {
            book = await Book.build(req.body); 
            //make sure correct book gets updated
            book.id = req.params.id; 
            res.render('update-book', {book: book, errors: error.errors, title: 'Edit Book'})
        }else {
            throw error;
        }  
    }  
}));


/* Get delete book */
router.get('/:id/delete', asyncHandler(async(req,res)=>{
    const book = await Book.findByPk(req.params.id);
    //render the book detail form 
    res.render('delete-book', {book: book, title: book.title });
}));

/* Post delete book */
router.post('/:id/delete', asyncHandler(async(req, res)=>{
    //Deletes a book. Careful, this can't be undone. It can be helpful to create a new "test" book to test deleting
    const book = await Book.findByPk(req.params.id);
    await book.destroy();
    res.redirect('/books/page/1');
}));

module.exports = router;