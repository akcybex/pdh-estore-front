import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    let logged = localStorage.getItem('logged');
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    return (
        <Route {...rest} render={props => (
            logged ?
                <Component {...props} /> :
                <Redirect to="/pages/login" />
        )
        } />
    );
};

export default ProtectedRoute;