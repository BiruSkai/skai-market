const { ordersService } = require("../services")
const { calculateOrderAmount } = ordersService 
const stripe = require("stripe")(process.env.STRIPE_PK) 


const createPaymentIntent = async (req, res, next) => {
        const userId = req.user.id 
        // Create a payment intent with order amount and its currency.
        const amount = await calculateOrderAmount(userId)
        const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: "usd"
        })

        res.send({
                clientSecret: paymentIntent.client_secret 
        })
}


module.exports = {
        createPaymentIntent
}