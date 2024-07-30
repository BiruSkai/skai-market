import { useState } from "react"
import { useForm } from "react-hook-form"
import apiAxios from "../../config/axiosConfig"


const Register = () => {
        const [msg, setMsg] = useState("")
        const { register, handleSubmit, formState} = useForm
        
        const onRegister = async (data) => {
                try {
                        console.log("b1: ", data)
                        const response = await apiAxios.post(
                                "auth/register",
                                {
                                        email: data.email,
                                        password: data.password,
                                        name: data.name,
                                        address: data.address,
                                        country: data.country
                                }
                        )
                        if (response.status === 200) {
                                console.log("register successful")
                        }
                }
                catch (error) {
                        const errorMsg = error.response.data.error ? error.response.data.errpr.message : "Registration failed."
                        setMsg(errorMsg)
                }
        }

        return ( 
                <div className="container-md py-5 d-flex align-items-center justify-content-center justify-content-lg-end">
                        <div className="card col-md-6 cold-lg-4 shadow">
                                <div className="card-body">
                                <h3>Register</h3>
                                <form onSubmit={handleSubmit(onRegister)}>
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
                                        <div class="form-floating my-3">
                                                <input type="text" class="form-control" id="floatingInput" {...register("address", {required:true})} />
                                                <label for="floatingInput">Living Address</label>
                                                {formState.errors.address?.type === "required" && <p className="note py-2">Living address must be filled.</p>}
                                        </div>
                                        <div class="form-floating">
                                                <input type="text" class="form-control" id="floatingInput" {...register("country", {required:true})} />
                                                <label for="floatingPassword">Password</label>
                                                {formState.errors.country?.type === "required" && <p className="note py-2">Country must be filled.</p>}
                                        </div>
                                        <div class="my-3">
                                                <button class="p-2 btn btn-primary col-12">Register</button>
                                        </div>
                                </form>                
                                { msg }
                                </div>
                        </div>
                        
                </div>
         );
}
 
export default Register;