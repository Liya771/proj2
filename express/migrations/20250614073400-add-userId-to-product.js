// In the generated file under /migrations/
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'userId');
  },
};
