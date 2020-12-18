const status              = require('http-status');
const beneficiarioService = require('./beneficiario.service');

module.exports = (app) => {
  app.get('', async (req, res, next) => {
    var data = await beneficiarioService.obterTodos();
    res.send(data);
    next();
  });

  app.get('/:id', async (req, res, next) => {
    var data = await beneficiarioService.obter(req.params.id);

    if (!data) {
      res.send(status.BAD_REQUEST);
    } else {
      res.send(data);
    }
    
    next();
  });

  app.post('', async (req, res, next) => {
    try 
    {
      var saved = await beneficiarioService.criar(req.body);
      res.send(status.CREATED, { id: saved._id });
    } 
    catch(ex) {
      res.send(status.BAD_REQUEST, ex);
    }

    next();
  });

  app.put('/:id', async (req, res, next) => {
    try {
      await beneficiarioService.atualizar(req.params.id, req.body);
      res.send(status.NO_CONTENT);
    }
    catch(ex) {
      res.send(status.BAD_REQUEST, ex);
    }

    next();
  });

  app.del('/:id', async (req, res, next) => {
    try {
      await beneficiarioService.remover(req.params.id, req.body);
      res.send(status.NO_CONTENT);
    }
    catch(ex) {
      res.send(status.BAD_REQUEST, ex);
    }

    next();
  });
};
