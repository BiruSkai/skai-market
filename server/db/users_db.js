const pool = require("../config/index")


const createUserDb = async (userdata) => {
        const {username, hashedPass, email, user_role, status} = userdata;

        const personalDataFormula = `INSERT INTO userdata(username, password, email, user_role, status)
                                VALUES($1, $2, $3, $4, $5) RETURNING *`
        const personalDataInput = [username, hashedPass, email, user_role, status]
        const res = await pool.query(personalDataFormula, personalDataInput)
        if (!res) {
                return ({data: null, message:"Adding advertisement failed."})
        } else {
                return ({data: res, message:"Adding advertisement succeeded."})
        }
}


module.exports = {
        createUserDb
}