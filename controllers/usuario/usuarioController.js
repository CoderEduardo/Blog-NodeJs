const express = require("express")
const router = express.Router()
const Usuario = require("./Usuario")
const bcryptjs = require("bcryptjs")

router.get("/admin/usuarios",(req,res)=>{
    Usuario.findAll().then(usuarios=>{
        res.render("admin/usuarios/index",{usuarios:usuarios})
    })
})

router.get("/admin/usuario/novo",(req,res)=>{
    res.render("admin/usuarios/create")
})

router.post("/admin/usuario/registrar",(req,res)=>{
    let email = req.body.email 
    let senha = req.body.senha
    let salt = bcryptjs.genSaltSync(10)
    let hash = bcryptjs.hashSync(senha,salt)

    Usuario.create({
        email:email,
        senha:hash
    })
})

module.exports = router