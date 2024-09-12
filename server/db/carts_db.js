const {pool} = require("../config")


const createCartDb = async (newUserId) => {

        const data = await pool.query(`INSERT INTO carts(user_id) VALUES($1) RETURNING *`, [newUserId])
        return data.rows[0]
}

const fetchCartsDb = async () => {
        const data = await pool.query(
                `SELECT * from carts
                INNER JOIN cart_products ON carts.id = cart_products.cart_id
                INNER JOIN products ON cart_products.product_id = products.id`)
        return data.rows[0]
}

const fetchCartByIdDb = async (userId) => {
        
        const data = await pool.query(
                `SELECT products.id, title, category, price, description, img_url, status, quantity FROM carts
                INNER JOIN cart_products ON carts.id = cart_products.cart_id
                INNER JOIN products ON cart_products.product_id = products.id
                WHERE user_id = $1`, [userId])
        
        return data.rows
}

const createProductInCartDb = async ({ cart_id, product_id, quantity }) => {
        const formula = `INSERT INTO cart_products (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *`
        const input = [cart_id, product_id, quantity]
        const data = await pool.query(formula, input)

        return data.rows 
}

const modifyCartDb = async ({ cart_id, product_id, quantity }) => {
        const formula = `UPDATE cart_products SET quantity=$3 WHERE cart_id=$1 AND product_id=$2 RETURNING *`
        const input = [cart_id, product_id, quantity]
        const data = await pool.query(formula, input)

        return data.rows 
}

const removeCartProductDb = async ({ cart_id, product_id }) => {
        const formula = `DELETE FROM cart_products WHERE cart_id=$1 AND product_id=$2`
        const input = [cart_id, product_id]
        const data = await pool.query(formula, input)
        
        return data.rows[0]
}

// Needs cart to be empty for removal
const removeCartDb = async (userId) => {
        console.log("1 ", userId)
        const data = await pool.query(`DELETE FROM carts WHERE user_id=$1`, [userId])
        return data.rows[0]
}


module.exports = {
        createCartDb,
        fetchCartsDb,
        fetchCartByIdDb,
        createProductInCartDb,
        modifyCartDb,
        removeCartProductDb,
        removeCartDb
}