const { fetchProductsDb, fetchProductCategoriesDb, fetchProductByIdDb, createProductDb, modifyProductDb, removeProductDb } = require("../db") 


const fetchProducts = async () => {
        return await fetchProductsDb()
}

const fetchProductCategories = async (category) => {
        return await fetchProductCategoriesDb(category)
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
        fetchProducts, fetchProductCategories, fetchProductById, createProduct, modifyProduct, removeProduct
}