const {pool} = require("../config/index")


const createUserDb = async (userdata) => {

        const {email, username, hashedPass, address, city, user_role, active} = userdata;
        
        const personalDataFormula = `INSERT INTO userdata(username, password, email, user_role, active, address, city, google_id)
                                VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`
        const personalDataInput = [username, hashedPass, email, user_role, active, address, city, google_id]
        const data = await pool.query(personalDataFormula, personalDataInput)
        
        return data.rows[0]
}

const fetchUserByEmailDb = async (email, username) => {
        
        const data = await pool.query(`SELECT id, email, username, password, user_role, active 
                FROM userdata WHERE email=$1 OR username=$2 AND active = true`, [email, username])
        
        return data.rows[0]
}


const fetchUsersDb = async () => {
        const data = await pool.query(`SELECT userdata.id, username, email, user_role, active, created_on, address, city,
                carts.id FROM users INNER JOIN carts ON users.id = carts.user_id`)
        console.log("user_db_fetchUserDb: ", data.rows )
        return data.rows
}

const addGoogleIdUserDb = async ({id, google_id}) => {
        const data = await pool.query(`UPDATE userdata SET google_id=$2 WHERE id=$1 RETURNING *`, [id, google_id])
        console.log("user_db_addGoogleUserId: ", data.rows )
        return data.rows
}


module.exports = {
        createUserDb,
        fetchUserByEmailDb,
        fetchUsersDb,
        addGoogleIdUserDb
}