const pool = require("../config/index")


const createUserDb = async (userdata) => {
        const {email, username, hashedPass, address, city, user_role, status} = userdata;

        const personalDataFormula = `INSERT INTO userdata(username, password, email, user_role, status, address, city)
                                VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`
        const personalDataInput = [email, username, hashedPass, user_role, status, address, city]
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