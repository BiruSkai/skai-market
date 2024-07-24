const { newMainAdvertisementDb, fetchAllMainAdvertisementDb } = require("../db")


const createMainAdvertisement = async (userInput) => {
        return await newMainAdvertisementDb(userInput)
}

const fetchAllMainAdvertisement = async () => {
        return await fetchAllMainAdvertisementDb()
}

module.exports = {
        createMainAdvertisement,
        fetchAllMainAdvertisement
}