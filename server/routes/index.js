const express = require("express");
const Router = require("express-promise-router");

const router = new Router();


router
        .get("/", (req, res) => {
                console.log("Hra")
                res.send("Hello")
        })

module.exports = router