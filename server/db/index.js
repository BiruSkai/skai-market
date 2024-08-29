const { createCartDb, fetchCartByIdDb } = require("./carts_db")
const { createUserDb, fetchUsersDb, addGoogleIdUserDb } = require("./users_db")
const { newMainAdvertisementDb, fetchAllMainAdvertisementDb, updateMainAdvertisementDb, deleteAdminAdDb } = require("./admin_db")

module.exports = {
        createUserDb, fetchUsersDb, addGoogleIdUserDb,
        createCartDb, fetchCartByIdDb,
        newMainAdvertisementDb, fetchAllMainAdvertisementDb, updateMainAdvertisementDb, deleteAdminAdDb
}