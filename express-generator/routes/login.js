const express = require('express');
const router = express.Router();

/*usuario de ejemplo*/
const usuarios =[
    { username: 'admin',password: 'password'},
    { username: 'user', password: '1234' }
];
/* GET login page. */
router.get('/', (req, res)=> {
    res.render('login', { title: 'Login' , error: null, user: req.session.user });
});


/* POST login., procesar el login */
router.post('/', (req, res) => {
    const { username, password } = req.body;
    const userValido = usuarios.find(u => u.username === username && u.password === password);
    if (userValido) {
        req.session.user = username; // Guardar el usuario en la sesión
        res.redirect('/restringida');
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