module.exports = (sequelize, DataTypes) => {
    const Pack = sequelize.define('Pack', {
        pack_id: {
            type: DataTypes.BIGINT,
            references: {
                model: 'Products',  
                key: 'code'
            }
        },
        product_id: {
            type: DataTypes.BIGINT,
            references: {
                model: 'Products',
                key: 'code'
            }
        },
        qty: DataTypes.BIGINT,
        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'packs',  
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    Pack.associate = (models) => {
        Pack.belongsTo(models.Product, { foreignKey: 'pack_id', as: 'PackProduct' });
        Pack.belongsTo(models.Product, { foreignKey: 'product_id', as: 'ComponentProduct' });
    };

    return Pack;
};
