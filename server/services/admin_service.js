const { newMainAdvertisementDb } = require("../db")


const createMainAdvertisement = async (data) => {
        return await newMainAdvertisementDb(data)
}


module.exports = {
        createMainAdvertisement
}