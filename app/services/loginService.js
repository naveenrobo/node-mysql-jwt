
const mysql = require('mysql');
const appService = require('./appService');

module.exports = {
    login : async (connection, email ) =>{
        const query = mysql.format("select * from users where email = ?",[email]);
        return await appService.runQuery(connection,query);
    },
    signUp : async (connection, data) =>{
        const query = mysql.format("insert into users set ? ",[data]);
        return await appService.runQuery(connection,query);
    },
    changePassword : async (connection, data) =>{
        email = data.email;
        password = data.password;
        reset = data.reset;
        const query = mysql.format(`update users set password='${password}' , reset=${reset} where email='${email}'`);
        return await appService.runQuery(connection,query);
    }
}