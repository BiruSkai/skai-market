const express = require("express");
const Router = require("express-promise-router");
const { validateFormMainAdvertisement, validateNewUser } = require("./validation");
const { auth, admin } = require("../controllers")

const router = new Router();


// router.post("/auth/user_register", validateNewUser, auth.signupUser)
router
        .get("/admin/advertisement", admin.getAllMainAdvertisement)
        .post("/auth/admin/advertisement", validateFormMainAdvertisement, admin.newMainAdvertisement)
        .put("/auth/admin/advertisement/:id", validateFormMainAdvertisement, admin.newMainAdvertisement)
        .delete("/admin/advertisement/:id", admin.deleteAdminAd)


module.exports = router