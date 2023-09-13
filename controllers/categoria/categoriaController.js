const express = require("express")
const router = express.Router()
const slugify = require("slugify")
const Categoria = require("./Categoria")
const adminAuth = require("../../middlewares/adminAuth")

router.get("/admin/categorias",adminAuth,(req,res)=>{
    
    Categoria.findAll().then(categorias =>{
        res.render("admin/categorias/index",{
            categorias:categorias
        })
    })
})

router.get("/admin/categorias/nova",adminAuth,(req,res)=>{
    res.render("admin/categorias/new")
})

router.post("/admin/categorias/salvar",adminAuth,(req,res)=>{
    let titulo = req.body.titulo
    
    Categoria.create({
        titulo:titulo,
        slug:slugify(titulo)
    }).then(()=>{
        res.redirect("/admin/categorias")
    })
})

router.post("/admin/categorias/deletar",adminAuth,(req,res)=>{
    let id = req.body.id
    Categoria.destroy({
        where:{id:id}
    }).then(()=>{
        res.redirect("/admin/categorias")
    })
})

router.get("/admin/categorias/atualizar/:id",adminAuth,(req,res)=>{
    let id = req.params.id
    Categoria.findByPk(id).then(categoria=>{
        if(categoria != undefined && !isNaN(id)){
            res.render("admin/categorias/edit",{
                categoria:categoria
            })
        }else{
            res.redirect("/admin/categorias")
        }
    })
})

router.post("/admin/categorias/atualizar",adminAuth,(req,res)=>{
    let id = req.body.id
    let titulo = req.body.titulo
    Categoria.update({titulo:titulo,slug:slugify(titulo)},{
        where:{id:id}
    }).then(()=>{
        res.redirect("/admin/categorias")
    })
})

module.exports = router