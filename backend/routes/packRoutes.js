const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const packController = require('../controllers/packController');

// Validações para a criação de uma nova associação Produto-Pacote
const productPackValidations = [
    body('pack_id').isInt().withMessage('pack_id deve ser um número inteiro.'),
    body('product_id').isInt().withMessage('product_id deve ser um número inteiro.'),
    body('qty').isInt().withMessage('qty deve ser um número inteiro.')
];

// Middleware para tratar os erros de validação
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Rota para criar uma nova associação Produto-Pacote
router.post('/create', productPackValidations, handleValidationErrors, packController.create);

// Rota para listar produtos de um pacote específico
router.get('/:pack_id', packController.listByPack);

// Rota para validação de pacotes
router.get('/validate', packController.validatePacks);

module.exports = router;
