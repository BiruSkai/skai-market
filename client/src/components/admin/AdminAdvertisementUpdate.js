import AdminAdvertisementForm from "./AdminAdvertisementForm";
import apiAxios from "../../config/axiosConfig"
import { useForm } from "react-hook-form"
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import { selectAdminAdData } from "../../features/admin/advertisementSlice";


const AdminAdvertisementUpdate = () => {
        const history = useHistory()
        const [msg, setMsg] = useState("")
        const currentData = useSelector(selectAdminAdData)

        const { register, handleSubmit, formState } = useForm({
                defaultValues: {
                        id: currentData.id,
                        imageAd: currentData.img_url,
                        title: currentData.title,
                        description: currentData.description 
                }
        }) 

        const onUpdate = async data => {
                try {   
                        const response = await apiAxios.put(
                                `/auth/admin/advertisement/${data.id}`,
                                {
                                        method: "put",
                                        imageAd: data.imageAd,
                                        title: data.title,
                                        description: data.description,
                                }
                                // {withCredentials: true}
                        )

                        if (response.status === 200) {
                                return history.push("/admin/advertisement")
                        }
                } catch (error) {
                        const errorMsg = error.response.data.error ? error.response.data.error.message : "An error occurred."
                        setMsg(errorMsg)
                }
        }


        return (
                <div className="container my-3">
                        <h3>Update Admin Advertisement: </h3>
                        <form onSubmit={handleSubmit(onUpdate)}>
                                <AdminAdvertisementForm register={register} formState={formState} buttonType="Update" />
                        </form> 
                        {msg && <div className="my-3">{msg}</div>}
                </div>
         );
}
 

export default AdminAdvertisementUpdate;