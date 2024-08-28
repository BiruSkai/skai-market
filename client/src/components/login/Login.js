import "../admin/admin.css"
import "./login.css";
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import apiAxios from "../../config/axiosConfig"
import { fetchCurrentUser, isLoggedInUpdated, selectCurrentUser, selectCurrentUserStatus, selectIsLoggedIn } from "../../features/users/usersSlice"
import { fetchCurrentCart, needsCheckoutRedirectUpdated, selectCart, selectFetchCurrentCartStatus, selectNeedsCheckoutRedirect } from "../../features/cart/cartSlice"
// ***Order not yet written


const Login = () => {
        const history = useHistory()
        const dispatch = useDispatch()
        const [msg, setMsg] = useState("")
        const {register, handleSubmit, formState} = useForm()
        const cartContents = useSelector(selectCart)
        const needsCheckoutRedirect = useSelector(selectNeedsCheckoutRedirect)
        const fetchCurrentCartStatus = useSelector(selectFetchCurrentCartStatus)
        const userStatus = useSelector(selectCurrentUserStatus)
        const isLoggedIn = useSelector(selectIsLoggedIn)

        const onLogin = async (data) => {
                try {
                        const response = await apiAxios.post(
                                "/auth/login",
                                {
                                        email: data.email,
                                        password: data.password
                                },
                                {withCredentials:true}
                             
                        )
                        if (response.status === 200) {
                                setMsg("")
                                dispatch(fetchCurrentUser())
                                dispatch(fetchCurrentCart(cartContents))
                                return history.push("/")
                        }
                }
                catch (error) {
                        const errorMsg = error.response.data.error ? error.response.data.error.message : "Email or password is incorrect."
                        setMsg(errorMsg)
                }
        }
        
        // When data/cart/order are fetched, update login status
        useEffect(() => {
                if (    userStatus === "succeeded" &&
                        fetchCurrentCartStatus === "succeeded" 
                ) {dispatch(isLoggedInUpdated(true))}
        }, [userStatus, needsCheckoutRedirect, fetchCurrentCartStatus, dispatch])

        // When login data is fetched, redirect to main site or checkout
        useEffect(() => {
                if (    userStatus === "succeeded" &&
                        fetchCurrentCartStatus === "succeeded" &&
                        isLoggedIn
                ) {
                        if (needsCheckoutRedirect) {
                                dispatch(needsCheckoutRedirectUpdated(false)) 
                                history.push("/checkout")
                        } else {
                                history.push("/")
                        }
                }
        }, [userStatus, fetchCurrentCartStatus, isLoggedIn, needsCheckoutRedirect, history, dispatch])


        useEffect(() => {
                if (userStatus === "failed") {
                        setMsg("An error occurred connecting to the server.")
                }
        }, [userStatus])

        
        return ( 
                <div className="container-md py-5 py-md-4 col-lg-10 d-flex align-items-center justify-content-center">
                        <div className="card col-md-6 cold-lg-4 shadow">
                                <div className="card-body">
                                        <div className="h3 loginTitle">Login</div>
                                        <form onSubmit={handleSubmit(onLogin)}>
                                                <div class="form-floating my-3 loginText">
                                                        <input type="email" class="form-control" id="floatingInput" {
                                                                ...register("email", {
                                                                        required:true,
                                                                        pattern:{value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i},
                                                                        maxLength:35
                                                                })} 
                                                        />
                                                        <label for="floatingInput">Email/ Username</label>
                                                        {formState.errors.email?.type === "required" && <p className="note py-2">Email must be filled.</p>}
                                                        {formState.errors.email?.type === "maxLength" && <p className="note py-2">Max 35 characters.</p>}
                                                        {formState.errors.email?.type === "pattern" && <p className="note py-2">Invalid email address.</p>}
                                                </div>
                                                <div class="form-floating loginText">
                                                        <input type="password" class="form-control" id="floatingPassword" {...register("password", {required:true, minLength:5, maxLength:12})} />
                                                        <label for="floatingPassword">Password</label>
                                                        {formState.errors.password?.type === "required" && <p className="note py-2">Password must be filled.</p>}
                                                </div>
                                                <div class="my-2">
                                                        <button class="p-2 btn btn-primary col-12 loginText">Login</button>
                                                </div>
                                                <div class="p-2 d-flex justify-content-center pt-3 loginText">
                                                        <p className="or loginText"><span>OR</span></p>
                                                </div>
                                                <div class="my-2">
                                                        <button class="p-2 btn btn-primary col-12 loginText"><i class="bi bi-google"></i>oogle login</button>
                                                </div>
                                        </form>                
                                        <p className="note loginText">{ msg }</p>
                                </div>
                        </div>
                        
                </div>
         );
}
 
export default Login;