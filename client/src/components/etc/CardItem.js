import { useState } from "react"
import { Link } from "react-router-dom"
import "./cardItem.css"
import apiAxios from "../../config/axiosConfig"
import { useDispatch } from "react-redux"
import { adminAdData } from "../../features/admin/advertisementSlice"


const CardItem = ({item}) => {
        const [msg, setMsg] = useState("")
        const {id, img_url, title, description} = item
        const dispatch = useDispatch()

        const onDelete = async () => {
                try {
                        const response = await apiAxios.delete(`/admin/advertisement/${item.id}`)
                        if (response === 200) {
                                setMsg(`Advertisement id: ${item.id} has been deleted.`)
                        }
                } catch (error) {
                        console.log("cardItem error: ", error)
                        const errorMsg = error.response.data.error ? error.response.data.error : "An error has occured."
                        setMsg(errorMsg)
                }
                
        }
        
        return ( 
                <div className="card m-md-3" >
                        <img src={img_url} className="card-img-top" alt="adminAdvertisementImage" />
                        <div className="card-body cardItemButton">
                                <h5 className="card-title">{title}</h5>
                                <p className="card-text">{description}</p>
                                <Link to={`/admin/advertisement/${id}`} onClick={() => dispatch(adminAdData(item))} className="btn btn-primary">Update</Link>
                                <a className="btn btn-primary" onClick={onDelete}>Delete</a>
                        </div>
                </div>
         )
}
 

export default CardItem;