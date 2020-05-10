import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { validateEmail } from "../../utils/generalMethods";
import API from "../../utils/api";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      is_admin: "0",
    };
  }
  handleChange = (evt) => {
    const value = evt.target.value;
    this.setState({
      [evt.target.name]: value,
    });
  };
  handleSubmit = (event) => {
    const { email, password } = this.state;
    if (email.length == 0) {
      toast.error("Email is required!");
    } else if (password.length == 0) {
      toast.error("Password is required!");
    } else if (!validateEmail(email)) {
      toast.error("Invalid Email");
    } else {
      API.post(`/login`, this.state)
        .then((res) => {
          toast.success("Logged Successfully");
          // console.log("RES", res.data[0]);
          localStorage.setItem("logged", JSON.stringify(res.data[0]));
          window.location.replace("/");
        })
        .catch((err) => {
          // console.log('ER',err)
          toast.error(err.message);
        });
    }
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>ProHub | login</title>
        </Helmet>
        <Breadcrumb title={"Login"} />

        {/*Login section*/}
        <section className="login-page section-b-space">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <h3>Login</h3>
                <div className="theme-card">
                  <form className="theme-form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Email"
                        required=""
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="review">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="review"
                        name="password"
                        placeholder="Enter your password"
                        required=""
                        onChange={this.handleChange}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-solid"
                      //   onClick={this._login}
                    >
                      Login
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-lg-6 right-login">
                <h3>New Customer</h3>
                <div className="theme-card authentication-right">
                  <h6 className="title-font">Create A Account</h6>
                  <p>
                    Sign up for a free account at our store. Registration is
                    quick and easy. It allows you to be able to order from our
                    shop. To start shopping click register.
                  </p>
                  <Link to="/pages/register" className="btn btn-solid">
                    Create an Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Login;
