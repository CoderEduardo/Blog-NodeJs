const Sequelize = require("sequelize")
const connection = require("../../database/database")
const Categoria = require("../categoria/Categoria")

const Artigo = connection.define("artigos",{
    titulo:{
        type:Sequelize.STRING,
        allowNull:false
    },
    slug:{
        type:Sequelize.STRING,
        allowNull:false
    },
    conteudo:{
        type:Sequelize.TEXT,
        allowNull:false
    }
})

Artigo.belongsTo(Categoria)
Categoria.hasMany(Artigo)
Artigo.sync({force:false})

module.exports = Artigo

