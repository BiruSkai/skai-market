import { useState } from "react"
import "./home.css"


const Carousel = ({items, idArray, status}) => {

        const [page, setPage] = useState(0)

        const idArrayLength = idArray.length
        const indexArray = []
        for (let x=0; x<idArrayLength; x++) {
                indexArray.push(x)
        }

        const onActive = (move) => {
                switch(move) {
                        case "prev":
                                setPage((parseInt(page) - 1) % idArrayLength)
                                break;
                        case "next":
                                setPage((parseInt(page) + 1) % idArrayLength)
                                break;
                        default:
                                setPage(0)
               }  
        }


        return ( 
                <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                        { indexArray.map( id => {
                                return (
                                        <button key={id} type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={id} className={`${id === indexArray[page] ? "active" : ""}`} aria-current="true" aria-label={`Slide ${id}`}></button>
                                )
                        })}
                        </div>
                        <div className="carousel-inner">
                        { status === "succeeded" && idArray.map(id => {
                                return (
                                        <div className={`carousel-item ${id === idArray[page] ? "active" : ""}`} key={items[id].id} data-bs-interval="3000">
                                                <img src={items[id].img_url} className="d-block w-100 overlayColor" alt="carousel-image" />
                                                <div className="carousel-caption d-none d-md-block">
                                                        <h5>{items[id].title}</h5>
                                                        <p>{items[id].description}</p>
                                                </div>
                                        </div>
                                )
                        })}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                                <span className={`carousel-control-prev-icon`} aria-hidden="true" onClick={() => onActive("prev")} ></span>
                                <span className="visually-hidden" >Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                                <span className={`carousel-control-next-icon`} aria-hidden="true" onClick={() => onActive("next")}></span>
                                <span className="visually-hidden" >Next</span>
                        </button>
                </div>
         );
}
 

export default Carousel;