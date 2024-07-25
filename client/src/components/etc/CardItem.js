import { useState } from "react"
import "./cardItem.css"
import apiAxios from "../../config/axiosConfig"


const CardItem = ({item}) => {
        const [msg, setMsg] = useState("")

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
                        <img src={item.img_url} className="card-img-top" alt="adminAdvertisementImage" />
                        <div className="card-body cardItemButton">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{item.description}</p>
                                <a href="#" className="btn btn-primary">Update</a>
                                <a href="#" className="btn btn-primary" onClick={onDelete}>Delete</a>
                        </div>
                </div>
         )
}
 

export default CardItem;