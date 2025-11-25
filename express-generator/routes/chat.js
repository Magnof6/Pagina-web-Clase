const express = require('express');
const router = express.Router();

function loginRequired(req, res, next){
    if(!req.session.user){
        return res.redirect('/login');
    }
    next();
}

/* GET chat page. */
router.get('/', loginRequired, (req, res) => {
    res.render('chat', { title: 'Chat en Tiempo Real', user: req.session.user });
});

module.exports = router;