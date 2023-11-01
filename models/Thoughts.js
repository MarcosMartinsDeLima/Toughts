const {DataTypes} = require('sequelize')
const connection = require('../db/connection')
const User = require('./User')

const Toughts = connection.define('Toughts',{
    title:{
        type:DataTypes.STRING,
        allowNull:false,
        require:true
    }
})

Toughts.belongsTo(User)
User.hasMany(Toughts)

module.exports = Toughts