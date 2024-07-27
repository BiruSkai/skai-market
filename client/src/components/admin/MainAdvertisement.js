import "./admin.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import apiAxios from "../../config/axiosConfig"
import { useForm } from "react-hook-form"
import { fetchAllMainAdvertisement, selectAdminAllAdvertisement, selectFetchAdminAllAdvertisementStatus } from "../../features/admin/advertisementSlice"
import CardItem from "../etc/CardItem"
import AdminAdvertisementForm from "./AdminAdvertisementForm"


const MainAdvertisement = () => {

        const dispatch = useDispatch()
        const [data, setData] = useState([])
        const [msg, setMsg] = useState("")

        useEffect(() => {
                dispatch(fetchAllMainAdvertisement())
        }, [dispatch, msg])
        
        const adminAdvertisement = useSelector(selectAdminAllAdvertisement)
        const adminAdvertisementStatus = useSelector(selectFetchAdminAllAdvertisementStatus)

        useEffect(() => {
                const slice = Object.keys(adminAdvertisement)
                const data = slice.map(item => 
                        <CardItem key={adminAdvertisement[item].id} item={adminAdvertisement[item]} setMsg={setMsg} />
                )
                setData(data)
        }, [adminAdvertisement])
        
        
//Register Form
        const { register, handleSubmit, reset, formState, formState:{isSubmitSuccessful} } = useForm() 

        const onCreate = async data => {
                try {   
                        const response = await apiAxios.post(
                                "/auth/admin/advertisement",
                                {
                                        method: "post",
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
                        const errorMsg = error.response.data.error ? error.response.data.error.message : "An error occurred."
                        setMsg(errorMsg)
                }
        }

        useEffect(() => {
                if (formState.isSubmitSuccessful) {
                        reset({imageAd:"", title:"", description:""})
                }
        }, [formState, isSubmitSuccessful])
        

        return ( 
                <div className="container my-3">
                        <form onSubmit={handleSubmit(onCreate)}>
                                <AdminAdvertisementForm register={register} formState={formState} buttonType="Create"/>
                        </form>
                        { msg && <div className="my-3">{msg}</div> }
                        <hr />

                        <div className="m3">
                                <h3>Advertisements in Database:</h3>

                                { adminAdvertisementStatus === "loading" && <p>Loading...</p> }
                                { adminAdvertisementStatus === "failed" && <p>Advertisement upload failed.</p> }
                                { adminAdvertisementStatus === "succeeded" && data.length ? (
                                        <div className="d-flex flex-column flex-md-row">
                                                {data}
                                        </div>) : <p>No Advertisement</p>
                                }
                                        
                        </div>
                </div>
         );
}
 

export default MainAdvertisement;