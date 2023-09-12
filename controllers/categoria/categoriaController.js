const express = require("express")
const router = express.Router()
const slugify = require("slugify")
const Categoria = require("./Categoria")

router.get("/admin/categorias",(req,res)=>{
    res.render("admin/categorias/index")
})

router.get("/admin/categorias/nova",(req,res)=>{
    res.render("admin/categorias/new")
})

router.post("/admin/categorias/salvar",(req,res)=>{
    let titulo = req.body.titulo
    
    Categoria.create({
        titulo:titulo,
        slug:slugify(titulo)
    }).then(()=>{
        res.redirect("/admin/categorias")
    })
})

module.exports = router