import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSignupRequest, isUserExists } from '../../actions/signupActions';
import { addMessage } from '../../actions/messageActions';
import TextInputField from "../common/TextInputField";

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: {},
      isLoading: false,
      invalid: false
    }
  }

  static propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addMessage: PropTypes.func.isRequired,
    isUserExists: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  isValid() {
    const { first_name, email,  password, password_confirmation} = this.state;
    let isValid = true;
    let errors = {};

    if (!first_name) {
      isValid = false;
      errors.first_name = "This is field is required";
    }

    if (!email) {
      isValid = false;
      errors.email = "This is field is required";
    }

    if (!password) {
      isValid = false;
      errors.password = "This is field is required";
    }

    if (!password_confirmation) {
      isValid = false;
      errors.password_confirmation = "This is field is required";
    }

    if (password !== password_confirmation) {
      isValid = false;
      errors.password_confirmation = "Passwords must match";
    }

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  checkUserExists = (e) => {
    const field = e.target.name;
    const val = e.target.value;
    if (val !== '') {
      this.props.isUserExists(val).then(res => {
        let errors = this.state.errors;
        let invalid;
        if (res.data.exists) {
          errors[field] = 'There is user with such ' + field;
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid });
      });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(
        () => {
          this.props.addMessage({
            type: 'success',
            text: 'You signed up successfully. Welcome!'
          });
          this.context.router.push('/');
        },
        (err) => this.setState({ errors: err.response.data, isLoading: false })
      );
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <form onSubmit={this.onSubmit}>
            <h1>Sign Up</h1>
            <TextInputField label="First Name" onChange={this.onChange} field="first_name" value={this.state.first_name} type="text" error={errors.first_name}/>
            <TextInputField label="Middle Name" onChange={this.onChange} field="middle_name" value={this.state.middle_name} type="text"/>
            <TextInputField label="Last Name" onChange={this.onChange} field="last_name" value={this.state.last_name} type="text"/>
            <TextInputField label="Email" onChange={this.onChange} field="email" value={this.state.email} type="email" error={errors.email} checkUserExists={this.checkUserExists}/>
            <TextInputField label="Password" onChange={this.onChange} field="password" value={this.state.password} type="password" error={errors.password}/>
            <TextInputField label="Password Confirmation" onChange={this.onChange} field="password_confirmation" value={this.state.password_confirmation} type="password" error={errors.password_confirmation}/>
            <div className="form-group mt-4">
              <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-lg">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

}


export default connect(null, { userSignupRequest, addMessage, isUserExists })(SignupPage);