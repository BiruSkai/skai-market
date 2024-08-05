const {pool} = require("../config/index")


const createUserDb = async (userdata) => {
        const {email, username, hashedPass, address, city, user_role, active} = userdata;
        
        const personalDataFormula = `INSERT INTO userdata(username, password, email, user_role, active, address, city)
                                VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`
        const personalDataInput = [username, hashedPass, email, user_role, active, address, city]
        const res = await pool.query(personalDataFormula, personalDataInput)
        
        return res.rows[0]
}

const fetchUserByEmailDb = async (email, username) => {
        const res = await pool.query(`SELECT id, email, username, password, user_role, active 
                FROM userdata WHERE email=$1 OR username=$2 AND active = true`, [email, username])
        
        return res.rows[0]
}

module.exports = {
        createUserDb,
        fetchUserByEmailDb
}