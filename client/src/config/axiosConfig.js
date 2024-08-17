import axios from "axios"
// require("dotenv").config({path:.env})
// console.log(process.env.EXPRESS_PORT)


const apiAxios = axios.create({
        baseURL: `http://localhost:3001/api`, // cors this url
        withCredentials: true // server can send credentials(cookie) to client after created
})


export default apiAxios