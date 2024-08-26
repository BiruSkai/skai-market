const express = require("express");
const Router = require("express-promise-router");
const passport = require("passport");
const { validateFormMainAdvertisement, validateNewUser, validateLogin } = require("./validation");
const { auth, admin, users, carts } = require("../controllers")

const router = new Router();


// router.post("/auth/user_register", validateNewUser, auth.signupUser)
router
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
        
        //users
        .get("/users/self", passport.authenticate("jwt-customer", {session:false}), users.getUserSelf) // Customer can access their user info.

        .post("/carts/self", passport.authenticate("jwt-customer", {session:false}), carts.syncCartSelf) // Get products in user's cart and syncs with logged out cart

        .get("/secured-route", passport.authenticate("jwt-customer",{session:false}), (req, res) => {
                res
                .status(200).send("<p>You're in secured route</p><a href='/auth/logout'>Logout</a>")
        })
        

module.exports = router