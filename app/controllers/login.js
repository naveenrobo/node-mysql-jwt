const tokenHelper = require('../utils/tokenHelper');
const services = require('../services/loginService');
const bcrypter = require('../utils/bcrypter');

module.exports = {
    login: async (req, res) => {

        const userData = await services.login(req.mysqlConn, req.body.email);

        if (userData.length === 0) {
            return res.json({
                status: false,
                message: "email doesn't exist in database"
            });
        }
        const isValidPassword = await bcrypter.checkPassword(req.body.password, userData[0].password);
        if (!isValidPassword) {
            return res.json({
                status: false,
                message: 'Check credentials'
            });
        }
        console.log(userData[0]);

        const token = await tokenHelper.createToken({
            id: userData[0].id,
            email: userData[0].email,
            reset : userData[0].reset,
            name:userData[0].firstname
        });

        return res.json({
            status: true,
            message: "success",
            token
        });
    },
    signUp: async (req, res) => {
        const userData = await services.login(req.mysqlConn, req.body.email);
        if (userData.length !== 0) return res.json({
            status: false,
            message: 'email already registered'
        });

        const hasPassword = await bcrypter.encryptPassword(req.body.password);
        const data = {
            email: req.body.email,
            password: hasPassword,
        };

        const signUp = await services.signUp(req.mysqlConn, data);
        res.json({
            status: true,
            message: "User added!!"
        });
    },
    changePassword: async (req, res) => {
        const userData = await services.login(req.mysqlConn, req.body.email);

        if (userData.length === 0) {
            return res.json({
                status: false,
                message: "Are you sure that you have an account?"
            });
        }
        const isValidPassword = await bcrypter.checkPassword(req.body.password, userData[0].password);
        if (!isValidPassword) {
            return res.json({
                status: false,
                message: 'Invalid login credentials'
            });
        }
        const hasPassword = await bcrypter.encryptPassword(req.body.newpassword);
        const data = {
            email: req.body.email,
            password: hasPassword,
            reset:false
        };

        await services.resetPassword(req.mysqlConn, data);

        res.json({
            status: true,
            message: "Password Updated"
        });
        
    },
    resetPassword : async(req,res) => {
        const userData = await services.login(req.mysqlConn, req.body.email);

        if (userData.length === 0) {
            return res.json({
                status: true,
                message: "We have reset your password.Please check your email"
            });
        }
        let randomstring = Math.random().toString(36).slice(-8);
        const npassword = await bcrypter.encryptPassword(randomstring);
        console.log(randomstring)
        const data = {
            email: req.body.email,
            password: npassword,
            reset : true
        };

        const signUp = await services.changePassword(req.mysqlConn, data);
        res.json({
            status: true,
            message: "We have reset your password.Please check your email"
        });
    }
};