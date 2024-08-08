const { check, validationResult } = require("express-validator");


const validateFormMainAdvertisement = [
        check("imageAd").not().isEmpty(),
        check("title").not().isEmpty().isLength({max:20}),
        check("description").not().isEmpty().isLength({max:50}),
        (req, res, next) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return res.status(422).json({errors:errors.array()})
                }
                next();
        }
]

const validateNewUser = [
        check("email").not().isEmpty().isEmail().isLength({max:35}),
        check("username").not().isEmpty().isLength({max:10}),
        check("password").not().isEmpty().isLength({min:5, max:12}),
        check("address").not().isEmpty().isLength({max:25}),
        check("city").not().isEmpty().isLength({max:15}),
        
        (req, res, next) => {
                const errors = validationResult(req)
                console.log("3")
                if (!errors.isEmpty()) {
                        return res.status(422).json({errors: errors.array()})
                }
                else next();
        }
]

const validateLogin = [
        check("email").not().isEmpty().isLength({max:35}),
        check("password").not().isEmpty().isLength({min:5, max:12}),
        
        (req, res, next) => {
                const errors = validationResult(req)
                if (!errors.isEmpty) {
                        return res.status(422).json({errors: errors.array()})
                }
                else next();
        }
]


module.exports = {
        validateFormMainAdvertisement,
        validateNewUser,
        validateLogin
}