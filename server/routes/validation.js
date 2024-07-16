const { check, validationResult } = require("express-validator");


const validatePostMainAdvertisement = [
        check("imageAd").not().isEmpty(),
        check("title").not().isEmpty().isLength({max:20}),
        check("description").not().isEmpty().isLength({max:50}),
        (req, res, next) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return res.json({errors:errors.array()})
                }
                else next();
        }
]


module.exports = {
        validatePostMainAdvertisement
}