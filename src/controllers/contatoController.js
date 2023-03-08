const { async } = require('regenerator-runtime')
const Contato = require('../models/ContatoModel')

// AQUI ESTAMOS ENVIANDO UM CONTATO VAZIO PARA O NOSSA SESSION SO POIS ELA SEMPRE VAI SOLICITAR
exports.index =(req,res) =>{
  res.render('contato',{
    contato:{}
  })
}
// Controle do register, momentaneamente ela so recebe e manda os dados dos contatos salvos
exports.register =async (req,res) =>{
  try{
    const contato = new Contato(req.body)
    await contato.register()
  
    // Avaliando se temos erros
    if(contato.errors.length>0){
      req.flash('errors',contato.errors);
      req.session.save(()=> res.redirect('back'))
      return;
    }
  
    req.flash('success', 'Contato criado com sucesso.');
    req.session.save(()=> res.redirect(`/contato/index/${contato.contato._id}`))
    return;
  } catch(e){
    console.log(e)

  }

}
// IMPORTANTE DENTRO DO PARAGRAFO E SEMPRE REQ E DEPOIS RES
exports.editIndex = async function (req,res){
  if(!req.params.id) return res.render('404')

  const contato = await Contato.buscaPorId(req.params.id)
  if(!contato) return res.render('404');

  res.render('contato', { contato });
}

exports.edit = async function(req, res){
  try{
    if(!req.params.id) return res.render('404');
    const contato = new Contato(req.body);
    await contato.edit(req.params.id);
  
  
  if(contato.errors.length>0){
    req.flash('errors',contato.errors);
    req.session.save(()=> res.redirect('back'))
    return;
  }
  
  req.flash('success', 'Contato editado com sucesso.');
  req.session.save(()=> res.redirect(`/contato/index/${contato.contato._id}`))
  return;
  } catch(e){
    console.log(e)
  }
  
}

exports.delet = async function(req, res){
  if(!req.params.id) return res.render('404')
  const contato = await Contato.DeletContatos(req.params.id)
  if(!contato) return res.render('404');

  req.flash('success', 'Contato Apagado com sucesso.');
  req.session.save(()=> res.redirect('back'))
  return;
}