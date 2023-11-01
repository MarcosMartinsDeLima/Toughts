const {DataTypes} = require('sequelize')
const connection = require('../db/connection')

const User = connection.define('User',{
    name:{
        type:DataTypes.STRING,
        require:true
    },
    email:{
        type:DataTypes.STRING,
        require:true
    },
    password:{
        type:DataTypes.STRING,
        require:true
    }
})

module.exports = User