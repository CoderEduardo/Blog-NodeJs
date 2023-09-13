const express = require("express")
const router = express.Router()
const Categoria = require("../categoria/Categoria")
const Artigo = require("./Artigo")
const slugify = require("slugify")
const adminAuth = require("../../middlewares/adminAuth")

router.get("/admin/artigos",adminAuth, (req, res) => {
    Artigo.findAll({
        include: [{ model: Categoria }]
    }).then(artigos => {
        res.render("admin/artigos/index", { artigos: artigos })
    })
})

router.get("/admin/artigos/novo",adminAuth, (req, res) => {
    Categoria.findAll().then(categorias => {
        res.render("admin/artigos/new", {
            categorias: categorias
        })
    })
})

router.post("/admin/artigos/salvar",adminAuth, (req, res) => {
    let titulo = req.body.titulo
    let conteudo = req.body.conteudo
    let categoria = req.body.categoria

    Artigo.create({
        titulo: titulo,
        slug: slugify(titulo),
        conteudo: conteudo,
        categoriaId: categoria
    }).then(() => {
        res.redirect("/admin/artigos")
    })
})

router.post("/admin/artigos/deletar",adminAuth, (req, res) => {
    let id = req.body.id
    Artigo.destroy({
        where: { id: id }
    }).then(() => {
        res.redirect("/admin/artigos")
    })
})

router.get("/admin/artigos/atualizar/:id",adminAuth, (req, res) => {
    let id = req.params.id

    Artigo.findByPk(id).then(artigo => {
        Categoria.findAll().then(categorias => {
            res.render("admin/artigos/edit", { artigo: artigo, categorias: categorias })
        })
    })
})

router.post("/admin/artigos/atualizar",adminAuth, (req, res) => {
    let titulo = req.body.titulo
    let conteudo = req.body.conteudo
    let categoria = req.body.categoria
    let id = req.body.id

    Artigo.update({
        titulo: titulo,
        slug: slugify(titulo),
        conteudo: conteudo,
        categoriaId: categoria
    }, {
        where: { id: id }
    }).then(() => {
        res.redirect("/admin/artigos")
    })
})

router.get("/artigos/page/:num",adminAuth, (req, res) => {
    let page = req.params.num
    let offset = 0

    if (isNaN(page) || page == 1) {
        offset = 0
    } else {
        offset = (parseInt(page) - 1) * 4
    }

    Artigo.findAndCountAll({
        limit: 4,
        offset: offset,
        order: [['id', 'DESC']]
    }).then(artigos => {

        let next = false
        if (offset + 4 >= artigos.count) {
            next = false
        } else {
            next = true
        }

        let resultado = {
            next: next,
            page: parseInt(page),
            artigos: artigos
        } 

        Categoria.findAll().then(categorias => {
            res.render("admin/artigos/page", { resultado: resultado, categorias: categorias })
        })

    })
})

module.exports = router