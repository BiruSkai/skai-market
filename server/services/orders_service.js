const { fetchOrdersDb, fetchOrderByIdDb, createOrderDb, fetchOrdersByUserDb, createProductInOrderDb } = require("../db");
const { fetchCartById } = require("./carts_service");


const fetchOrders = async () => {
        return await fetchOrdersDb()
}

const fetchOrderById = async (orderId) => {
        return await fetchOrderByIdDb(orderId)
}

const createOrder = async (userId) => {
        const order = {
                user_id: userId,
                status: "Placed order"
        }
        return await createOrderDb(order)
}

const fetchOrdersByUser = async (userId) => {
        return await fetchOrdersByUserDb(userId)
}

const createProductInOrder = async (orderProduct) => {
        return await createProductInOrderDb(orderProduct)
}

const calculateOrderAmount = async (userId) => {
        const cart = await fetchCartById(userId)

        const totalPrice = cart.reduce((acc, item) => {
                acc + parseFloat(item.product.price) * parseInt(item.product.quantity, 10)
        }, 0)

        return totalPrice * 100 // Return price in cents
}


module.exports = {
        fetchOrders, 
        fetchOrderById,
        createOrder, 
        fetchOrdersByUser,
        createProductInOrder,
        calculateOrderAmount
}