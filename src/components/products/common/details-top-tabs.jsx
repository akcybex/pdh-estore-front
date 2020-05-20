import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.scss";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import API from "../../../utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { validateEmail } from "../../../utils/generalMethods";
class DetailsTopTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 1,
      name: "",
      email: "",
      title: "",
      testimonial: "",
    };
  }
  handleChange = (evt) => {
    const value = evt.target.value;
    this.setState({
      [evt.target.name]: value,
    });
  };
  changeRating = (newRating, name) => {
    this.setState({
      rating: newRating,
    });
  };
  sendReview = (item) => {
    let user = JSON.parse(localStorage.getItem("logged"));
    const { name, email, title, testimonial } = this.state;
    if (user) {
      if (name.length == 0) {
        toast.error("Name is required!");
      } else if (email.length == 0) {
        toast.error("Email is required!");
      } else if (title.length == 0) {
        toast.error("Title is required!");
      } else if (testimonial.length == 0) {
        toast.error("Review Detail required!");
      } else if (!validateEmail(email)) {
        toast.error("Invalid Email");
      } else {
        let data = {
          ...this.state,
          user_id: user.id,
          product_id: item.id,
        };
        API.post(`/reviews/add`, data)
          .then((res) => {
            if (res.status == 200) {
              toast.success("Reviewed Successfully");
              this.setState({
                name: "",
                email: "",
                title: "",
                testimonial: "",
              });
            } else {
              toast.error("Something went wrong!");
            }
          })
          .catch((err) => {
            toast.error(err.message);
          });
      }
    } else {
      toast.error("First Login!");
    }
  };
  render() {
    const { item } = this.props;
    return (
      <section className="tab-product m-0">
        <div className="row">
          <div className="col-sm-12 col-lg-12">
            <Tabs className="tab-content nav-material">
              <TabList className="nav nav-tabs nav-material">
                <Tab className="nav-item">
                  <span className="nav-link active">
                    <i className="icofont icofont-ui-home" />
                    Description
                  </span>
                  <div className="material-border" />
                </Tab>
                <Tab className="nav-item">
                  <span className="nav-link">
                    <i className="icofont icofont-man-in-glasses" />
                    Details
                  </span>
                  <div className="material-border" />
                </Tab>
                <Tab className="nav-item">
                  <span className="nav-link">
                    <i className="icofont icofont-contacts" />
                    Video
                  </span>
                  <div className="material-border" />
                </Tab>
                <Tab className="nav-item">
                  <span className="nav-link">
                    <i className="icofont icofont-contacts" />
                    Write Review
                  </span>
                  <div className="material-border" />
                </Tab>
              </TabList>
              <TabPanel className="tab-pane fade mt-4 show active">
                <table className="table table-striped mb-0">
                  <tbody>
                    <tr>
                      <th>Ideal For :</th>
                      <td>Women's</td>
                    </tr>
                    <tr>
                      <th>Pattern :</th>
                      <td>Embroidered</td>
                    </tr>
                    <tr>
                      <th>Dress Fabric :</th>
                      <td>Silk</td>
                    </tr>
                    <tr>
                      <th>Type :</th>
                      <td>Ghagra, Choli, Dupatta Set</td>
                    </tr>
                    <tr>
                      <th>Neck :</th>
                      <td>Round Neck</td>
                    </tr>
                    <tr>
                      <th>Sleeve :</th>
                      <td>3/4 Sleeve</td>
                    </tr>
                    <tr>
                      <th>Work :</th>
                      <td>N/A</td>
                    </tr>
                  </tbody>
                </table>
              </TabPanel>
              <TabPanel>
                <p className="mt-4 p-0">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </TabPanel>
              <TabPanel>
                <div className="mt-4 text-center">
                  <div className="embed-responsive embed-responsive-16by9">
                    <iframe
                      src="https://www.youtube.com/embed/BUWzX78Ye_8"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <form className="theme-form mt-4">
                  <div className="form-row">
                    <div className="col-md-12 ">
                      <div className="media m-0">
                        <label>Rating</label>
                        <div className="media-body ml-3">
                          {/* <div className="rating three-star">
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                    </div> */}
                          {/* Rating Stars */}
                          <StarRatings
                            rating={this.state.rating}
                            starRatedColor="orange"
                            starDimension="20px"
                            changeRating={this.changeRating}
                            numberOfStars={5}
                            name="rating"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={this.state.name}
                        placeholder="Enter Your name"
                        required
                        name="name"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        value={this.state.email}
                        placeholder="Email"
                        required
                        name="email"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="review">Review Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="review"
                        value={this.state.title}
                        placeholder="Enter your Review Subjects"
                        required
                        name="title"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="review">Review Title</label>
                      <textarea
                        className="form-control"
                        placeholder="Wrire Your Testimonial Here"
                        id="exampleFormControlTextarea1"
                        rows="6"
                        value={this.state.testimonial}
                        name="testimonial"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="col-md-12">
                      <button
                        className="btn btn-solid"
                        onClick={() => this.sendReview(item)}
                        type="button"
                      >
                        Submit Your Review
                      </button>
                    </div>
                  </div>
                </form>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </section>
    );
  }
}

export default DetailsTopTabs;
