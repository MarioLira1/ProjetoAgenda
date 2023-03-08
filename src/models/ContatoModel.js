const mongoose = require('mongoose');
const validator = require('validator')


    // Padronizando os campos do formulario 2
const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: ''  },
  telefone: { type: String, required: false, default: ''  },
  obs: { type: String, required: false, default:'' },
  criadoEM: {type: Date, default: Date.now},
});





const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body) {
  this.body = body;
  this.errors = [];
  this.contato = null;
}

Contato.prototype.register = async function() {
  this.valida();
  if(this.errors.length > 0) return;
  this.contato = await ContatoModel.create(this.body);
};

Contato.prototype.valida = function() {
  this.cleanUp();

  // Validação
  // O e-mail precisa ser válido
  if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
  if(!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
  if(!this.body.email && !this.body.telefone) {
    this.errors.push('Pelo menos um contato precisa ser enviado: e-mail ou telefone.');
  }
};

Contato.prototype.cleanUp = function() {
  for(const key in this.body) {
    if(typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  this.body = {
    nome: this.body.nome,
    sobrenome: this.body.sobrenome,
    email: this.body.email,
    telefone: this.body.telefone,
    obs:this.body.obs,
  };
}

Contato.prototype.edit = async function(id){
  if(typeof id !== 'string') return;
  this.valida();
  if(this.errors.length>0) return;
  this.contato = await ContatoModel.findByIdAndUpdate(id.trim(), this.body, { new: true });
}


// Métodos estáticos
Contato.buscaPorId = async function(id){
  if(typeof id !== 'string') return;
  const contato = await ContatoModel.findById(id)
  return contato
};

// Métodos estáticos
Contato.buscaContatos = async function(){
  const contatos = await ContatoModel.find()
  .sort({criadoEM: -1})
  return contatos
};



// Métodos estáticos
Contato.DeletContatos = async function(id){
  if(typeof id !== 'string') return
  const contatos = await ContatoModel.findOneAndDelete({_id: id})
  return contatos
};

module.exports = Contato;
