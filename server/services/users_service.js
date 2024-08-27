const { createUserDb, fetchUserByEmailDb, fetchUsersDb, addGoogleIdUserDb } = require("../db/users_db")


const createUser = async (userdata) => {
        return await createUserDb(userdata)
}

const fetchUserEmail = async (email, username) => {
        return await fetchUserByEmailDb(email, username)
}

const fetchUserById = async (id) => {
        return await fetchUsersDb(id)
}

const addGoogleIdUser = async (user) => {
        return await addGoogleIdUserDb(user)
}

module.exports = {
        createUser,
        fetchUserEmail,
        fetchUserById,
        addGoogleIdUser
}