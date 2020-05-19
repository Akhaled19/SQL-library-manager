const express = require('express');
const router = express.Router();

 
 /* Error Handler Middleware */
router.all('*', (req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    console.error(`Something went wrong. Status: ${err.status}, Message: ${err.message}, Stack: ${err.stack}`)
    next(err);
});

router.use( (err, req, res, next) => {
    //set locals, only prints detailed error in dev env 
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err: {};
    
    console.log(err.message, err.status);

    //render the error page
    res.status = (err.status || 500);
    if(err.status === 404) {
        res.render('page-not-found');     
    } else {
        res.render('error');
    }
});

module.exports = router;