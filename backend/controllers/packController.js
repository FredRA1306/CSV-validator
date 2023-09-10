const { Product, Pack } = require('../models');

const packController = {

    // Criar uma nova associação Produto-Pacote
    async create(req, res) {
        try {
            const { pack_id, product_id, qty } = req.body;

            // Verifique se o pacote e o produto existem
            const pack = await Product.findByPk(pack_id);
            const product = await Product.findByPk(product_id);

            if (!pack || !product) {
                return res.status(404).send("Pack or Product not found.");
            }

            const newPackAssociation = await Pack.create({
                pack_id,
                product_id,
                qty
            });

            return res.status(201).json(newPackAssociation);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    },

    // Listar todos os produtos em um pacote específico
    async listByPack(req, res) {
        try {
            const { pack_id } = req.params;

            const pack = await Product.findByPk(pack_id, {
                include: {
                    model: Product,
                    as: 'Components',
                    through: { attributes: ['qty'] }
                }
            });

            if (!pack) {
                return res.status(404).send("Pack not found.");
            }

            return res.status(200).json(pack);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    },

    // Método para validar os preços dos pacotes
    async validatePacks(req, res) {
        try {
            const packs = await Product.findAll({
                where: { isPack: true }, 
                include: {
                    model: Product,
                    as: 'Components',
                    through: { attributes: ['qty'] }
                }
            });

            let errors = [];

            for (let pack of packs) {
                let componentTotalPrice = 0;
                for (let component of pack.Components) {
                    componentTotalPrice += component.new_price * component.Pack.qty;
                }

                if (componentTotalPrice !== pack.new_price) {
                    errors.push(`Price mismatch for pack: ${pack.name}. Expected ${componentTotalPrice} but found ${pack.new_price}`);
                }
            }

            if (errors.length) {
                res.status(400).json({ success: false, errors });
            } else {
                res.status(200).json({ success: true, message: 'All pack prices are valid!' });
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
};

module.exports = packController;
