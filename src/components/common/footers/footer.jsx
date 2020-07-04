import React, { Component } from "react";
import { Link } from "react-router-dom";

import { SlideUpDown } from "../../../services/script";

class Footer extends Component {

    componentDidMount() {
        var contentwidth = window.innerWidth;
        if ((contentwidth) < 750) {
            SlideUpDown("footer-title");
        } else {
            var elems = document.querySelectorAll(".footer-title");
            [].forEach.call(elems, function (elemt) {
                let el = elemt.nextElementSibling;
                el.style = "display: block";
            });
        }
    }


    render() {

        return (
            <footer className="">
                <section className="section-b-space darken-layout">
                    <div className="container">
                        <div className="row footer-theme partition-f">
                            <div className="col-lg-4 col-md-6">
                                <div className="footer-title footer-mobile-title">
                                    <h4>about</h4>
                                </div>
                                <div className="footer-contant">
                                    <div className="footer-logo">
                                        <Link to={"/"} >
                                            <img src={"White-logo.png"} alt="ProHub logo" className="img-fluid" />
                                        </Link>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, </p>
                                    <div className="footer-social">
                                        <ul>
                                            <li>
                                                <Link to={"https://www.facebook.com/"} ><i className="fa fa-facebook" aria-hidden="true"></i></Link>
                                            </li>
                                            <li>
                                                <Link to={"https://plus.google.com/"} ><i className="fa fa-google-plus" aria-hidden="true"></i></Link>
                                            </li>
                                            <li>
                                                <Link to={"https://twitter.com"}><i className="fa fa-twitter" aria-hidden="true"></i></Link>
                                            </li>
                                            <li>
                                                <Link to={"https://instagram.com"}><i className="fa fa-instagram" aria-hidden="true"></i></Link>
                                            </li>
                                            <li>
                                                <Link to={"https://www.linkedin.com/"}><i className="fa fa-linkedin" aria-hidden="true"></i></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col offset-xl-1">
                                <div className="sub-title">
                                    <div className="footer-title">
                                        <h4>Categories</h4>
                                        <hr color='#fd7e14' width="65%" align="left"/>
                                    </div>
                                    <div className="footer-contant">
                                        <ul>
                                            <li><Link to={"/collection/t-shirt"} >T-Shirts</Link></li>
                                            <li><Link to={"/collection/logo"} >Logo Designs</Link></li>
                                            <li><Link to={"/collection/Business-card"} >Business Cards</Link></li>
                                            <li><Link to={"/collection/flyer-designs"} >Flyer Designs</Link></li>
                                            <li><Link to={"/collection/brochure-designs"} >Brochure Designs</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="sub-title">
                                    <div className="footer-title">
                                        <h4>why we choose</h4>
                                        <hr color='#fd7e14' width="85%" align="left"/>
                                    </div>
                                    <div className="footer-contant">
                                        <ul>
                                            <li><a href="#">shipping & return</a></li>
                                            <li><a href="#">secure shopping</a></li>
                                            <li><a href="#">gallary</a></li>
                                            <li><a href="#">contacts</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="sub-title">
                                    <div className="footer-title">
                                        <h4>store information</h4>
                                        <hr color='#fd7e14' />
                                    </div>
                                    <div className="footer-contant">
                                        <ul className="contact-list">
                                            <li><i className="fa fa-map-marker"></i>ProHub Designs Store, Taj Bhag,
                                            Lahore
                                            </li>
                                            <li><i className="fa fa-phone"></i>Call: +92 313-467-4173<br/>Call: +92 335-086-4041</li>
                                            <li><i className="fa fa-envelope-o"></i>Email Us: <a
                                                href="#">Prohub@designs.com</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="sub-footer dark-subfooter">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 col-md-6 col-sm-12">
                                <div className="footer-end">
                                    <p><i className="fa fa-copyright" aria-hidden="true"></i> 2020-21 | All Rights 
                                        reserved by ProHub Designs</p>
                                </div>
                            </div>
                            <div className="col-xl-6 col-md-6 col-sm-12">
                                <div className="payment-card-bottom">
                                    <ul>
                                        <li>
                                            <a href="#"><img src={"/assets/images/icon/visa.png"} alt="" /></a>
                                        </li>
                                        <li>
                                            <a href="#"><img src={"/assets/images/icon/mastercard.png"} alt="" /></a>
                                        </li>
                                        <li>
                                            <a href="#"><img src={"/assets/images/icon/paypal.png"} alt="" /></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;