const {pool} = require("../config/index")


const createUserDb = async (userdata) => {
        
        const {email, username, hashedPass, address, city, user_role, active, google_id} = userdata;
        
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

const fetchUserByIdDb = async (id) => {
        const data = await pool.query(`SELECT * FROM userdata WHERE id=$1`, [id])
        return data.rows 
}


const fetchUsersDb = async () => {
        const data = await pool.query(`SELECT userdata.id, username, email, user_role, active, created_on, address, city,
                carts.id FROM users INNER JOIN carts ON users.id = carts.user_id`)
        
        return data.rows
}

const addGoogleIdUserDb = async ({id, google_id}) => {
        const data = await pool.query(`UPDATE userdata SET google_id=$2 WHERE id=$1 RETURNING *`, [id, google_id])
        console.log("user_db_addGoogleUserId: ", data.rows )
        return data.rows
}

const modifyUserSelfDb = async ({id, username, hashedPass, email, address, city}) => {
        const formula = `UDPATE userdata SET username=$2, password=$3, email=$4, address=$5, city=$6 WHERE id=$1`
        const input = [id, username, hashedPass, email, address, city]
        const data = await pool.query(formula, input)
        return data.rows
}

const removeUserDb = async (id) => {
        const data = await pool.query(`UPDATE userdata SET active = false WHERE id=$1`, [id])
        return data.rows
}

module.exports = {
        createUserDb,
        fetchUserByEmailDb,
        fetchUsersDb,
        fetchUserByIdDb,
        addGoogleIdUserDb,
        modifyUserSelfDb,
        removeUserDb
}