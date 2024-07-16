import "./admin.css"
import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import apiAxios from "../../config/axiosConfig"


const MainAdvertisement = () => {
        const { register, handleSubmit, formState } = useForm() 
        const [LoginMsg, setLoginMsg] = useState("")

        const onSubmit = async data => {
                try {
                        const response = await apiAxios.post(
                                "",
                                {
                                        imageAd: data. ,
                                        title: data. ,
                                        description: data. ,
                                },
                                {withCredentials: true})
                        if (response.status === 200) {

                        }
                } catch (error) {
                        console.log(`MainAdv.js error: ${error}`)
                        const errorMsg = error.response.data.error ? error.response.data.error.message : "An error occurred."
                        setLoginMsg(errorMsg)
                }
        }
        
        return ( 
                <div className="container my-3">
                        <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                        <label htmlFor="imageAd" className="form-label">Images URL for main advertisement</label>
                                        <input className="form-control" type="text" multiple {...register("imageAd", {required:true})} />
                                        { formState.errors.imageAd?.type === "required" && <p className={"note"}>New image advertisement necessary.</p> }
                                </div>
                                <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" {...register("title", {required:true, maxLength:20})} />
                                        { formState.errors.title?.type === "required" && <p className={"note"}>Title must be filled.</p> }
                                        { formState.errors.title?.type === "maxLength" && <p className={"note"}>Maximal char is 20.</p> }
                                </div>
                                <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea className="form-control" rows="3" {...register("description", {required:true, maxLength:50})}></textarea>
                                        { formState.errors.description?.type === "required" && <p className={"note"}>Description must be filled.</p> }
                                        { formState.errors.description?.type === "maxLength" && <p className={"note"}>Maximal char is 50.</p> }
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                </div>
         );
}
 
export default MainAdvertisement;