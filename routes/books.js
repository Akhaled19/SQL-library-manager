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

/* Get books listing */
router.get('/', asyncHandler(async(req, res) => {
    
}))