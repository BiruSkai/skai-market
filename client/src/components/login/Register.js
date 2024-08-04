import { useState } from "react"
import { useForm } from "react-hook-form"
import apiAxios from "../../config/axiosConfig"


const Register = () => {
        const [msg, setMsg] = useState("")
        const { register, handleSubmit, formState} = useForm()
        
        const onRegister = async (data) => {
                try {
                        console.log("b1: ", data)
                        const response = await apiAxios.post(
                                "auth/register",
                                {
                                        email: data.email,
                                        username: data.username,
                                        password: data.password,
                                        address: data.address,
                                        city: data.city,
                                }
                        )
                        if (response.status === 200) {
                                console.log("register successful")
                        }
                }
                catch (error) {
                        console.log("error Register: ", error.response)
                        const errorMsg = error.response.data.error ? error.response.data.error.message : "Registration failed."
                        setMsg(errorMsg)
                }
        }

        return ( 
                <div className="container-md py-5 d-flex align-items-center justify-content-center">
                        <div className="card col-md-6 cold-lg-4 shadow">
                                <div className="card-body">
                                <h3>Register</h3>
                                <form onSubmit={handleSubmit(onRegister)}>
                                        <div class="form-floating my-3">
                                                <input type="email" class="form-control" id="floatingInput" {
                                                        ...register("email", {
                                                                required:true,
                                                                pattern:{value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i},
                                                                maxLength:35
                                                        })} 
                                                />
                                                <label for="floatingInput">Email address</label>
                                                {formState.errors.email?.type === "required" && <p className="note py-2">Email must be filled.</p>}
                                                {formState.errors.email?.type === "maxLength" && <p className="note py-2">Max 35 characters.</p>}
                                                {formState.errors.email?.type === "pattern" && <p className="note py-2">Invalid email address.</p>}
                                        </div>
                                        <div className="form-floating mb-3">
                                                <input type="text" class="form-control" id="floatingInput" {...register("username", {required:true, maxLength:10})} />
                                                <label for="floatingInput">Username</label>
                                                {formState.errors.username?.type === "required" && <p className="note py-2">Username must be filled.</p>}
                                                {formState.errors.username?.type === "maxLength" && <p className="note py-2">Max ten characters</p>}
                                        </div>
                                        <div class="form-floating mb-3">
                                                <input type="password" class="form-control" id="floatingPassword" {...register("password", {required:true, minLength:5, maxLength:12})} />
                                                <label for="floatingPassword">Password</label>
                                                {formState.errors.password?.type === "required" && <p className="note py-2">Password must be filled.</p>}
                                                {formState.errors.password?.type === "minLength" && <p className="note py-2">Min five characters.</p>}
                                                {formState.errors.password?.type === "maxLength" && <p className="note py-2">Max twelve characters.</p>}
                                        </div>
                                        <div class="form-floating mb-3">
                                                <input type="text" class="form-control" id="floatingInput" {...register("address", {required:true, maxLength:25})} />
                                                <label for="floatingInput">Living Address</label>
                                                {formState.errors.address?.type === "required" && <p className="note py-2">Living address must be filled.</p>}
                                                {formState.errors.address?.type === "maxLength" && <p className="note py-2">Max 25 characters.</p>}
                                        </div>
                                        <div class="form-floating mb-3">
                                                <input type="text" class="form-control" id="floatingInput" {...register("city", {required:true, maxLength:15})} />
                                                <label for="floatingPassword">City</label>
                                                {formState.errors.city?.type === "required" && <p className="note py-2">City must be filled.</p>}
                                                {formState.errors.city?.type === "maxLength" && <p className="note py-2">Max 15 characters.</p>}
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