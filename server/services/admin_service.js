const { newMainAdvertisementDb } = require("../db")


const createMainAdvertisement = async (data) => {
        console.log("admin_service: ", data)
        return await newMainAdvertisementDb(data)
}


module.exports = {
        createMainAdvertisement
}