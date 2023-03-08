//IMPORTANTO CSS
// importando bootstrap
import 'bootstrap';
//incorporando o bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//importando meu style personalizado
import './assets/css/style.css';
//PARA BROWSERS ANTIGOS => importanto core e regenerator para aplicações que precisem rodar em navegadores antigos
import 'core-js/stable';
import 'regenerator-runtime/runtime';



import Login from './modules/Login';

const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');

login.init();
cadastro.init();