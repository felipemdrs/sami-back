const mongoose = require("mongoose");

const BeneficiarioSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true
    },
    cpf: {
      type: String,
      length: 11,
      trim: true,
      maxlength: 11,
      minlength: 11,
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
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Beneficiario", BeneficiarioSchema);