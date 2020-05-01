import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import '../../common/index.scss';
import Slider from 'react-slick';

// Import custom components
import Collection from "./collection"
import Header from "../../common/headers/header"
import Footer from "../../common/footers/footer"
import ThemeSettings from "../../common/theme-settings"

class Home extends Component {

    state = {
        layoutColumns: 3
    }

    LayoutViewClicked(colums) {
        this.setState({
            layoutColumns: colums
        })
    }

    openFilter = () => {
        document.querySelector(".collection-filter").style = "left: -15px";
    }

    componentDidMount() {
        document.getElementById("color").setAttribute("href", "/assets/css/color15.css");
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>ProHub | Home</title>
                </Helmet>
                <Header />
                {/*Home Slider*/}
                <section className="p-0">
                    <Slider className="slide-1 home-slider">
                        <div>
                            <div className="home home1 text-center">
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="slider-contain">
                                                <div>
                                                    <h4>welcome to fashion</h4>
                                                    <h1>men fashion</h1>
                                                    <Link to={"/left-sidebar/collection"} className="btn btn-solid">shop now</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="home home2 text-center">
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="slider-contain">
                                                <div>
                                                    <h4>welcome to fashion</h4>
                                                    <h1>women fashion</h1>
                                                    <Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`} className="btn btn-solid">shop now</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </section>
                {/*Home Slider End*/}

                {/*Product Section*/}
                <Collection type={'T-shirts'} />
                {/*Product Section End*/}

                <ThemeSettings />
                <Footer />
            </div>
        )
    }
}


export default Home;