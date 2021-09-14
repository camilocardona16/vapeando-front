import React from 'react'

import './Foter.css'

function Foter() {
    return (
        <footer className="footer">
        <div className="container foot_borde">
            <div className="row">
                <div className=" col-sm-4 col-md-4 col-12">
                    <h5 className="foot_borde headin5_amrc foot_item">Encuentranos</h5>
                    <p className="mb-3">Estamos ubicados en la ciudad de manizales, contamos con mas de 5 años de experiencia en el vapeo, no compras un producto, compras calidad y asesoramiento | hacemos entregas a toda colombia</p>
                    <p><i className="fa fa-location-arrow"></i> Cra 8c # 57c1 - 45 </p>
                    <p><i className="fa fa-phone"></i> +57 3234892794 </p>
                    <p><i className="fa fa fa-envelope"></i> info@vapeando.com </p>
                </div>
                <div className=" col-sm-4 col-md-4 col-12">
                    <h5 className="foot_borde headin5_amrc foot_item">Enlaces de interes</h5>
                    <ul className="footer_ul">
                        <li><a href="/#">Ultimos productos</a></li>
                        <li><a href="/#">Vapeadores economicos</a></li>
                        <li><a href="/#">Pods Modernos</a></li>
                        <li><a href="/#">Esencias Premium</a></li>
                        <li><a href="/#">Esencias en promocion</a></li>
                    </ul>
                </div>
                <div className=" col-sm-4 col-md col-12">
                    <h5 className="foot_borde headin5_amrc foot_item">Nuestra membresia VaperPro</h5>
                    <ul className="footer_ul">
                        <li><a href="/#">¿Como funciona?</a></li>
                        <li><a href="/#">Beneficios</a></li>
                        <li><a href="/#">Articulos para VaperPro</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="container">
            <p className=" text-center justify-content-center">Copyright @2021 | Designed With by <a href="/#">Vapeando</a></p>
            <ul className="social_footer_ul">
                <div className="row justify-content-between">
                    <div className="col-2">
                        <li><a href="/#"><i className="fab fa-facebook-f"/></a></li>
                    
                    </div>
                    <div className="col-2">
                        <li><a href="/#"><i className="fab fa-instagram"></i></a></li>
                    </div>
                    <div className="col-2">
                        <li><a href="/#"><i className="fab fa-whatsapp" ></i></a></li>
                    </div>
                </div>
            </ul>
        </div>
    </footer>
    )
}

export default Foter
