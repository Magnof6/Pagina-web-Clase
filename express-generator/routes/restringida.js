const express = require('express');
const router = express.Router();

/*Middelware para proteger ruta */

function loginRequired(req, res, next) {
    if(!req.session.user){
        return res.redirect('/login');
    }
    next();
}

/* GET protected page. */
router.get('/', loginRequired, (req, res) => {
    res.render('restringida', { title: 'Área Restringida', user: req.session.user });
});

module.exports = router;