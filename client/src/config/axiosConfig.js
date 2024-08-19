import axios from "axios"
// console.log((process.env.REACT_APP_EXPRESS_PORT))


const apiAxios = axios.create({
        baseURL: `http://localhost:3001/api`, // cors this url
        withCredentials: true // server can send credentials(cookie) to client after created
})


export default apiAxios