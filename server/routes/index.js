const express = require("express");
const Router = require("express-promise-router");
const { validateFormMainAdvertisement, validateNewUser, validateLogin } = require("./validation");
const { auth, admin } = require("../controllers")

const router = new Router();


// router.post("/auth/user_register", validateNewUser, auth.signupUser)
router
        .get("/admin/advertisement", admin.getAllMainAdvertisement)
        .post("/admin/advertisement", validateFormMainAdvertisement, admin.newMainAdvertisement)
        .put("/admin/advertisement/:id", validateFormMainAdvertisement, admin.newMainAdvertisement)
        .delete("/admin/advertisement/:id", admin.deleteAdminAd)
        // auth
        .post("/auth/register", validateNewUser, auth.signupUser)
        .get("/auth/login", validateLogin)
        

module.exports = router