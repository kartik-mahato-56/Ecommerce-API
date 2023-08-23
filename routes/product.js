const express = require('express');
const productController = require('../controllers/productController')
const { athenticate, authenticateAdmin } = require('../middleware/verifyToken')

const router = express.Router();

router.get('/', productController.products)

//add new product
//[uploadFile, authenticateAdmin]
router.post('/',authenticateAdmin, productController.createProduct)
//update product details
router.put('/:id',authenticateAdmin, productController.updateProduct)



module.exports = router;