const { createMainAdvertisement } = require("../services/admin_service")


const newMainAdvertisement = async (req, res, next) => {
        const {imageAd, title, description} = req.body

        const userInput = {
                imageAd, title, description, user_id:1
        }
        console.log("admin-contr1: ", data)

        const data = await createMainAdvertisement(userInput)
        console.log("admin-contr: ", data)
        return res.json({
                data: data
        })
}


module.exports = {
        newMainAdvertisement
}