const { ordersService } = require("../services")
const { fetchOrders, fetchOrderById, fetchOrdersByUser } = ordersService


const getAllOrders = async (req, res, next) => {
        const data = await fetchOrders()
        res.status(200).send(data)
        next()
}

const getOrderById = async (req, res, next) => {
        const { orderId } = req. params
        const data = await fetchOrderById(orderId)
        
        res.status(200).send(data)
        next()
}

const getOrdersSelf = async (req, res, next) => {
        const userId = req.user.id 

        const data = await fetchOrdersByUser(userId)
        res.status(200).send(data)
        next()
}


module.exports = {
        getAllOrders,
        getOrderById,
        getOrdersSelf
}