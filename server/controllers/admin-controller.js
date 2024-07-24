const { adminService } = require("../services")
const { createMainAdvertisement, fetchAllMainAdvertisement } = adminService


const newMainAdvertisement = async (req, res, next) => {
        const {imageAd, title, description} = req.body

        const userInput = {
                imageAd, title, description, user_id:1
        }

        const data = await createMainAdvertisement(userInput)
        console.log("admin-contr-createAd: ", data)
        return res.json({
                data
        })
}

const getAllMainAdvertisement = async (req, res, next) => {
        const data = await fetchAllMainAdvertisement()
        console.log("admin-contr-fetchAllAd: ", data)
        res.status(200).send(data)
        next()
}


module.exports = {
        newMainAdvertisement,
        getAllMainAdvertisement,
}