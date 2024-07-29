import { useEffect, useState } from "react";
import Carousel from "./Carousel";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMainAdvertisement, selectAdminAllAdvertisement, selectFetchAdminAllAdvertisementStatus } from "../../features/admin/advertisementSlice";


const Home = () => {
        const dispatch = useDispatch()
        const [idArray, setIdArray] = useState([])
        const [status, setStatus] = useState("")
        
        useEffect(() => {
                dispatch(fetchAllMainAdvertisement())
        }, [])
        
        const adminAdvertisement = useSelector(selectAdminAllAdvertisement)
        const adminAdvertisementStatus = useSelector(selectFetchAdminAllAdvertisementStatus)

        useEffect(() => {
                const data = Object.keys(adminAdvertisement)
                setIdArray(data)
                setStatus(adminAdvertisementStatus)
        }, [adminAdvertisement, adminAdvertisementStatus])

        return ( 
                <div className="container mt-4">
                        <Carousel items={adminAdvertisement} idArray={idArray} status={status} />
                        <div class="m-3 d-flex flex-column flex-md-row justify-content-center">
                                <button className="shopping"><i class="bi bi-shop me-2"></i>Click here for online shopping</button> 
                                <button className="shopping"><i class="bi bi-book me-2"></i>Check today catalog</button>
                        </div>
                </div>
         );
}
 

export default Home;