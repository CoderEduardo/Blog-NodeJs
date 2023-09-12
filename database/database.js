const Sequelize = require("sequelize")
const database = "blog"     //Deve ser o nome do banco de dados criado em sua máquina
const user = "root"         
const password = "bancodedados1234"     //Deve ser a senha do banco de dados usado na sua máquina

const connection = new Sequelize(database,user,password,{
    host:"localhost",
    dialect:"mysql",
    timezone:"-03:00"
})

module.exports = connection