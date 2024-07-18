const express = require("express");
const Router = require("express-promise-router");
const { validatePostMainAdvertisement } = require("./validation");
const { auth, admin } = require("../controllers")
const router = new Router();


router
        .get("/", (req, res) => {
                res.send("Hello")
        })

        .post("/auth/user_register", validateNewUser, auth.signupUser)

        -post("/auth/admin/advertisement", validatePostMainAdvertisement, admin.newMainAdvertisement)


module.exports = router