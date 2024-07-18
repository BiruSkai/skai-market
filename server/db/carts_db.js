const pool = require("../config")


const createCartDb = async (newUserId) => {
        const res = await pool.query(`INSERT INTO carts(user_id) VALUE($1) RETURNING *`, 
                [newUserId])
        return res.rows[0]
}


module.exports = {
        createCartDb
}