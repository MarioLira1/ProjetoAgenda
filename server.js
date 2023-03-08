// CONEXÃO MONGOOSE
// 1º Dotenv: Variaveis de ambientes configuradas no nosso arquivo ".env"
require('dotenv').config();

// 2º Iniciando o express e app
const express = require('express');
const app = express();

// 3º Mongosse: quem modela nossa base de dados, e garante que os dados estão na forma que vamos salvar.
// Ele nos retona uma promisse por isso colocamos o formato abaixo:
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://mariolira:123mudar@cursojs1.ndqnfx0.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    app.emit('pronto');
  })
  .catch(e => console.log(e));
// 4º secções: para identificar o navegador do cliente, salvando o cookie no navegador, isso sera salvo e trara uma confiança no processo
const session = require('express-session');
// 5º MongoStore: Garante que as secções serão salvas na base de dados, pois por padrão ele salva na memoria as requicisões e isso consome memoria muito rapido
//  Assim a gente garante que tudo será salvo no mongo
const MongoStore = require('connect-mongo');
// 6º Flash - mensagens alto destrutivas, mensagem que aparece uma vez e nao aparecerá, ajuda pra criar mensagens de avisos
// as mensagens ficam salvs dentro das seções, elas são dependentes, e nao funcionam caso a seção não esteja preparada
const flash = require('connect-flash');
// 7º Rotas são as rotas das nossas aplicações(pagina inicial, no cadastro no caso, seria vida,cadbase essas telas) como se comunicam
const routes = require('./routes');
// 8º Path trabalha os caminhos dos diretorios
const path = require('path');
// 9º helmet - O Helmet pode ajudar a proteger o seu aplicativo de algumas vulnerabilidades da web bastante conhecidas configurando os cabeçalhos HTTP adequadamente.
// O Helmet é na realidade apenas uma coleção de nove funções de middlewares menores que configuram cabeçalhos HTTP relacionados à segurança:
// const helmet = require('helmet'); // helmet começou a causar problemas no localhost por conta da falta de SSL
// 10º csrf (tokens para formularios) isso faz com que nenhum site externo aplique postagem em nosso site
const csrf = require('csurf');
//  11º middleware - funções executadas em rotas, exemplo cadeias executadas em rotas - exemplo paginas que são abertas apenas para usuarios logados
//  ou seja valida se o cliente esta logado para ele entrar em uma pagina
const { middlewareGlobal, checkCsrfError, csrfMiddleware} = require('./src/middlewares/middleware');

// app.use(helmet())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')));


// 12º Configuração das sesões
const sessionOptions = session({
  secret: 'akasdfj0út23453456+54qt23qv  qwf qwer qwer qewr asdasdasda a6()',
  store: MongoStore.create({ mongoUrl:'mongodb+srv://mariolira:123mudar@cursojs1.ndqnfx0.mongodb.net/?retryWrites=true&w=majority'}),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});
''
app.use(sessionOptions);
app.use(flash());
//  13 ejs view. acima da views o lugar onde esta
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');



app.use(csrf())
// chamando nossos apsss
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware)
app.use(routes);


app.on('pronto', () => {
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });
});

