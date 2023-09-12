const express = require("express")
const router = express.Router()
const Categoria = require("../categoria/Categoria")
const Artigo = require("./Artigo")
const slugify = require("slugify")

router.get("/admin/artigos", (req, res) => {
    Artigo.findAll({
        include: [{ model: Categoria }]
    }).then(artigos => {
        res.render("admin/artigos/index", { artigos: artigos })
    })
})

router.get("/admin/artigos/novo", (req, res) => {
    Categoria.findAll().then(categorias => {
        res.render("admin/artigos/new", {
            categorias: categorias
        })
    })
})

router.post("/admin/artigos/salvar", (req, res) => {
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

router.post("/admin/artigos/deletar", (req, res) => {
    let id = req.body.id
    Artigo.destroy({
        where: { id: id }
    }).then(() => {
        res.redirect("/admin/artigos")
    })
})

router.get("/admin/artigos/atualizar/:id", (req, res) => {
    let id = req.params.id

    Artigo.findByPk(id).then(artigo => {
        Categoria.findAll().then(categorias => {
            res.render("admin/artigos/edit", { artigo: artigo, categorias: categorias })
        })
    })
})

router.post("/admin/artigos/atualizar", (req, res) => {
    let titulo = req.body.titulo
    let conteudo = req.body.conteudo
    let categoria = req.body.categoria
    let id = req.body.id

    Artigo.update({
        titulo:titulo,
        slug:slugify(titulo),
        conteudo:conteudo,
        categoriaId:categoria
    },{
        where:{id:id}
    }).then(()=>{
        res.redirect("/admin/artigos")
    })
})

module.exports = router