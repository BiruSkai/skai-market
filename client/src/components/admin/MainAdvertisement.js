import { useForm } from "react-hook-form"



const MainAdvertisement = () => {
        const { register, handleSubmit, formState } = useForm() 

        const onSubmit = async data => {
               console.log(data)
        }
        
        return ( 
                <div className="container my-3">
                        <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                        <label htmlFor="imageAd" className="form-label">Images URL for main advertisement</label>
                                        <input className="form-control" type="text" multiple {...register("imageAd", {required:true})} />
                                        { formState.errors.imageAd?.type === "required" && "New image advertisement necessary." }
                                </div>
                                <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" {...register("title", {required:true, maxLength:20})} />
                                        { formState.errors.title?.type === "required" && "Title must be filled." }
                                        { formState.errors.title?.type === "maxLength" && "Maximal char is 20." }
                                </div>
                                <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea className="form-control" rows="3" {...register("description", {required:true, maxLength:50})}></textarea>
                                        { formState.errors.description?.type === "required" && "Description must be filled." }
                                        { formState.errors.description?.type === "maxLength" && "Maximal char is 50." }
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                </div>
         );
}
 
export default MainAdvertisement;