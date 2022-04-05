const express = require('express')
const { getAllProduct,createProduct,updateProduct,deleteProduct,getOneProduct } = require('../Controller/productController')
const router = express.Router()


router.get('/product',getAllProduct)
router.post('/product/new',createProduct)
router.put('/product/update/:id',updateProduct)
router.delete('/product/deleteProduct/:id',deleteProduct)
router.get('/product/getOneProduct/:id',getOneProduct)



module.exports = router