const { createCartDb } = require("../db")


const createCart = async (newUserId) => {
        return await createCartDb(newUserId)
}


module.exports = {
        createCart
}