const { newMainAdvertisementDb } = require("../db")


const createMainAdvertisement = async (userInput) => {
        console.log("admin_service: ",userInput)
        return await newMainAdvertisementDb(userInput)
}


module.exports = {
        createMainAdvertisement
}