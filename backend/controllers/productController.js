const Papa = require('papaparse');
const fs = require('fs');
const { Product } = require('../models');

const validationState = {
    status: 'pending', // 'pending', 'validating', 'completed'
    errors: []
};

exports.uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'Por favor, faça upload de um arquivo.' });
    }

    const filePath = req.file.path;
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Armazene o conteúdo para validação futura.
    validationState.fileContent = fileContent;

    res.status(200).send({ message: 'Arquivo carregado com sucesso! Aguarde a validação.' });
};


exports.validateFile = async (req, res) => {
    const fileContent = validationState.fileContent;

    if (!fileContent) {
        return res.status(400).send({ message: 'Nenhum arquivo carregado para validação.' });
    }

    Papa.parse(fileContent, {
        header: true,
        complete: async (result) => {
            validationState.status = 'validating';
            validationState.errors = [];
            const validatedProducts = [];

            for (let product of result.data) {
                if (product.cost_price && product.cost_price > product.sales_price) {
                    validationState.errors.push(`Erro no produto ${product.name}: O preço de custo não pode ser maior que o preço de venda.`);
                }

                if (!product.code || !product.new_price || !product.name) {
                    validationState.errors.push(`Erro no produto ${product.name}: Campos necessários ausentes.`);
                }

                // Validação de reajuste de 10%
                const existingProduct = await Product.findOne({ where: { code: product.code } });
                if (existingProduct) {
                    const currentPrice = existingProduct.sales_price;
                    if (product.new_price < 0.9 * currentPrice || product.new_price > 1.1 * currentPrice) {
                        validationState.errors.push(`Erro no produto ${product.name}: Reajuste de preço fora do limite permitido.`);
                    }
                    product.current_price = currentPrice;
                } else {
                    validationState.errors.push(`Erro no produto ${product.name}: Produto não existe no banco de dados.`);
                }

                // Adicione o produto à lista validada, mesmo se tiver erros.
                validatedProducts.push(product);
            }

            if (validationState.errors.length === 0) {
                validationState.status = 'completed';
                return res.status(200).send({
                    message: 'Validação bem-sucedida, nenhum erro encontrado.',
                    products: validatedProducts
                });
            } else {
                return res.status(400).send({
                    status: 'completed',
                    message: 'Erros encontrados na validação.',
                    errors: validationState.errors,
                    products: validatedProducts
                });
            }
        }
    });
};



exports.updateProducts = async (req, res) => {
    try {
        const products = req.body;

        for (let product of products) {
            console.log(`Iniciando a atualização/criação do produto com nome: ${product.name}`);
            
            const existingProduct = await Product.findOne({ where: { name: product.name } });

            if (existingProduct) {
                await existingProduct.update({
                    cost_price: product.cost_price,
                    sales_price: product.sales_price
                });
                console.log(`Produto com nome: ${product.name} atualizado com sucesso`);
            } else {
                await Product.create(product);
                console.log(`Produto com nome: ${product.name} criado com sucesso`);
            }
        }

        res.status(200).send({ message: 'Produtos atualizados com sucesso!' });
    } catch (error) {
        console.error(`Erro ao atualizar/criar produto`, error);
        res.status(500).send({ message: 'Erro ao atualizar produtos.', error: error.message });
    }
};


exports.listAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send({ message: 'Erro ao listar produtos.', error: error.message });
    }
};
