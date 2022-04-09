const express = require('express')
const { getAllProduct, createProduct ,updateProduct ,deleteProduct ,getOneProduct } = require('../Controller/productController')
const { authenticationJWT ,role } = require('../middelware/authenticationJwt')
const router = express.Router()


router.get('/product', authenticationJWT, getAllProduct)
router.post('/product/new', authenticationJWT, role("admin"), createProduct)
router.put('/product/update/:id', authenticationJWT, role("admin"), updateProduct)
router.delete('/product/deleteProduct/:id', authenticationJWT, role("admin"), deleteProduct)
router.get('/product/getOneProduct/:id', getOneProduct)



module.exports = router