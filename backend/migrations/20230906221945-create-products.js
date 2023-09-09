module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('products', {
            code: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            cost_price: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            sales_price: {
                type: Sequelize.FLOAT,
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
        return queryInterface.dropTable('products');
    }
};
