const { pool } = require("../config/index")


const fetchProductsDb = async () => {
        const data = await pool.query(`SELECT * FROM products`)
        return data.rows[0]
}

const fetchProductByIdDb = async (productId) => {
        const formula = `SELECT * FROM products WHERE id = $1` 
        const input = [productId]
        const data = await pool.query(formula, input)
        
        return data.rows[0]
}

const createProductDb = async (product) => {
        const { title, price, category, description, img_url, status } = product
        
        const formula = `INSERT INTO products(title, price, category, description, img_url, status) 
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`
        const input = [title, price, category, description, img_url, status]
        const data = await pool.query(formula, input)
        
        return data.rows[0]
}

const modifyProductDb = async ({productId, title, price, quantity, category, description, img_url, status}) => {
        
        const formula = `UPDATE products SET title=$2, price=$3, quantity=$4, category=$5, description=$6, img_url=$7, status=$8) 
                WHERE id=$1 RETURNING *`
        const input = [productId, title, price, quantity, category, description, img_url, status]
        const data = await pool.query(formula, input)
        
        return data.rows[0]
}

const deleteProductDb = async (productId) => {
        const data = await pool.query(`DELETE FROM products WHERE id=$1`, [productId])
        return data.rows[0]
}


module.exports = {
        fetchProductsDb, fetchProductByIdDb, createProductDb, modifyProductDb, deleteProductDb
}