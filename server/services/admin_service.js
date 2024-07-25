const { newMainAdvertisementDb, fetchAllMainAdvertisementDb, deleteAdminAdDb } = require("../db")


const createMainAdvertisement = async (userInput) => {
        return await newMainAdvertisementDb(userInput)
}

const fetchAllMainAdvertisement = async () => {
        return await fetchAllMainAdvertisementDb()
}

const deleteAdminAdService = async (id) => {
        return await deleteAdminAdDb(id)
}

module.exports = {
        createMainAdvertisement,
        fetchAllMainAdvertisement,
        deleteAdminAdService
}