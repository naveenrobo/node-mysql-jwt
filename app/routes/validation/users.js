const Joi = require('joi');

module.exports = {
  // POST /api/tasks
  login: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    }
  },

  // GET-PUT-DELETE /api/tasks/:taskId
  signup: {
    params: {
      email: Joi.string().email().required(),
    }
  },
};