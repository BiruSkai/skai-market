import { useState } from "react";
import apiAxios from "../config/axiosConfig";
import { useHistory } from "react-router-dom";


const Secret = () => {
        const history = useHistory()
        const [msg, setMsg] = useState("")


        const handleSecuredRoute = async () => {
                try {
                        const response = await apiAxios.get("/secured-route", {withCredentials:true})
                        if (response.status === 200) {
                                console.log(response)
                                setMsg(response.data)
                                
                        }
                } catch (error) {
                        console.log(error)
                        setMsg(error)
                }
        }

        const handleLogout = async () => {
                try {
                        console.log("122")
                        const response = await apiAxios.post("/auth/logout", {withCredentials:true})
                        console.log("12 ", response)
                        if (response.status === 204) {
                                setMsg("")
                                return history.push("/login")
                        }
                } catch (error) {
                        console.log("b ", error)
                        setMsg(error)
                }
        }

        return ( 
                <div>
                        <button onClick={handleSecuredRoute}>Enter secured route</button>
                        <button onClick={handleLogout}>Logout</button>
                        {msg}
                </div>
         );
}
 

export default Secret;