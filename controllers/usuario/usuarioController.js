const express = require("express")
const router = express.Router()
const Usuario = require("./Usuario")
const bcryptjs = require("bcryptjs")
const adminAuth = require("../../middlewares/adminAuth")

router.get("/admin/usuarios", adminAuth, (req, res) => {
    Usuario.findAll().then(usuarios => {
        res.render("admin/usuarios/index", { usuarios: usuarios })
    })
})

router.get("/admin/usuario/novo", (req, res) => {
    res.render("admin/usuarios/create")
})

router.post("/admin/usuario/registrar", (req, res) => {
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

router.get("/admin/usuario/login", (req, res) => {
    res.render("admin/usuarios/login")
})

router.post("/admin/usuario/autenticacao", (req, res) => {
    let email = req.body.email
    let senha = req.body.senha
    Usuario.findOne({
        where: { email: email }
    }).then(usuario => {
        if (usuario != undefined) {
            let correto = bcryptjs.compareSync(senha, usuario.senha) //Aqui onde é feito a verificação da senha

            if (correto) {
                req.session.usuario = {
                    id: usuario.id,
                    email: usuario.email
                }
                res.redirect("/admin/usuarios")
            } else {
                res.redirect("/admin/usuario/login")
            }
        } else {
            res.redirect("/admin/usuario/login")
        }
    }).catch(() => {
        res.redirect("/admin/usuario/login")
    })
})

router.get("/admin/usuario/deletar", adminAuth, (req, res) => {
    Usuario.findOne({
        where: { email: req.session.usuario.email }
    }).then(usuario => {
        res.render("admin/usuarios/deletar", { usuario: usuario })
    })
})

router.post("/admin/usuario/deletar/conta", adminAuth, (req, res) => {
    let id = req.body.id
    let senha = req.body.senha

    Usuario.findByPk(id).then(usuario => {
        if (usuario != undefined) {
            let correto = bcryptjs.compareSync(senha, usuario.senha)
            if (correto) {
                Usuario.destroy({
                    where: { id: id }
                }).then(() => {
                    res.redirect("/admin/usuarios")
                }).catch(() => {
                    res.redirect("/admin/usuarios")
                })
            } else {
                res.redirect("/admin/usuarios")
            }
        } else {
            res.redirect("/admin/usuarios")
        }
    })
})

router.get("/admin/usuario/atualizar", (req, res) => {
    Usuario.findOne({
        where: { email: req.session.usuario.email }
    }).then(usuario => {
        res.render("admin/usuarios/atualizar", { usuario: usuario })
    })
})

router.get("/admin/usuario/atualizar/senha_", (req, res) => {
    Usuario.findOne({
        where: { email: req.session.usuario.email }
    }).then(usuario => {
        res.render("admin/usuarios/atualizarSenha", { usuario: usuario })
    })
})

router.post("/admin/usuario/atualizar/senha", (req, res) => {
    let senha1 = req.body.senha1
    let senha2 = req.body.senha2
    let id = req.body.id
    let senhaFinal = ""

    if (senha1 == senha2) {
        Usuario.findByPk(id).then(usuario => {
            let senha = req.body.senha
            let correto = bcryptjs.compareSync(senha, usuario.senha)
            if (correto) {
                senhaFinal = senha1
                let salt = bcryptjs.genSaltSync(10)
                let hash = bcryptjs.hashSync(senhaFinal, salt)
                Usuario.update({
                    senha: hash
                }, { where: { id: id } }).then(() => {
                    res.redirect("/admin/usuarios")
                })
            } else {
                res.redirect("/admin/usuario/atualizar/senha_")
            }
        }).catch(() => {
            res.redirect("/admin/usuarios")
        })
    } else {
        res.redirect("/admin/usuarios")
    }
})

router.get("/admin/usuario/atualizar/email_", (req, res) => {
    Usuario.findOne({
        where: { email: req.session.usuario.email }
    }).then(usuario => {
        res.render("admin/usuarios/atualizarEmail", { usuario: usuario })
    })
})

router.post("/admin/usuario/atualizar/email", (req, res) => {
    let id = req.body.id
    Usuario.findByPk(id).then(usuario => {
        if (usuario != undefined) {
            let senha = req.body.senha
            let correto = bcryptjs.compareSync(senha,usuario.senha)
            if(correto){
                let email = req.body.email
                Usuario.update({
                    email:email
                },{
                    where:{id:id}
                }).then(()=>{
                    res.redirect("/admin/usuarios")
                }).catch(()=>{
                    res.redirect("/admin/usuarios")
                })
            }else{
                res.redirect("/admin/usuarios")
            }
        }else{
            res.redirect("/admin/usuarios")
        }
    }).catch(()=>{
        res.redirect("/admin/usuarios")
    })



})

module.exports = router