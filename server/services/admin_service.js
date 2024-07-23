const { newMainAdvertisementDb, getAllMainAdvertisementDb } = require("../db")


const createMainAdvertisement = async (userInput) => {
        return await newMainAdvertisementDb(userInput)
}

const getAllMainAdverstisement = async () => {
        return await getAllMainAdvertisementDb
}

module.exports = {
        createMainAdvertisement,
        getAllMainAdverstisement
}