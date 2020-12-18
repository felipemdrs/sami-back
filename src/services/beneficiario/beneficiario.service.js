const models = require('../../models');

module.exports = {
  obterTodos: async () => {
    return await models.Beneficiario.find({});
  },

  obter: async (id) => {
    return await models.Beneficiario.findById(id);
  },

  criar: async (beneficiario) => {
    let object = new models.Beneficiario({
      nome: beneficiario.nome,
      cpf: beneficiario.cpf,
      rg: beneficiario.rg,
      dataNasc: beneficiario.dataNasc,
      plano: beneficiario.plano,
      dependentes: beneficiario.dependentes
    });

    return await object.save();
  },

  atualizar: async (id, beneficiario) => {
    beneficiario.id = null;

    return await models.Beneficiario.findOneAndUpdate({_id: id}, beneficiario, {runValidators: true});
  },

  remover: async (id) => {
    return await models.Beneficiario.findByIdAndRemove(id);
  }
}