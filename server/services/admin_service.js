const { newMainAdvertisementDb, fetchAllMainAdvertisementDb, updateMainAdvertisementDb, deleteAdminAdDb } = require("../db")


const createMainAdvertisement = async (userInput) => {
        if (userInput.method === "post") {
                return await newMainAdvertisementDb(userInput)
        } else if (userInput.method === "put") {
                return await updateMainAdvertisementDb(userInput)
        }
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