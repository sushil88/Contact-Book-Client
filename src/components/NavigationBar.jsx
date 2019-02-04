import React, {Component} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../actions/authActions';

class NavigationBar extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  logout = (e) => {
    e.preventDefault();
    this.props.logout();
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const loggenIn = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/contacts">My contacts</Link></li>
        <li><button className="btn btn-light" onClick={this.logout}>Logout</button></li>
      </ul>
    );

    const loggedOut = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/signup">Sign up</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    );

    return (
      <nav className="navbar navbar-default bg-light">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Contact Book</Link>
          </div>
          <div>
            { isAuthenticated ? loggenIn : loggedOut }
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
};

export default connect(mapStateToProps, { logout })(NavigationBar);
