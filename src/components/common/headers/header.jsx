import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { IntlActions } from "react-redux-multilingual";
import Pace from "react-pace-progress";

// Import custom components
import store from "../../../store";
import NavBar from "./common/navbar";
import CartContainer from "../../../containers/CartContainer";
import { changeCurrency } from "../../../actions";
import { connect } from "react-redux";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      logged: false,
      user: "",
      searchValue: "",
    };
  }
  /*=====================
         Pre loader
         ==========================*/
  componentDidMount() {
    let user = JSON.parse(localStorage.getItem("logged"));
    if (user) {
      this.setState({ logged: true, user: user.email });
    }
    setTimeout(function() {
      document.querySelector(".loader-wrapper").style = "display: none";
    }, 2000);

    this.setState({ open: true });
  }

  componentWillMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    let number =
      window.pageXOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (number >= 300) {
      if (window.innerWidth < 576) {
        document.getElementById("sticky").classList.remove("fixed");
      } else document.getElementById("sticky").classList.add("fixed");
    } else {
      document.getElementById("sticky").classList.remove("fixed");
    }
  };

  changeLanguage(lang) {
    store.dispatch(IntlActions.setLocale(lang));
  }

  openNav() {
    var openmyslide = document.getElementById("mySidenav");
    if (openmyslide) {
      openmyslide.classList.add("open-side");
    }
  }
  openSearch() {
    document.getElementById("search-overlay").style.display = "block";
  }

  closeSearch() {
    document.getElementById("search-overlay").style.display = "none";
  }

  load = () => {
    this.setState({ isLoading: true });
    fetch().then(() => {
      // deal with data fetched
      this.setState({ isLoading: false });
    });
  };

  // handle Logout
  _logout = () => {
    localStorage.removeItem("logged");
    window.location.reload();
    this.setState({ logged: false });
  };
  handleSearch = (event) => {
    const regex = /[1-5]$/g;
    let url = window.location.href;
    let category_id = url.match(regex);
    const { searchValue } = this.state;
    if (searchValue.length == 0) {
      alert("Type Product Name!");
    } else {
      category_id
        ? (window.location = `/search-result/${searchValue}/${category_id.toString()}`)
        : (window.location = `/search-result/${searchValue}`);
    }
    event.preventDefault();
  };
  render() {
    return (
      <div>
        <header id="sticky" className="sticky">
          {this.state.isLoading ? <Pace color="#27ae60" /> : null}
          <div className="mobile-fix-option" />
          {/*Top Header Component*/}
          <div className="top-header">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="header-contact">
                    <ul>
                      <li>Welcome to ProHub Designs Store</li>
                      <li>
                        <i className="fa fa-phone" aria-hidden="true" />
                        Call Us: +92 313 - 467 - 4173
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6 text-right">
                  <ul className="header-dropdown">
                    <li className="mobile-wishlist">
                      <Link to={"/wishlist"}>
                        <i className="fa fa-heart" aria-hidden="true" />
                        Wishlist
                      </Link>
                    </li>
                    <li className="onhover-dropdown mobile-account">
                      <i className="fa fa-user" aria-hidden="true" /> My Account
                      {this.state.logged ? (
                        <ul className="onhover-show-div">
                          <li>{this.state.user}</li>
                          <li>
                            <Link to={"/my-order"} data-lng="en">
                              My Order
                            </Link>
                          </li>
                          <li>
                            <Link to={"/my-review"} data-lng="en">
                              My Review
                            </Link>
                          </li>
                          <li onClick={this._logout}>Logout</li>
                        </ul>
                      ) : (
                        <ul className="onhover-show-div">
                          <li>
                            <Link to={"/pages/login"} data-lng="en">
                              Login
                            </Link>
                          </li>
                          <li>
                            <Link to={"/pages/register"} data-lng="en">
                              Register
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="main-menu">
                  <div className="menu-left">
                    <div className="brand-logo">
                      <Link to={"/"}>
                        <img
                          src={"logo.png"}
                          alt="ProHub logo"
                          className="img-fluid"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="menu-right pull-right">
                    {/*Top Navigation Bar Component*/}
                    <NavBar />

                    <div>
                      <div className="icon-nav">
                        <ul>
                          <li className="onhover-div mobile-search">
                            <div>
                              <img
                                src={"/assets/images/icon/search.png"}
                                onClick={this.openSearch}
                                className="img-fluid"
                                alt=""
                              />
                              <i
                                className="fa fa-search"
                                onClick={this.openSearch}
                              />
                            </div>
                          </li>
                          <li className="onhover-div mobile-setting">
                            <div>
                              <img
                                src={"/assets/images/icon/setting.png"}
                                className="img-fluid"
                                alt=""
                              />
                              <i className="fa fa-cog" />
                            </div>
                            <div className="show-div setting">
                              <h6>language</h6>
                              <ul>
                                <li>
                                  <a
                                    href={null}
                                    onClick={() => this.changeLanguage("en")}
                                  >
                                    English
                                  </a>{" "}
                                </li>
                              </ul>
                              <h6>currency</h6>
                              <ul className="list-inline">
                                <li>
                                  <a
                                    href={null}
                                    onClick={() =>
                                      this.props.changeCurrency("Rs.")
                                    }
                                  >
                                    PKR
                                  </a>{" "}
                                </li>
                                <li>
                                  <a
                                    href={null}
                                    onClick={() =>
                                      this.props.changeCurrency("€")
                                    }
                                  >
                                    euro
                                  </a>{" "}
                                </li>
                                <li>
                                  <a
                                    href={null}
                                    onClick={() =>
                                      this.props.changeCurrency("₹")
                                    }
                                  >
                                    rupees
                                  </a>{" "}
                                </li>
                                <li>
                                  <a
                                    href={null}
                                    onClick={() =>
                                      this.props.changeCurrency("£")
                                    }
                                  >
                                    pound
                                  </a>{" "}
                                </li>
                                <li>
                                  <a
                                    href={null}
                                    onClick={() =>
                                      this.props.changeCurrency("$")
                                    }
                                  >
                                    doller
                                  </a>{" "}
                                </li>
                              </ul>
                            </div>
                          </li>
                          {/*Header Cart Component */}
                          <CartContainer />
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div id="search-overlay" className="search-overlay">
          <div>
            <span
              className="closebtn"
              onClick={this.closeSearch}
              title="Close Overlay"
            >
              ×
            </span>
            <div className="overlay-content">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <form onSubmit={this.handleSearch}>
                      <div className="form-group">
                        <input
                          type="text"
                          value={this.state.searchValue}
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="Search a Product"
                          onChange={(e) =>
                            this.setState({ searchValue: e.target.value })
                          }
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        <i className="fa fa-search" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { changeCurrency }
)(Header);
