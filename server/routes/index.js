const express = require("express");
const Router = require("express-promise-router");
const passport = require("passport");
const { 
        validateFormMainAdvertisement, validateNewUser, validateLogin, validatePutUser, validateDeleteUser,
        validateGetProducts, validateGetProductsByCategory, validatePostProduct, validatePutProduct, validateDeleteProduct,
        validateCart, validateDeleteCartProduct, validateOrder,
} = require("./validation");

const { auth, products, admin, users, carts, orders, payment } = require("../controllers")

const router = new Router();


router
        //extra admin
        .get("/admin/advertisement", admin.getAllMainAdvertisement)
        .post("/admin/advertisement", validateFormMainAdvertisement, admin.newMainAdvertisement)
        .put("/admin/advertisement/:id", validateFormMainAdvertisement, admin.newMainAdvertisement)
        .delete("/admin/advertisement/:id", admin.deleteAdminAd)
        
        // auth
        .post("/auth/register", validateNewUser, auth.signupUser) // Add a user and creates a cart for the user
        .post("/auth/login", validateLogin, auth.loginUser) // Log user in and send a JWT back to cookie
        .post("/auth/logout", auth.logoutUser) // Deletes httpOnly cookie to logout
        .get("/auth/google", passport.authenticate("google", {
                scope: ["profile", "email"], 
                session: false
        }))
        .get("/auth/google/redirect", passport.authenticate("google" , {session:false}), auth.loginGoogle) // Log user in using google oauth and issues JWT back to cookie
        
        //products
        .get("/products", products.getAllProducts)
        .get("/products/:category", validateGetProductsByCategory, products.getProductsByCategory)
        .get("/products/:id", validateGetProducts, products.getProductById)
        .post("/products", validatePostProduct, passport.authenticate("jwt-admin", {session: false}), products.postProduct)
        .put("/products/:id", validatePutProduct, passport.authenticate("jwt-admin", {session: false}), products.putProduct)
        .delete("/products/:id", validateDeleteProduct, passport.authenticate("jwt-admin", {session: false}), products.deleteProduct)
        
        //users
        .get("/users", passport.authenticate("jwt-admin", {session: false}), users.getAllUsers)
        .get("/users/self", passport.authenticate("jwt-customer", {session:false}), users.getUserSelf) // Customer can access their user info.
        .put("/users/self", validatePutUser, passport.authenticate("jwt-customer", {session: false}), users.putUserSelf) // Customer can edit their user info
        .delete("/users/:id", validateDeleteUser, passport.authenticate("jwt-admin", {session: false}), users.deleteUser) // Delete user and associated cart
        
        //carts
        .get("/carts", passport.authenticate("jwt-admin", {session: false}), carts.getAllCarts) // Get all products in all carts
        .post("/carts/self", passport.authenticate("jwt-customer", {session:false}), carts.syncCartSelf) // Get products in user's cart and syncs with logged out cart
        .post("/carts/self/product", validateCart, passport.authenticate("jwt-customer", {session: false}), carts.postProductInCartSelf) // Adds a new product to user's cart
        .put("/carts/self/product", validateCart, passport.authenticate("jwt-customer", {session: false}), carts.putCartSelf) // Changes quantity of a product in user's cart
        .delete("/carts/self/product", validateDeleteCartProduct, passport.authenticate("jwt-customer", {session: false}), carts.deleteCartProductSelf) // Delete a product from a user's cart
        .post("/carts/self/checkout", passport.authenticate("jwt-customer", {session: false}), carts.checkoutCart) // Check out a user's cart and places an order
        
        //orders
        .get("/orders", passport.authenticate("jwt-admin", {session: false}), orders.getAllOrders) // Get all orders for all users
        .get("/orders/review/:orderId", validateOrder, passport.authenticate("jwt-admin", {session: false}), orders.getOrderById) // Gets one order
        .get("/orders/self", passport.authenticate("jwt-customer", {session: false}), orders.getOrdersSelf) // Get all orders for current user

        //payment
        .post("/payment/create-payment-intent", passport.authenticate("jwt-customer", {session: false}), payment.createPaymentIntent)
        

module.exports = router