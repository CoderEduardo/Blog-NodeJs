const express = require("express")
const app = express()
const PORTA = 8080
const bodyParser = require("body-parser")
const connection = require("./database/database")
connection.authenticate().then(()=>{console.log("Banco de dados conectado com sucesso")}).catch(erro=>{console.log(`Ocorreu um erro: ${erro}`)})
const Categoria = require("./controllers/categoria/Categoria")
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static("public"))
app.set("view engine",'ejs')

app.get("/",(req,res)=>{
    res.send("Página principal")
})

app.listen(PORTA,()=>{
    console.log(`Servidor Rodando na porta ${PORTA}`)
})