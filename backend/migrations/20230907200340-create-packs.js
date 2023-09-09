module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('packs', {
          id: {
              type: Sequelize.BIGINT,
              primaryKey: true,
              autoIncrement: true
          },
          pack_id: {
              type: Sequelize.BIGINT,
              references: {
                  model: 'products',
                  key: 'code'
              },
              allowNull: false
          },
          product_id: {
              type: Sequelize.BIGINT,
              references: {
                  model: 'products',
                  key: 'code'
              },
              allowNull: false
          },
          qty: {
              type: Sequelize.BIGINT,
              allowNull: false
          },
          created_at: {   
              type: Sequelize.DATE,
              allowNull: false,
              defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
          },
          updated_at: {   
              type: Sequelize.DATE,
              allowNull: false,
              defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
          }
      });
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('packs');
  }
};
