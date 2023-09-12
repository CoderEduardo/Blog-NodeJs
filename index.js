const express = require("express")
const app = express()
const PORTA = 8080
const bodyParser = require("body-parser")
const connection = require("./database/database")
connection.authenticate().then(()=>{console.log("Banco de dados conectado com sucesso")}).catch(erro=>{console.log(`Ocorreu um erro: ${erro}`)})
const Categoria = require("./controllers/categoria/Categoria")
const Artigo = require("./controllers/artigo/Artigo")
const categoriaController = require("./controllers/categoria/categoriaController")
const artigoController = require("./controllers/artigo/artigoController")
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static("public"))
app.set("view engine",'ejs')

app.get("/",(req,res)=>{
    Artigo.findAll().then(artigos=>{
        res.render("index",{artigos:artigos})
    })
})

app.get("/:slug",(req,res)=>{
    let slug = req.params.slug
    Artigo.findOne({
        where:{slug:slug}
    }).then(artigo =>{
        if(artigo != undefined){
            res.render("article",{artigo:artigo})
        }else{
            res.redirect("/")
        }
    })
})

app.use("/",categoriaController)
app.use("/",artigoController)

app.listen(PORTA,()=>{
    console.log(`Servidor Rodando na porta ${PORTA}`)
})