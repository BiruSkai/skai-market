const { validationResult } = require("express-validator")
const { productService } = require("../services")
const { fetchProducts, fetchProductById, createProduct, modifyProduct, removeProduct } = productService


const getAllProducts = async (req, res, next) => {
        const data = await fetchProducts()
        res.status(200).json(data)
        next()
}

const getProductById = async (req, res, next) => {
        const productId = req.params.id

        const data = await fetchProductById(productId)
        res.status(200).json(data)
        next()
}

const postProduct = async (req, res, next) => {
        // Rekect if validation fails
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
                return res.status(422).json({errors: errors()})
        }

        const { title, price, quantity, category, description, img_url, status } = req.body 
        const product = {
                title,
                price,
                quantity, 
                category,
                description,
                img_url,
                status 
        }

        await createProduct(product)
        res.sendStatus(200)
        next()
}

const putProduct = async (req, res, next) => {
        // Rekect if validation fails
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
                return res.status(422).json({errors: errors()})
        }

        const productId = req.params.id
        const { title, price, quantity, category, description, img_url, status } = req.body 
        const product = {
                productId,
                title,
                price,
                quantity, 
                category,
                description,
                img_url,
                status 
        }

        await modifyProduct(product)
        res.sendStatus(200)
        next()
}

const deleteProduct = async (req, res, next) => {
        const productId = req.params.id

        const deleted = await removeProduct(productId)
        res.status(200).json(deleted)
        next()
}


module.exports = {
        getAllProducts,
        getProductById,
        postProduct,
        putProduct,
        deleteProduct 
}