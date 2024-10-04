import "./footer.css";


const Footer = () => {
        return ( 
                <div className="position-sticky fixed-bottom border-top bg-dark text-white" style={{fontFamily:"serif"}}>
                        <footer class="d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-center pt-3">
                                <ul class="nav col-sm-12 col-md-4 list-unstyled d-flex justify-content-md-center pb-md-3">
                                        <li class="ms-3"><a class="text-body-secondary" href="#"><i class="bi bi-twitter-x"></i></a></li>
                                        <li class="ms-3"><a class="text-body-secondary" href="#"><i class="bi bi-instagram"></i></a></li>
                                        <li class="ms-3"><a class="text-body-secondary" href="#"><i class="bi bi-facebook"></i></a></li>
                                </ul>
                                <div class="col-md-4 d-flex justify-content-md-center align-items-center pt-3 pt-md-0 pb-md-3 footerText">
                                        <span class="mb-3 mb-md-0 text-body-secondary">© 2024 Skai e-market</span>
                                </div>
                        </footer>
                </div>
         );
}
 
export default Footer;