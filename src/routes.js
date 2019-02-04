import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import WelcomePage from "./components/Welcome";
import SignupPage from "./components/signup/SignupPage";
import LoginPage from "./components/login/LoginPage";
import ContactPage from "./components/contact/ContactPage";
import requireAuth from "./utils/requireAuth";


export default (
  <Route path="/" component={App}>
    <IndexRoute component={WelcomePage} />
    <Route path="/signup" component={SignupPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/contacts" component={requireAuth(ContactPage)} />
  </Route>
);