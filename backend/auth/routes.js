const express = require('express')

const router = express.Router()

const User = require('../models/user')

const yup = require('yup')

const jwt = require('jsonwebtoken')

const authConfig = require("./auth.json")


function gerarToken(params = {}) {

    return jwt.sign(params,  authConfig.secret, {
        expiresIn: 86400, // inspira em 1 dia
    })

}

router.post('/registrar', async (req,res) => {


    // VALIDAÇÕES

    if(!req.body.nome || typeof req.body.nome == undefined || typeof req.body.nome == null) {
        res.send({error: "Nome é obrigatorio"})
        
    }
    if(!req.body.email || typeof req.body.email == undefined || typeof req.body.email == null) {
    res.send({error: "O email é obrigatorio"})
    }
    if(!req.body.password || typeof req.body.password == undefined || typeof req.body.password == null) {
        res.send({error: "A senha é obrigatoria"})
        // Usar o ALERT ou o CONNECT FLASH com o let erros = {} e o erros.push({texto: hvufyugyugyugy})
    }
    if(!req.body.password2 || typeof req.body.password2 == undefined || typeof req.body.password2 == null) {
        res.send({error: "A senha é obrigatoria"})
    }
    if(req.body.password2 !== req.body.password) {
        res.send({error: 'As senhas não correspondem'})
    }

    if(req.body.nome.length < 3) {
        res.send({error: 'O nome tem que ter pelo menos  3 caracteres'})
    }
    if(req.body.nome.length  > 30) {
        res.send({error: 'O nome tem que ter no maximo 30 caracteres'})
    }
if(req.body.email.length < 6) { // o campo vai ser email
    res.send({error: 'O email tem que ter no minimo 6 caracteres'})
}
if(req.body.password.length < 4) {
    res.send({error: 'A senha tem que ter no minimo 4 caracteres'})
}



const {email} = req.body

    try {

    const schema = yup.object().shape({
        email: yup.string().email().required()
        
    })
    await schema.validate(req.body, {abortEarly: false})

// mongo User.findOne({email})

// VER SE JA TEM UM EMAIL CADASTRADO NO BACO
if(await User.findOne({where: {email: req.body.email}})) {
    return res.send({error: "Esse Email ja está cadastrado no nosso sistema!"})
}

const user = await User.create(req.body)

 User.password = undefined

     return  res.send({user, token: gerarToken({id: user.id})})
   
    }

    catch(err) {
         res.status(400).send({error: "Ocorreu um erro tente novamente!, veja se vc preencheu os campos corretamente"})
         console.log(err)
    }

})

module.exports = router