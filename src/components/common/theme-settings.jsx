import React, { Component } from 'react';

import { ToastContainer } from 'react-toastify';

class ThemeSettings extends Component {

    constructor(props) {
        super(props);
    }


    /*=====================
     Tap on Top
     ==========================*/
    componentWillMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll = () => {
        if (document.documentElement.scrollTop > 600) {
            document.querySelector(".tap-top").style = "display: block";
        } else {
            document.querySelector(".tap-top").style = "display: none";
        }
    }
    clickToTop() {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    }

    render() {
        let tap_to_top = { display: 'none' }

        return (
            <div>
                <div className="tap-top" onClick={this.clickToTop} style={tap_to_top}>
                    <div>
                        <i className="fa fa-angle-double-up"></i>
                    </div>
                </div>

                <ToastContainer />
            </div>
        );
    }
}

export default ThemeSettings;
