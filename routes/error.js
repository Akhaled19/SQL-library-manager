const express = require('express');
const router = express.Router();
const createError = require('http-errors');
 
 /* Error Handler Middleware */
router.use('*', (req, res, next) => {
    next(createError(404, 'This page dose not exist'));
});

router.use( (err, req, res, next) => {
    //set the message to err.message
    res.locals.message = err.message;
    //set the status to err.status or 500
    res.locals.status = err.status || 500;
    //set the stack to err.stack
    res.locals.stack = err.stack;
    //set the response status to the err.status or 500
    res.status(err.status || 500);
    //log the error details in the console 
    console.error(`Something went wrong!
        status: ${err.status}.
        Message: ${err.message}.
        Stack: ${err.stack}.`
    );
    //render the error page
    if(err.status === 500) {
        res.render('error')
    }else {
        res.render('page-not-found')
    }
});

module.exports = router;