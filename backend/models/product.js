module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        code: { 
            type: DataTypes.BIGINT, 
            primaryKey: true 
        },
        name: DataTypes.STRING,
        cost_price: DataTypes.FLOAT,
        sales_price: DataTypes.FLOAT,
        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    Product.associate = (models) => {
        // Um produto pode estar em muitos pacotes
        Product.belongsToMany(models.Product, {
            through: models.Pack,
            foreignKey: 'product_id',
            otherKey: 'pack_id',
            as: 'Packs'
        });

        // Um produto pode ter muitos produtos componentes
        Product.belongsToMany(models.Product, {
            through: models.Pack,
            foreignKey: 'pack_id',
            otherKey: 'product_id',
            as: 'Components'
        });
    };

    return Product;
};
