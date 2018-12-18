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
            email: userData[0].email
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
            password: hasPassword
        };

        const signUp = await services.signUp(req.mysqlConn, data);
        res.json({
            status: true,
            message: "User added!!"
        });
    },
};