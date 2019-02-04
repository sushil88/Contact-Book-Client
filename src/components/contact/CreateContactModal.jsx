import React, {Component} from 'react';
import TextInputField from "../common/TextInputField";
import {connect} from "react-redux";
import { createContact, getContact } from '../../actions/contactActions';
import PropTypes from "prop-types";
import {addMessage} from "../../actions/messageActions";


class CreateContactModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      middle_name: '',
      last_name: '',
      email_address: '',
      phone_number: '',
      errors: {},
      isLoading: false,
      invalid: false
    }
  }

  static propTypes = {
    createContact: PropTypes.func.isRequired,
    getContact: PropTypes.func.isRequired,
    addMessage: PropTypes.func.isRequired
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  isValid() {
    const { first_name, email_address,  phone_number} = this.state;
    let isValid = true;
    let errors = {};

    if (!first_name) {
      isValid = false;
      errors.first_name = "This is field is required";
    }

    if (!email_address) {
      isValid = false;
      errors.email_address = "This is field is required";
    }

    if (!phone_number) {
      isValid = false;
      errors.phone_number = "This is field is required";
    }

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  checkContactExists = (e) => {
    const field = e.target.name;
    const val = e.target.value;
    if (val !== '') {
      this.props.getContact(val).then(res => {
        let errors = this.state.errors;
        let invalid;
        if (res.data.contact.email_address) {
          errors[field] = 'There is contact with such ' + field;
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid });
      });
    }
  };

  onCreateContact = () =>{
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.createContact(this.state).then(
        (res) => {
          this.props.addMessage({
            type: 'success',
            text: 'Created contact successfully!!'
          });
        },
        (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
      );
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="modal fade" id="createModal" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Contact</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-8 col-md-offset-8">
                  <form onSubmit={this.onSubmit}>
                    <TextInputField label="First Name" onChange={this.onChange} field="first_name" value={this.state.first_name} type="text" error={errors.first_name}/>
                    <TextInputField label="Middle Name" onChange={this.onChange} field="middle_name" value={this.state.middle_name} type="text"/>
                    <TextInputField label="Last Name" onChange={this.onChange} field="last_name" value={this.state.last_name} type="text"/>
                    <TextInputField label="Email" onChange={this.onChange} field="email_address" value={this.state.email_address} type="email" error={errors.email_address} checkUserExists={this.checkContactExists}/>
                    <TextInputField label="Phone Number" onChange={this.onChange} field="phone_number" value={this.state.phone_number} type="text" error={errors.phone_number}/>
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.onCreateContact}>Create</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { addMessage, createContact, getContact })(CreateContactModal);