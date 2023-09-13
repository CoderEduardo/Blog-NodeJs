const express = require("express")
const router = express.Router()
const Usuario = require("./Usuario")
const bcryptjs = require("bcryptjs")
const adminAuth = require("../../middlewares/adminAuth")

router.get("/admin/usuarios", adminAuth,(req, res) => {
    Usuario.findAll().then(usuarios => {
        res.render("admin/usuarios/index", { usuarios: usuarios })
    })
})

router.get("/admin/usuario/novo",adminAuth, (req, res) => {
    res.render("admin/usuarios/create")
})

router.post("/admin/usuario/registrar",adminAuth, (req, res) => {
    let email = req.body.email
    Usuario.findOne({
        where: { email: email }
    }).then(usuario => {
        if (usuario == undefined) {
            let senha = req.body.senha
            let salt = bcryptjs.genSaltSync(10)
            let hash = bcryptjs.hashSync(senha, salt)

            Usuario.create({
                email: email,
                senha: hash
            }).then(() => {
                res.redirect("/admin/usuarios")
            })
        } else {
            res.redirect("/admin/usuarios")
        }
    })
})

router.get("/admin/usuario/login",(req,res)=>{
    res.render("admin/usuarios/login")
})

router.post("/admin/usuario/autenticacao",(req,res)=>{
    let email = req.body.email
    let senha = req.body.senha
    Usuario.findOne({
        where:{email:email}
    }).then(usuario=>{
        if(usuario!=undefined){
            let correto = bcryptjs.compareSync(senha,usuario.senha) //Aqui onde é feito a verificação da senha

            if(correto){
                req.session.usuario={
                    id:usuario.id,
                    email:usuario.email
                }
                res.redirect("/admin/usuarios")
            }
        }else{
            res.redirect("/admin/usuario/login")
        }
    }).catch(()=>{
        res.redirect("/admin/usuario/login")
    })
})

module.exports = router