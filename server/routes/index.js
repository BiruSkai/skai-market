const express = require("express");
const Router = require("express-promise-router");
const { validatePostMainAdvertisement } = require("./validation");

const router = new Router();


router
        .get("/", (req, res) => {
                res.send("Hello")
        })
        -post("/auth/admin/advertisement", validatePostMainAdvertisement)

module.exports = router