const { 
        fetchCartsDb, createCartDb, fetchCartByIdDb, createProductInCartDb, modifyCartDb, removeCartProductDb, removeCartDb 
} = require("./carts_db")
const { createUserDb, fetchUsersDb, addGoogleIdUserDb } = require("./users_db")
const { newMainAdvertisementDb, fetchAllMainAdvertisementDb, updateMainAdvertisementDb, deleteAdminAdDb } = require("./admin_db")
const { fetchOrdersDb, fetchOrderByIdDb, createOrderDb, fetchOrdersByUserDb, createProductInOrderDb } = require("./orders_db");


module.exports = {
        createUserDb, fetchUsersDb, addGoogleIdUserDb,
        fetchCartsDb, createCartDb, fetchCartByIdDb, createProductInCartDb, modifyCartDb, removeCartProductDb, removeCartDb,
        newMainAdvertisementDb, fetchAllMainAdvertisementDb, updateMainAdvertisementDb, deleteAdminAdDb,
        fetchOrdersDb, fetchOrderByIdDb, createOrderDb, fetchOrdersByUserDb, createProductInOrderDb
}