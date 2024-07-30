import { useForm } from "react-hook-form"
import "../admin/admin.css"
import { useState } from "react"
import apiAxios from "../../config/axiosConfig"



const Login = () => {

        const [msg, setMsg] = useState("")

        const {register, handleSubmit, formState} = useForm()

        const onLogin = async (data) => {
                try {
                        console.log("a1: ", data)
                        const response = await apiAxios.post(
                                "auth/login",
                                {
                                        email: data.email,
                                        password: data.password
                                }
                        )
                        if (response.status === 200) {
                                console.log("login successful")
                        }
                }
                catch (error) {
                        const errorMsg = error.response.data.error ? error.response.data.errpr.message : "Email or password is incorrect."
                        setMsg(errorMsg)
                }
        }

        return ( 
                <div className="container-md py-5 d-flex align-items-center justify-content-center justify-content-lg-end">
                        <div className="card col-md-6 cold-lg-4 shadow">
                                <div className="card-body">
                                <h3>User Login</h3>
                                <form onSubmit={handleSubmit(onLogin)}>
                                        <div class="form-floating my-3">
                                                <input type="email" class="form-control" id="floatingInput" {...register("email", {required:true})} />
                                                <label for="floatingInput">Email address</label>
                                                {formState.errors.email?.type === "required" && <p className="note py-2">Email must be filled.</p>}
                                        </div>
                                        <div class="form-floating">
                                                <input type="password" class="form-control" id="floatingPassword" {...register("password", {required:true})} />
                                                <label for="floatingPassword">Password</label>
                                                {formState.errors.password?.type === "required" && <p className="note py-2">Password must be filled.</p>}
                                        </div>
                                        <div class="my-3">
                                                <button class="p-2 btn btn-primary col-12">Login</button>
                                        </div>
                                </form>                
                                { msg }
                                </div>
                        </div>
                        
                </div>
         );
}
 
export default Login;