const { createCartDb } = require("./carts_db")
const { createUserDb, fetchUsersDb } = require("./users_db")
const { newMainAdvertisementDb, fetchAllMainAdvertisementDb, updateMainAdvertisementDb, deleteAdminAdDb } = require("./admin_db")

module.exports = {
        createUserDb, fetchUsersDb,
        createCartDb,
        newMainAdvertisementDb, fetchAllMainAdvertisementDb, updateMainAdvertisementDb, deleteAdminAdDb
}