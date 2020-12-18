const restify = require('restify-clients');
const assert  = require('assert');

require('../../src');

const client = restify.createJSONClient({
  version: '*',
  url: 'http://localhost:8081'
});

describe('service: beneficiario', function() {
  let createdId = 0;

  it('deve obter resposta 200', function(done) {
    client.get('/beneficiarios', function(err, req, res, data) {
      assert.ifError(err);
      assert.ok(res.statusCode);
      assert(data != null);

      done();
    })
  });
  
  it('deve criar um beneficiario', function(done) {
    client.post('/beneficiarios', {
        nome: 'felipe',
        cpf: '00011122244',
        rg: '12345',
        dataNasc: '1910-01-01',
        plano: 'BASIC',
        dependentes: 1
    }, function(err, req, res, data) {
      assert.ifError(err);
      assert.ok(res.statusCode);
      assert(data.id != null);

      createdId = data.id;
    });

    done();
  });
  
  it('deve nao criar um beneficiario com plano diferente', function(done) {
    client.post('/beneficiarios', {
        nome: 'felipe',
        cpf: '00011122244',
        rg: '12345',
        dataNasc: '1910-01-01',
        plano: 'TESTE',
    }, function(err, req, res, data) {
      assert(res.statusCode === 400);
      assert(data.id == null);
    });

    done();
  });
  
  it('deve nao criar um beneficiario com nome vazio', function(done) {
    client.post('/beneficiarios', {
        nome: '',
        cpf: '00011122244',
        rg: '12345',
        dataNasc: '1910-01-01',
        plano: 'TESTE',
    }, function(err, req, res, data) {
      assert(res.statusCode === 400);
      assert(data.id == null);
    });

    done();
  });
  
  it('deve nao criar um beneficiario com cpf invalido', function(done) {
    client.post('/beneficiarios', {
        nome: 'felipe',
        cpf: '000111222',
        rg: '12345',
        dataNasc: '1910-01-01',
        plano: 'TESTE',
    }, function(err, req, res, data) {
      assert(res.statusCode === 400);
      assert(data.id == null);
    });

    done();
  });
  
  it('deve nao criar um beneficiario com rg vazio', function(done) {
    client.post('/beneficiarios', {
        nome: 'felipe',
        cpf: '000111222',
        rg: '',
        dataNasc: '1910-01-01',
        plano: 'TESTE',
    }, function(err, req, res, data) {
      assert(res.statusCode === 400);
      assert(data.id == null);
    });

    done();
  });
  
  it('deve nao criar um beneficiario com data de nascimento vazio', function(done) {
    client.post('/beneficiarios', {
        nome: 'felipe',
        cpf: '000111222',
        rg: '',
        dataNasc: '',
        plano: 'TESTE',
    }, function(err, req, res, data) {
      assert(res.statusCode === 400);
      assert(data.id == null);
    });

    done();
  });

  it('deve obter detalhe do beneficiario', function(done) {
    client.get(`/beneficiarios/${createdId}`, function(err, req, res, data) {
      assert.ifError(err);
      assert.ok(res.statusCode);
      assert(data != null);
      assert(data.nome === 'felipe');
      assert(data.cpf === '00011122244');
      assert(data.rg === '12345');
      assert(data.dataNasc === '1910-01-01T00:00:00.000Z');
      assert(data.plano === 'BASIC');
      assert(data.dependentes === 1);
      assert(data.createdAt === data.updatedAt);
    });

    done();
  });

  it('deve atualizar beneficiario', function(done) {
    client.put(`/beneficiarios/${createdId}`, {nome: 'jose'}, function(err, req, res, data) {
      assert.ifError(err);
      assert.ok(res.statusCode);
      assert(data !== null);
    });

    done();
  });

  it('deve obter detalhe do beneficiario atualizado', function(done) {
    client.get(`/beneficiarios/${createdId}`, function(err, req, res, data) {
      assert.ifError(err);
      assert.ok(res.statusCode);
      assert(data != null);
      assert(data.nome === 'jose');
      assert(data.cpf === '00011122244');
      assert(data.rg === '12345');
      assert(data.dataNasc === '1910-01-01T00:00:00.000Z');
      assert(data.plano === 'BASIC');
      assert(data.createdAt !== data.updatedAt);
    });

    done();
  });

  it('deve apagar beneficiario', function(done) {
    client.del(`/beneficiarios/${createdId}`, function(err, req, res) {
      assert.ifError(err);
      assert.ok(res.statusCode);
    });

    done();
  });

  it('deve nao encontrar o beneficiario', function(done) {
    client.get(`/beneficiarios/${createdId}`, function(err, req, res) {
      assert(res.statusCode === 404);
    });

    done();
  });

  after(function() {
    process.exit(0);
  });
});