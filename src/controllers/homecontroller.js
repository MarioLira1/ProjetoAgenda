// A IDEIA AQUI É INJETARMOS COTEUDO NAS VIEWS - NO INDEX.JS

// Para usarmos a função que colocamos aqui a função de link que queremos:
// Criamos chave 'titulo' que esta sendo chamado la no index.js


  // A ideia agora é começar a listagem de contato, vamos importar os contatos agora
  const Contato = require('../models/ContatoModel');
  exports.index = async(req,res) => {
    const contatos = await Contato.buscaContatos();
    res.render('index', {contatos})
  }