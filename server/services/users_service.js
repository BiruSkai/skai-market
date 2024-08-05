const { createUserDb, fetchUserByEmailDb } = require("../db/users_db")


const createUser = async (userdata) => {
        return await createUserDb(userdata)
}

const fetchUserEmail = async (email, username) => {
        return await fetchUserByEmailDb(email, username)
}


module.exports = {
        createUser,
        fetchUserEmail
}