/* this file helps to connect mysql database */

const mysql = require('mysql');
const responseHandler = require('../utils/responseHandler');
const config = require('../utils/config');

let pool;


const passConneciton = (req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) {
      responseHandler.nahResoonse(res, err, 101, req);
    } else {
      req.mysqlConn = connection;
      next();
      res.on('finish', () => {
        connection.release();
      });
    }
  });
};


module.exports = {
  getConnection: async (req, res, next) => {
    if (pool) {
      passConneciton(req, res, next);
    } else {
      pool = mysql.createPool(config.mysql);
      passConneciton(req, res, next);
    }
  },
};

