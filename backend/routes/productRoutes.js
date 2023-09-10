const express = require('express');
const router = express.Router();
const multer = require('multer');
const { body, validationResult } = require('express-validator');

const productController = require('../controllers/productController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== "text/csv") {
            return cb(new Error('Somente arquivos CSV são permitidos!'), false);
        }
        cb(null, true);
    }
});

const productUpdateValidations = [
    body('*.code').isInt().withMessage('code deve ser um número inteiro.'),
    body('*.sales_price').isFloat().withMessage('sales_price deve ser um número.'),
    body('*.name').isString().trim().notEmpty().withMessage('name é obrigatório e deve ser uma string.')
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.post('/upload', upload.single('file'), productController.uploadFile);
router.get('/validate', productController.validateFile);
router.get('/', productController.listAllProducts);
router.post('/update', productUpdateValidations, handleValidationErrors, productController.updateProducts);

module.exports = router;
