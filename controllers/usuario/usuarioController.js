const express = require("express")
const router = express.Router()
const Usuario = require("./Usuario")
const bcryptjs = require("bcryptjs")

router.get("/admin/usuarios", (req, res) => {
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

module.exports = router