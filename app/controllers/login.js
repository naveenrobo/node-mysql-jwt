const tokenHelper = require('../utils/tokenHelper');
const services = require('../services/loginService');
const bcrypter = require('../utils/bcrypter');

module.exports = {
    login: async (req, res) => {

        const userData = await services.login(req.mysqlConn, req.body.username);

        if (userData.length === 0) res.json({
            status: false,
            message:"user doesn't exist"
        });
        const isValidPassword = await bcrypter.checkPassword(req.body.password, userData[0].password);
        if (!isValidPassword) return res.json({
            status: false,
            message: 'check creds'
        });

        const token = await tokenHelper.createToken({ ...userData[0],
            password: 'haha'
        });
        
        res.json({
            status: true,
            token
        });
    },
    signUp: async (req, res) => {
        
        const userData = await services.login(req.mysqlConn, req.body.email);
        if (userData.length !== 0) return res.json({
            status: false,
            message: 'user already exists'
        });

        const hasPassword = await bcrypter.encryptPassword(req.body.password);
        const data = {
            email: req.body.email,
            password: hasPassword
        };

        const signUp = await services.signUp(req.mysqlConn, data);
        res.json({
            status: true,
            message : "User added!!"
        });
    },
};