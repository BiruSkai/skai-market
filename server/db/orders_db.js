const { pool } = require("../config");


const fetchOrdersDb = async () => {
        const data = await pool.query(`SELECT * FROM orders`)
        return data.rows[0]
}

const fetchOrderByIdDb = async (orderId) => {
        const formula = `SELECT * FROM orders 
                INNER JOIN order_products ON order_products.order_id = orders.id
                INNER JOIN products ON products.id = order_products.product_id
                WHERE orders.id = $1`
        const input = [orderId]
        const data = await pool.query(formula, input)
        return data.rows 
}

const createOrderDb = async ({ user_id, status }) => {
        const formula = `INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *`
        const input = [user_id, status]
        const data = await pool.query(formula, input)

        return data.rows[0].id 
}

const fetchOrdersByUserDb = async (userId) => {
        const data = await pool.query(
                `SELECT orders.id AS order_id, products.id AS product_id, title, products.price, quantity, created_on FROM orders
                INNER JOIN order_products ON order_products.order_id = orders.id
                INNER JOIN products ON products.id = order_products.product_id
                WHERE orders.user_id = $1`, [userId]      
        )
        return data.rows 
}

const createProductInOrderDb = async ({ order_id, product_id, quantity, price }) => {
        const formula = `INSERT INTO order_products (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *`
        const input = [order_id, product_id, quantity, price]
        const data = await pool.query(formula, input)

        return data.rows
}


module.exports = {
        fetchOrdersDb,
        fetchOrderByIdDb,
        fetchOrdersByUserDb,
        createOrderDb,
        createProductInOrderDb,
}