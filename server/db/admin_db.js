const pool = require("../config")


const newMainAdvertisementDb = async (data) => {
        const {imageAd, title, description, user_id} = data
        console.log("amin_db: ", title)

        const formula = `INSERT INTO main_advertisements(img_url, title, description, user_id)
         VALUE($1, $2, $3, $4) RETURNING *`
        const value = [imageAd, title, description, user_id]
        
        const res = await pool.query(formula, value)
        console.logo("admin_db: ", res)
        return res.rows[0]
}


module.exports = {
        newMainAdvertisementDb
}