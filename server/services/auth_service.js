const bcrypt = require("bcrypt");


const getHashedPass = async (password) => {
        var saltRounds = parseInt(process.env.SALTROUNDS)
        const hashedPass = await bcrypt.hash(password, saltRounds)
        return hashedPass
}


module.exports = {
        getHashedPass
}