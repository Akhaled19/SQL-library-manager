const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

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
    res.render();
}));

/* Get books listing */
router.get('/books', asyncHandler(async(req, res)=> {
    //shows the full list of the books 
    res.send();
}));

/* Get the new book form */
router.get('/books/new', asyncHandler(async(req, res) => {
    //shows the create new book form
    res.render();
}));

/* Post a new book entry */
router.post('/books/new', asyncHandler(async(req, res)=>{
    //posts a new book to the database
    res.send();
}));

/* Get book details form */
router.get('/books/:id', asyncHandler(async(req, res)=>{
    //show book detail form 
    res.render();
}));

/* Post book details updates */
router.post('/books/:id', asyncHandler(async(req, res)=>{
    //updates book info in the database
    res.send();
}));

/* Post delete book */
router.post('/books/:id/delete', asyncHandler(async(req, res)=>{
    //Deletes a book. Careful, this can't be undone. It can be helpful to create a new "test" book to test deleting
    res.send();
}));