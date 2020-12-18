const mongoose = require("mongoose");

const BeneficiarioSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    nome: {
      type: String,
      required: true
    },
    cpf: {
      type: String,
      required: true
    },
    rg: {
      type: String,
      required: true
    },
    dataNasc: {
      type: Date,
      required: true
    },
    plano: {
        type: String,
        enum: ['BASIC', 'STANDART', 'PREMIUM'],
        required: true
    },
    dependentes: {
        type: Number,
        default: 0
    }
  }
);

module.exports = mongoose.model("Beneficiario", BeneficiarioSchema);