import { fetchOrdersDb, fetchOrderByIdDb, createOrderDb, fetchOrdersByUserDb, createProductInOrderDb } from "../db";


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


module.exports = {
        fetchOrders, 
        fetchOrderById,
        createOrder, 
        fetchOrdersByUser,
        createProductInOrder,
}