const beneficiarioService = require('./beneficiario.service');

module.exports = (app) => {
  app.get('', async (req, res, next) => {
    var data = await beneficiarioService.obterTodos();
    res.send(data);
    next();
  });
};
