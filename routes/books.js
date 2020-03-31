const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();
const Book = require('../models').Book;
const {Op} = Sequelize.Op;

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

/* Render books listing */
router.get('/', asyncHandler(async(req, res) => {
    //Home route should redirect to the /books route 
    res.render('index');
}));

/* Get books listing */
router.get('/books', asyncHandler(async(req, res)=> {
    //shows the full list of the books 
    res.render('index');
}));

/* Get the new book form */
router.get('/books/new', asyncHandler(async(req, res) => {
    //shows the create new book form
    res.render('form');
}));

/* Post a new book entry */
router.post('/books/new', asyncHandler(async(req, res)=>{
    //posts a new book to the database
    let book;
    try {
        //new instance with create method when there is NO errors
        book = await Book.create(req.body);
    } catch {
       if() {
            //new instance with build method when there is minor errors 
            book = await Book.build(req.body);
            await book.save();
       } else {

       }
    }

}));

/* Get book details form */
router.get('/books/:id', asyncHandler(async(req, res)=>{
    //show book detail form 
    const book = await Book.findByPk();
    res.render('update-book');
}));

/* Post book details updates */
router.post('/books/:id', asyncHandler(async(req, res)=>{
    //updates book info in the database
    
}));

/* Post delete book */
router.post('/books/:id/delete', asyncHandler(async(req, res)=>{
    //Deletes a book. Careful, this can't be undone. It can be helpful to create a new "test" book to test deleting
    res.send('delete-book');
}));