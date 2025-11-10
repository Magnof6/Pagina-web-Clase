const express = require('express');
const router = express.Router();

/*usuario de ejemplo*/
const usuario = {
    username: 'admin',
    password: 'password'
};
/* GET login page. */
router.get('/', (req, res)=> {
    res.render('login', { title: 'Login' , error: null});
});

/* POST login., procesar el login */
router.post('/', (req, res) => {
    const { username, password } = req.body;

    if (username === usuario.username && password === usuario.password) {
        req.session.user = username; // Guardar el usuario en la sesión
        res.redirect('/protected');
    } else {
        res.render('login', { title: 'Login', error: 'Credenciales incorrectas' });
    }
});

/*logout*/
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

module.exports = router;