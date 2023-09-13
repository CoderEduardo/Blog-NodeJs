const express = require("express")
const app = express()
const PORTA = 8080
const bodyParser = require("body-parser")
const connection = require("./database/database")
connection.authenticate().then(() => { console.log("Banco de dados conectado com sucesso") }).catch(erro => { console.log(`Ocorreu um erro: ${erro}`) })
const Categoria = require("./controllers/categoria/Categoria")
const Artigo = require("./controllers/artigo/Artigo")
const categoriaController = require("./controllers/categoria/categoriaController")
const artigoController = require("./controllers/artigo/artigoController")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static("public"))
app.set("view engine", 'ejs')

app.get("/", (req, res) => {
    Artigo.findAll({limit:4,order:[['id',"DESC"]]}).then(artigos=>{
        Categoria.findAll().then(categorias=>{
            res.render("index", { artigos: artigos, categorias: categorias })
        })
    })
})

app.get("/:slug", (req, res) => {
    let slug = req.params.slug
    Categoria.findAll().then(categorias => {
        Artigo.findOne({
            where: { slug: slug }
        }).then(artigo => {
            if (artigo != undefined) {
                res.render("article", { artigo: artigo, categorias: categorias })
            } else {
                res.redirect("/")
            }
        })
    })
})

app.get("/categorias/:slug", (req, res) => {
    let slug = req.params.slug

    Categoria.findOne({
        where: { slug: slug },
        include: [{ model: Artigo }]
    }).then(categoria => {
        Categoria.findAll().then(categorias => {
            res.render("index", { artigos: categoria.artigos, categorias: categorias })
        })
    })

})

app.use("/", categoriaController)
app.use("/", artigoController)

app.listen(PORTA, () => {
    console.log(`Servidor Rodando na porta ${PORTA}`)
})