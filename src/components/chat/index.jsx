import React, { Component } from "react";
import PortItem from "./portItem";
import "./styles.css";
import API from "../../utils/api";
export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolios: [],
    };
  }
  componentDidMount() {
    API.get(`/portfolios`)
      .then((res) => {
        this.setState({ portfolios: res.data });
      })
      .catch((err) => console.log("ER", err));
  }
  render() {
    return (
      <div>
        {/*Paragraph*/}
        <section className="ratio_square j-box pets-box section-b-space">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="title1 title5">
                  <h2>portfolios</h2>
                  <hr role="tournament6" />
                </div>
                <div className="row">
                  {this.state.portfolios.map((item, index) => (
                    <div className="col-xl-3 col-md-6 col-grid-box">
                      <PortItem portfolios={item} key={index} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
