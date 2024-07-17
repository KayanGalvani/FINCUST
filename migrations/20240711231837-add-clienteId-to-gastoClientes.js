'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('ALTER TABLE "GastoClientes" ALTER COLUMN "clienteId" SET NOT NULL');
  },

  down: async (queryInterface, Sequelize) => {
    // Se precisar de um rollback, você pode adicionar aqui.
    // No entanto, considerando que a alteração para NOT NULL não deve ser revertida,
    // não é necessário adicionar lógica para down neste caso específico.
  }
};
