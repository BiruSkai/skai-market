const bcrypt = require("bcrypt");


const getHashedPass = async (password) => {
        var saltRounds = parseInt(process.env.SALTROUNDS)
        console.log(saltRounds, password)
        const hashedPass = await bcrypt.hash(password, saltRounds)
        
        return hashedPass
}


module.exports = {
        getHashedPass
}