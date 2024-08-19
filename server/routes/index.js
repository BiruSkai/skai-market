const express = require("express");
const Router = require("express-promise-router");
const passport = require("passport");
const { validateFormMainAdvertisement, validateNewUser, validateLogin } = require("./validation");
const { auth, admin, users } = require("../controllers")

const router = new Router();


// router.post("/auth/user_register", validateNewUser, auth.signupUser)
router
        .get("/admin/advertisement", admin.getAllMainAdvertisement)
        .post("/admin/advertisement", validateFormMainAdvertisement, admin.newMainAdvertisement)
        .put("/admin/advertisement/:id", validateFormMainAdvertisement, admin.newMainAdvertisement)
        .delete("/admin/advertisement/:id", admin.deleteAdminAd)
        // auth
        .post("/auth/register", validateNewUser, auth.signupUser)
        .post("/auth/login", validateLogin, auth.loginUser)
        .post("/auth/logout", auth.logoutUser)
        //users
        .get("/users/self", passport.authenticate("jwt-customer", {session:false}), users.getUserSelf)

        .get("/secured-route", passport.authenticate("jwt-customer",{session:false}), (req, res) => {
                res
                .status(200).send("<p>You're in secured route</p><a href='/auth/logout'>Logout</a>")
        })
        

module.exports = router