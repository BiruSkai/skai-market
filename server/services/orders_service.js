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
        
        const initialValue = 0
        const totalPrice = cart.reduce((acc, item) =>
                acc + parseFloat(item.price) * parseInt(item.quantity, 10), initialValue
        )
                
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