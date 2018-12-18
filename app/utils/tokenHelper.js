 const jwt = require('jsonwebtoken');
 const config = require('./config');

 module.exports = {

     createToken: async (data) => {
         return await jwt.sign(data, config.jsonWebTokenKey, {
             expiresIn: '1h'
         });
     },
     verifyToken: async (token) => {
         return new Promise((resolve, reject) => {
             jwt.verify(token, config.jsonWebTokenKey, (err, decoded) => {
                 (err ? reject(err) : resolve(decoded));
             })
         })
     }
 }