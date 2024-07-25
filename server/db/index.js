const { createCartDb } = require("./carts_db")
const { createUserDb } = require("./users_db")
const { newMainAdvertisementDb, fetchAllMainAdvertisementDb, deleteAdminAdDb } = require("./admin_db")

module.exports = {
        createUserDb,
        createCartDb,
        newMainAdvertisementDb, fetchAllMainAdvertisementDb, deleteAdminAdDb
}