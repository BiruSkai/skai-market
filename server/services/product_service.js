import { fetchProductsDb, fetchProductByIdDb, createProductDb, modifyProductDb, removeProductDb } from "../db/products_db"


const fetchProducts = async () => {
        return await fetchProductsDb()
}

const fetchProductById = async (productId) => {
        return await fetchProductByIdDb(productId)
}

const createProduct = async (product) => {
        return await createProductDb(product)
}

const modifyProduct = async (product) => {
        return await modifyProductDb(product)
}

const removeProduct = async (productId) => {
        return await removeProductDb(productId)
}


module.exports = {
        fetchProducts, fetchProductById, createProduct, modifyProduct, removeProduct
}