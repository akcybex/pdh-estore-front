import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../../common/index.scss";
import Slider from "react-slick";

// Import custom components
import Collection from "./collection";
import Header from "../../common/headers/header";
import Footer from "../../common/footers/footer";
import ThemeSettings from "../../common/theme-settings";

class Home extends Component {
  state = {
    layoutColumns: 3,
  };

  LayoutViewClicked(colums) {
    this.setState({
      layoutColumns: colums,
    });
  }

  openFilter = () => {
    document.querySelector(".collection-filter").style = "left: -15px";
  };

  componentDidMount() {
    document
      .getElementById("color")
      .setAttribute("href", "/assets/css/color15.css");
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
                        <div
                          style={{
                            backgroundColor: "rgba(255,255,255,0.6",
                            padding: 20,
                          }}
                        >
                          <h4>Welcome To ProHub</h4>
                          <h2>Professional designer</h2>
                          <Link
                            to={"/left-sidebar/collection"}
                            className="btn btn-solid"
                          >
                            shop now
                          </Link>
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
                        <div
                          style={{
                            backgroundColor: "rgba(255,255,255,0.6",
                            padding: 20,
                          }}
                        >
                          <h4>Welcome To ProHub</h4>
                          <h2>Desinger make world colorfull</h2>
                          <Link
                            to={`${
                              process.env.PUBLIC_URL
                            }/left-sidebar/collection`}
                            className="btn btn-solid"
                          >
                            shop now
                          </Link>
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
        <Collection type={"T-shirts"} />
        {/*Product Section End*/}

        <ThemeSettings />
        <Footer />
      </div>
    );
  }
}

export default Home;
