const pool = require("../config").pool


const newMainAdvertisementDb = async (userInput) => {
        const {imageAd, title, description, user_id} = userInput

        const formula = `INSERT INTO main_advertisements(img_url, title, description, user_id) VALUES($1, $2, $3, $4) RETURNING *`
        const value = [imageAd, title, description, user_id]
        
        const res = await pool.query(formula, value)
        return res.rows[0]
}

const fetchAllMainAdvertisementDb = async () => {
        const res = await pool.query(`SELECT * FROM main_advertisements`)
        return res.rows
}

const updateMainAdvertisementDb = async (userInput) => {
        const {ad_id, imageAd, title, description, user_id} = userInput

        const formula = `UPDATE main_advertisements SET img_url=$1, title=$2, description=$3, user_id=$4 
                WHERE id=$5 RETURNING *`
        const value = [imageAd, title, description, user_id, ad_id]
        
        const res = await pool.query(formula, value)
        return res.rows[0]
}

const deleteAdminAdDb = async (id) => {
        const res = await pool.query(`DELETE FROM main_advertisements WHERE id=$1`, [id])
        return res
}
 
module.exports = {
        newMainAdvertisementDb,
        fetchAllMainAdvertisementDb,
        updateMainAdvertisementDb,
        deleteAdminAdDb
}