const express = require('express');
const route = express.Router();
const loginController = require('./src/controllers/loginController')
const homeController = require('./src/controllers/homeController');
const contatoController = require('./src/controllers/contatoController')


// Realizo e require do midleware:
const { loginRequired } = require('./src/middlewares/middleware')
// Rotas da home

route.get('/', homeController.index);

// Rotas de login
route.get('/login/index', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)

// Rotas de Contato
// E ai colocamos o midleware na pagina onde queremos acesso apenas com o login
route.get('/contato/index', loginRequired, contatoController.index);
// Rota Cadastro de Usuario
route.post('/contato/register', loginRequired, contatoController.register);
// Rota do Id
route.get('/contato/index/:id', loginRequired, contatoController.editIndex);

// route.post('/contato/edit/:id', loginRequired, contatoController.edit);
route.post('/contato/edit/:id', loginRequired, contatoController.edit);

route.get('/contato/delete/:id', loginRequired, contatoController.delet);




module.exports = route;