const bcrypt = require('bcryptjs');
const config = require('./config');

module.exports = {
    encryptPassword: async (plainPassword) => {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(config.bycryptSalt,(err,salt)=>{
                if(err) return reject(err);
                bcrypt.hash(plainPassword, salt, (err, hash) => {
                    (err ? reject(err) : (resolve(hash)));
                })
            })
        })
    },
    checkPassword: async (plainPassword, hash) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(plainPassword, hash, (err, res) => {
                (err ? reject(err) : resolve(res));
            })
        })
    }
}    
