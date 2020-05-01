import React, {Component} from 'react';

// Custom Components
import Header from './common/headers/header';

import Footer from "./common/footers/footer";

import ThemeSettings from "../components/common/theme-settings"

class App extends Component {

    render() {
        return (
            <div>
                <Header logoName={'logo.png'}/>
                {this.props.children}
                <Footer logoName={'logo.png'}/>

                <ThemeSettings />

            </div>
        );
    }
}

export default App;
