import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../../../utils/api";
class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navClose: { right: "0px" },
      navs: [],
    };
  }
  componentDidMount() {
    API.get("/categories")
      .then((res) => this.setState({ navs: res.data }))
      .catch((err) => console.log("ERR", err));
  }
  componentWillMount() {
    if (window.innerWidth < 750) {
      this.setState({ navClose: { right: "-410px" } });
    }
    if (window.innerWidth < 1199) {
      this.setState({ navClose: { right: "-300px" } });
    }
  }

  openNav() {
    this.setState({ navClose: { right: "0px" } });
  }
  closeNav() {
    this.setState({ navClose: { right: "-410px" } });
  }

  onMouseEnterHandler() {
    if (window.innerWidth > 1199) {
      document.querySelector("#main-menu").classList.add("hover-unset");
    }
  }

  handleSubmenu = (event) => {
    if (event.target.classList.contains("sub-arrow")) return;

    if (event.target.nextElementSibling.classList.contains("opensubmenu"))
      event.target.nextElementSibling.classList.remove("opensubmenu");
    else {
      document.querySelectorAll(".nav-submenu").forEach(function(value) {
        value.classList.remove("opensubmenu");
      });
      document
        .querySelector(".mega-menu-container")
        .classList.remove("opensubmenu");
      event.target.nextElementSibling.classList.add("opensubmenu");
    }
  };

  render() {
    return (
      <div>
        <div className="main-navbar">
          <div id="mainnav">
            <ul className="nav-menu">
              <li>
                <Link
                  to={"/"}
                  className="nav-link"
                  onClick={(e) => this.handleSubmenu(e)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="nav-link"
                  onClick={(e) => this.handleSubmenu(e)}
                >
                  messages
                </Link>
              </li>
              <li>
                <Link
                  to={"#"}
                  className="nav-link"
                  onClick={(e) => this.handleSubmenu(e)}
                >
                  collection
                  <span className="sub-arrow" />
                </Link>
                <ul className="nav-submenu">
                  {/* {this.state.navs.map((item) => (
                    <li key={item.id}>
                      <Link to={"/collection/t-shirt"}>{item.name}</Link>
                    </li>
                  ))} */}
                  <li>
                    <Link to={`/collection/t-shirt/${1}`}>T-Shirts</Link>
                  </li>
                  <li>
                    <Link to={`/collection/logo/${2}`}>Logos</Link>
                  </li>
                  <li>
                    <Link to={`/collection/business-card/${3}`}>Business Cards</Link>
                  </li>
                  <li>
                    <Link to={`/collection/flyer-designs/${4}`}>Flyers Designs</Link>
                  </li>
                  <li>
                    <Link to={`/collection/brochure-designs/${5}`}>
                      Brochure Designs
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  to={"/pages/about-us"}
                  className="nav-link"
                  onClick={(e) => this.handleSubmenu(e)}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to={"/pages/contact"}
                  className="dropdown"
                  onClick={(e) => this.handleSubmenu(e)}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
