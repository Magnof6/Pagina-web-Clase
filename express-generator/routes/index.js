var express = require('express');
var router = express.Router();

/*Datos: lista de elementos*/
const elementos =[
  {id: 1, nombre: 'Elemento 1', img:'images/imagen1.jpg'},
  {id: 2, nombre: 'Elemento 2', img :'images/imagen2.jpg'},
  {id: 3, nombre: 'Elemento 3', img:'images/imagen3.jpg'},
];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Página Inicial', elementos, user: req.session.user });
});

module.exports = router;
