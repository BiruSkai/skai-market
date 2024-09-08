const { 
        fetchCartsDb, createCartDb, fetchCartByIdDb, createProductInCartDb, modifyCartDb, removeCartProductDb, removeCartDb 
} = require("../db")


const fetchCarts = async () => {
        return await fetchCartsDb()
}

const createCart = async (newUserId) => {
        return await createCartDb(newUserId)
}

const fetchCartById = async (userId) => {
        return await fetchCartByIdDb(userId)
}

const createProductInCart = async (cartProduct) => {
        return await createProductInCartDb(cartProduct)
}

const modifyCart = async (updateCartProduct) => {
        return await modifyCartDb(updateCartProduct)
}

const removeCartProduct = async (cartProduct) => {
        return await removeCartProductDb(cartProduct)
}

const removeCart = async (userId) => {
        return await removeCartDb(userId)
}


module.exports = {
        fetchCarts,
        createCart,
        fetchCartById,
        createProductInCart, 
        modifyCart, 
        removeCartProduct,
        removeCart
}