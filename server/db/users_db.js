const pool = require("../config/index")


const createUserDb = async (userdata) => {
        const {username, hashedPass, email, user_role, status} = userdata;

        const personalDataFormula = `INSERT INTO userdata(username, password, email, user_role, status)
                                VALUES($1, $2, $3, $4, $5) RETURNING *`
        const personalDataInput = [username, hashedPass, email, user_role, status]
        const personalDataToDb = await pool.query(personalDataFormula, personalDataInput)
}


module.exports = {
        createUserDb
}