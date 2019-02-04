import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import TextInputField from '../common/TextInputField';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      isLoading: false
    };
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    login: PropTypes.func.isRequired
  };

  isValid = () => {
    const { email, password } = this.state;

    let errors = {};

    if (!email) {
      errors.email = 'This field is required';
    }

    if (!password) {
      errors.password = 'This field is required';
    }

    if (errors.email && errors.password) {
      this.setState({ errors });
      return false
    }
    return true
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state).then(
        (res) => this.context.router.push('/contacts'),
        (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
      );
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors, email, password, isLoading } = this.state;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <form onSubmit={this.onSubmit}>
            <h1>Login</h1>
            { errors.form && <div className="alert alert-danger">{errors.form}</div> }
            <TextInputField label="Email" onChange={this.onChange} field="email" value={email} type="text"/>
            <TextInputField label="Password" onChange={this.onChange} field="password" value={password} type="password"/>
            <button className="btn btn-primary mt-3" disabled={isLoading}>Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, { login })(LoginPage);