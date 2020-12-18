const models = require('../../models');

module.exports = {
    obterTodos: async () => {
        return await models.Beneficiario.find({});
    }
}