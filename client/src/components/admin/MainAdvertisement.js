import "./admin.css"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import apiAxios from "../../config/axiosConfig"
import { fetchAllMainAdvertisement, selectAdminAllAdvertisement, selectFetchAdminAllAdvertisementStatus } from "../../features/admin/advertisementSlice"
import CardItem from "../etc/CardItem"


const MainAdvertisement = () => {
        const dispatch = useDispatch()
        const { register, handleSubmit, formState } = useForm() 
        const [msg, setMsg] = useState("")
        const [data, setData] = useState([])

        useEffect(() => {
          dispatch(fetchAllMainAdvertisement())
        }, [dispatch])
        
        const adminAdvertisement = useSelector(selectAdminAllAdvertisement)
        const adminAdvertisementStatus = useSelector(selectFetchAdminAllAdvertisementStatus)

        useEffect(() => {
                const slice = Object.keys(adminAdvertisement)
                const advertisement = slice.map(item => {
                        <CardItem key={adminAdvertisement[item].id} item={adminAdvertisement[item]} />
                })
                setData(advertisement)
                console.log("postData: ", advertisement)
        }, [adminAdvertisement])

        

        const onSubmit = async data => {
                try {   
                        const response = await apiAxios.post(
                                "/auth/admin/advertisement",
                                {
                                        imageAd: data.imageAd,
                                        title: data.title,
                                        description: data.description,
                                }
                                // {withCredentials: true}
                        )

                        if (response.status === 200) {
                                setMsg("A new advertisement has been added.")
                        }
                } catch (error) {
                        console.log(`MainAdv.js error: ${error}`)
                        const errorMsg = error.response.data.error ? error.response.data.error.message : "An error occurred."
                        setMsg(errorMsg)
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
                        {msg && <div className="my-3">{msg}</div>}
                        <hr />
                        <div className="m3">
                                <h1>Advertisements in Database:</h1>
                                { adminAdvertisementStatus === "loading" && <p>Loading...</p> }
                                { adminAdvertisementStatus === "failed" && <p>Advertisement upload failed.</p> }
                                { adminAdvertisementStatus === "succeeded" && data.length ? data : <p>No Advertisement</p> }
                        </div>
                </div>
         );
}
 

export default MainAdvertisement;