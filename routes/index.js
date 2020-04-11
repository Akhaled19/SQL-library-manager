const express = require('express');
const router = express.Router();

/* Render books listing */
router.get('/', (req, res) => {
    //Home route should redirect to the /books route 
    res.redirect('/books/home/1');
});

module.exports = router;