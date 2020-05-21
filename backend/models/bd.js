const sequelize = require('sequelize')

const seq = new sequelize('techtin', 'root', 'Info@3304' , {
    host: 'localhost',
    dialect: 'mysql'

})

seq.authenticate().then(() => {
   console.log('Sucesso')

}).catch(() => {
 console.log('deu erro')
})

module.exports = {
   
    sequelize: sequelize,
    seq: seq,
}