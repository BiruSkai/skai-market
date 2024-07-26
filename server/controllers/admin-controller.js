const { adminService } = require("../services")
const { createMainAdvertisement, fetchAllMainAdvertisement, deleteAdminAdService } = adminService


const newMainAdvertisement = async (req, res, next) => {
        const {method, imageAd, title, description} = req.body
        const ad_id = req.params.id
        const userInput = {
                method, ad_id, imageAd, title, description, user_id:1
        }

        const data = await createMainAdvertisement(userInput)
        return res.json({
                data
        })
}

const getAllMainAdvertisement = async (req, res, next) => {
        const data = await fetchAllMainAdvertisement()
        res.status(200).send(data)
        next()
}

const deleteAdminAd = async (req, res, next) => {
        const {id} = req.params
        const data = await deleteAdminAdService(id)
        res.status(200).send(data)
        next()
}


module.exports = {
        newMainAdvertisement,
        getAllMainAdvertisement,
        deleteAdminAd,
}