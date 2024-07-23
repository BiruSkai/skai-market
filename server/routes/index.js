const express = require("express");
const Router = require("express-promise-router");
const { validatePostMainAdvertisement, validateNewUser } = require("./validation");
const { auth, admin } = require("../controllers")

const router = new Router();


// router.post("/auth/user_register", validateNewUser, auth.signupUser)
router
        .get("/admin/advertisement", admin.fetchAllMainAdvertisement)
        .post("/auth/admin/advertisement", validatePostMainAdvertisement, admin.newMainAdvertisement)


module.exports = router