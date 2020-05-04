import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Breadcrumb from "../common/breadcrumb";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { validateEmail } from "../../utils/generalMethods";
import API from "../../utils/api";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
    };
  }
  handleChange = (evt) => {
    const value = evt.target.value;
    this.setState({
      [evt.target.name]: value,
    });
  };
  handleSubmit = (event) => {
    const { fname, lname, email, password } = this.state;
    if (fname.length == 0) {
      toast.error("FirstName is required!");
    } else if (lname.length == 0) {
      toast.error("LastName is required!");
    } else if (email.length == 0) {
      toast.error("Email is required!");
    } else if (!validateEmail(email)) {
      toast.error("Invalid Email");
    } else if (password.length == 0) {
      toast.error("Password is required!");
    } else {
      let data = {
        name: `${fname} ${lname}`,
        email: email,
        password: password,
      };
      // console.log("State", data);
      API.post(`/register`, data)
        .then((res) => {
          console.log("RES", res);
          if (res.status == 200) {
            API.post(`/login`, {
              email: email,
              password: password,
              is_admin: "0",
            })
              .then((result) => {
                toast.success("Logged Successfully");
                // console.log("RES", result, "R", result.data);
                localStorage.setItem("logged", JSON.stringify(result.data[0]));
                window.location.replace("/");
              })
              .catch((err) => {
                // console.log("ERR", err);
                toast.error(err.message);
              });
          }
        })
        .catch((err) => {
          // console.log("ERR", err);
          toast.error(err.message);
        });
    }
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>ProHub | Register</title>
        </Helmet>
        <Breadcrumb title={"create account"} />

        {/*Regsiter section*/}
        <section className="register-page section-b-space">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h3>create account</h3>
                <div className="theme-card">
                  <form className="theme-form" onSubmit={this.handleSubmit}>
                    <div className="form-row">
                      <div className="col-md-6">
                        <label htmlFor="email">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="fname"
                          placeholder="First Name"
                          required=""
                          name="fname"
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="review">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lname"
                          placeholder="Last Name"
                          required=""
                          name="lname"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-md-6">
                        <label htmlFor="email">email</label>
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          placeholder="Email"
                          required=""
                          name="email"
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="review">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="review"
                          placeholder="Enter your password"
                          required=""
                          name="password"
                          onChange={this.handleChange}
                        />
                      </div>
                      <button className="btn btn-solid">create Account</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Register;
