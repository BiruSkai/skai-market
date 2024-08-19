const { createUserDb, fetchUserByEmailDb, fetchUsersDb } = require("../db/users_db")


const createUser = async (userdata) => {
        return await createUserDb(userdata)
}

const fetchUserEmail = async (email, username) => {
        return await fetchUserByEmailDb(email, username)
}

const fetchUserById = async (id) => {
        return await fetchUsersDb(id)
}


module.exports = {
        createUser,
        fetchUserEmail,
        fetchUserById,
}