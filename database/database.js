const Sequelize = require("sequelize")
const database = "blog"
const user = "root"
const password = "bancodedados1234"

const connection = new Sequelize(database,user,password,{
    host:"localhost",
    dialect:"mysql",
    timezone:"-03:00"
})

module.exports = connection