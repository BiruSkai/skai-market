import "./cardItem.css"


const CardItem = ({item}) => {
        
        return ( 
                <div className="card m-md-3" >
                        <img src={item.img_url} className="card-img-top" alt="adminAdvertisementImage" />
                        <div className="card-body cardItemButton">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{item.description}</p>
                                <a href="#" className="btn btn-primary">Update</a>
                                <a href="#" className="btn btn-primary">Delete</a>
                        </div>
                </div>
         )
}
 

export default CardItem;