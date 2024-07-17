const { createUserDb } = require("../db/users_db")


const createUser = async (userdata) => {
        return await createUserDb(userdata)
}


module.exports = {
        createUser
}