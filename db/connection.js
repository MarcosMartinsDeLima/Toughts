const {Sequelize} = require('sequelize')
require('dotenv').config()
const dbname = process.env.DB_NAME
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const sequelize = new Sequelize(dbname,user,password,{
    dialect:'mysql',
    host:'localhost'
})

try{
    sequelize.authenticate()
    console.log("conectado ao mysql")
}catch{
    console.log("erro ocorrido")
}

module.exports = sequelize