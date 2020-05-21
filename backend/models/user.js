const bd = require('./bd')

const bcrypt = require('bcryptjs')


let auth = bd.seq.define('aut', {
    nome: {
        allowNull: false,
        type: bd.sequelize.STRING,
        
    
    },

email: {
unique: true,
allowNull: false,
type: bd.sequelize.STRING,


},
password: {
type: bd.sequelize.STRING,
allowNull: false

},
password2: {
    type: bd.sequelize.STRING,
    allowNull: false
    
},
passwordResetToken: {
    type: bd.sequelize.STRING,
   
    
},
passwordResetExpire: {
    type: bd.sequelize.DATE,
   
},
createdAt: {
    type: bd.sequelize.DATE,
    
  
},
updateAt: {
    type: bd.sequelize.DATE,
}

    })
    auth.beforeCreate((user, options) => {

        return bcrypt.hash(user.password, 10)
            .then(hash => {
                user.password = hash;
            })
            .catch(err => { 
                throw new Error(); 
            });
    });

    auth.beforeCreate((user, options) => {

        return bcrypt.hash(user.password2, 10)
            .then(hash => {
                user.password2 = hash;
            })
            .catch(err => { 
                throw new Error(); 
            });
    });




   
 // auth.sync({force: true})

    module.exports = auth