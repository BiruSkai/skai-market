const {pool} = require("../config")


const createCartDb = async (newUserId) => {

        const data = await pool.query(`INSERT INTO carts(user_id) VALUES($1) RETURNING *`, [newUserId])
        return data.rows[0]
}

const fetchCartByIdDb = async (userId) => {

        const data = await pool.query(
                `SELECT products.id, title, category, price, description, img_url, status, quantity FROM carts
                INNER JOIN cart_products ON carts.id = cart_products.cart_id
                INNER JOIN products ON cart_products.product.id = products.id
                WHERE user_id = $1`, [userId])
        return data.rows
}


module.exports = {
        createCartDb,
        fetchCartByIdDb
}