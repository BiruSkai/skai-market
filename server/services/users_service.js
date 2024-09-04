const { 
        createUserDb, fetchUserByEmailDb, fetchUsersDb, fetchUserByIdDb, addGoogleIdUserDb,
        modifyUserSelfDb, removeUserDb

} = require("../db/users_db")


const createUser = async (userdata) => {
        return await createUserDb(userdata)
}

const fetchUserEmail = async (email, username) => {
        return await fetchUserByEmailDb(email, username)
}

const fetchUserById = async (id) => {
        return await fetchUserByIdDb(id)
}

const addGoogleIdUser = async (user) => {
        return await addGoogleIdUserDb(user)
}

const fetchAllUsers = async () => {
        return await fetchUsersDb()
}

const modifyUserSelf = async (modifiedData) => {
        return await modifyUserSelfDb(modifiedData)
} 

const removeUser = async (id) => {
        return await removeUserDb(id)
}


module.exports = {
        createUser,
        fetchUserEmail,
        fetchUserById,
        addGoogleIdUser,
        fetchAllUsers,
        modifyUserSelf,
        removeUser
}