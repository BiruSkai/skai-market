const { createCartDb, fetchCartByIdDb } = require("../db")


const createCart = async (newUserId) => {
        return await createCartDb(newUserId)
}

const fetchCartById = async (userId) => {
        return await fetchCartByIdDb(userId)
}


module.exports = {
        createCart,
        fetchCartById,
}