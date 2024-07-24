const CardItem = ({item}) => {
        console.log("CardItem: ", item)
        return ( 
                <div class="card" style="width: 18rem;">
                        <img src={item.img_url} class="card-img-top" alt="adminAdvertisementImage" />
                        <div class="card-body">
                                <h5 class="card-title">{item.title}</h5>
                                <p class="card-text">{item.description}</p>
                                <a href="#" class="btn btn-primary">Update</a>
                                <a href="#" class="btn btn-primary">Delete</a>
                        </div>
                </div>
         );
}
 

export default CardItem;