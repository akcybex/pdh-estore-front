import React, { Component } from 'react';
import Breadcrumb from "../common/breadcrumb";
import { Helmet } from 'react-helmet';

class Contact extends Component {

    constructor(props) {
        super(props)
    }

    render() {


        return (
            <div>
                <Helmet>
                    <title>ProHub | Contact Us</title>
                </Helmet>
                <Breadcrumb title={'Contact Us'} />
                {/*Forget Password section*/}
                <section className=" contact-page section-b-space">
                    <div className="container">
                        <div className="row section-b-space">
                            <div className="col-lg-7 map">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6799.254098386894!2d74.40945632304806!3d31.561848367228016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190ffa664b6e73%3A0x8efa036019b85af0!2sTaj%20Bagh%20Scheme%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2sin!4v1587820169942!5m2!1sen!2sin" 
                            allowfullscreen="" aria-hidden="false">
                            </iframe>
                            </div>
                            <div className="col-lg-5">
                                <div className="contact-right">
                                    <ul>
                                        <li>
                                            <div className="contact-icon">
                                                <img src={"/assets/images/icon/phone.png"} alt="Contact-icon" />
                                                <h6>Contact Us</h6>
                                            </div>
                                            <div className="media-body">
                                                <p>+92 313 - 467 - 4173</p>
                                                <p>+92 335 - 086 - 4041</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="contact-icon">
                                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                <h6>Address</h6>
                                            </div>
                                            <div className="media-body">
                                                <p>ProHub Store, Near Taj Bhag, Lahore</p>
                                                <p>PAK 123456</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="contact-icon">
                                                <img src={"/assets/images/icon/email.png"} alt="contact-icons" />
                                                <h6>E-mail</h6>
                                            </div>
                                            <div className="media-body">
                                                <p>Prohub@Store.com</p>
                                                <p>Prohubstore@designs.com</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="contact-icon">
                                                <i className="fa fa-fax" aria-hidden="true"></i>
                                                <h6>Fax</h6>
                                            </div>
                                            <div className="media-body">
                                                <p>Prohub@Store.com</p>
                                                <p>Prohubstore@designs.com</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <form className="theme-form">
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <label htmlFor="name">First Name*</label>
                                            <input type="text" className="form-control" id="name"
                                                placeholder="Enter Your name" required="" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="email">Last Name*</label>
                                            <input type="text" className="form-control" id="last-name"
                                                placeholder="Email" required="" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="review">Phone number*</label>
                                            <input type="text" className="form-control" id="review"
                                                placeholder="Enter your number" required="" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="email">Email*</label>
                                            <input type="text" className="form-control" id="email" placeholder="Email"
                                                required="" />
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="review">Write Your Message</label>
                                            <textarea className="form-control" placeholder="Write Your Message"
                                                id="exampleFormControlTextarea1" rows="6"></textarea>
                                        </div>
                                        <div className="col-md-12">
                                            <button className="btn btn-solid" type="submit">Send Your Message</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

export default Contact