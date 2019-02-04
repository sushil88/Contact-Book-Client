import React, {Component} from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { search, deleteContact} from '../../actions/contactActions';
import Pagination from '../pagination/Pagination';
import CreateContactModal from './CreateContactModal'
import UpdateContactModal from './UpdateContactModal'

class ContactPage extends Component {

  static propTypes = {
    query: PropTypes.string,
    page: PropTypes.number,
    search: PropTypes.func.isRequired,
    deleteContact: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      contacts: [],
      totalContacts: 0,
      errors: {},
      contactToUpdate: {},
      page: 1,
      pageLimit: 10
    };
  }

  static getDerivedStateFromProps(props, s) {
    if (props.query !== s.query || props.page !== s.page) {
      return {
        query: props.query || s.query,
        page: props.page || s.page
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, s) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page){
      this.searchContacts();
    }
  }

  componentDidMount() {
    $('#createModal').on('shown.bs.modal', function () {});
    $('#updateModal').on('shown.bs.modal', function () {});
    this.searchContacts();
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log("onSubmit");
    const query = {};
    query.page = this.state.page;
    if (this.state.query) {
      query.query = this.state.query;
    }
    const route = { pathname: "/contacts/", query };
    if (!this.context.router.isActive(route)) {
      this.context.router.push(route);
    }
  };

  searchContacts = () => {
    console.log("searchContacts");
    this.setState({ errors: {}, isLoading: true });
    this.props.search(this.state).then(
      (res) => this.setState({contacts: res.data.contacts, totalContacts:res.data.contacts.length, isLoading: false}),
      (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
    );
  };

  onChange = (e) => {
    this.setState({ query : e.target.value });
  };

  onEditClick = (e) => {
    const contactToUpdate = this.state.contacts.find((contact) => {return contact.id === parseInt(e.target.id)});
    this.setState({
      contactToUpdate
    });
  };


  setPage = (page) => {
    const query = { page };
    if (this.state.query) {
      query.query = this.state.query;
    }
    const route = { pathname: "/contacts/", query };
    if (!this.context.router.isActive(route)) {
      this.context.router.push(route);
    }
  };

  onDeleteContact = (e) => {
    this.setState({ errors: {}, isLoading: true });
    this.props.deleteContact(e.target.id).then(
      (res) => this.searchContacts(),
      (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
    );
  };

  renderPagination = () => {
    if (this.state.totalContacts > this.state.pageLimit) {
      return (
        <div className="pagination-container clearfix col-12 px-0">
          <div className="pull-left my-1">
            <p>Showing {this.state.page * this.state.pageLimit - this.state.pageLimit + 1}&nbsp;
              to {this.state.page * this.state.pageLimit > this.state.totalContacts ? this.state.totalContacts : this.state.page * this.state.pageLimit}&nbsp;
              of {this.state.totalContacts} items
            </p>
          </div>
          <div className="pull-right">
            <Pagination page={ this.state.page } count={ this.state.totalContacts }
                        limit={ this.state.pageLimit } setPage={ this.setPage }/>
          </div>
        </div>
      );
    }
  };

  renderContacts = () => {
    if (!this.state.contacts.length) {
      return <text className="font-italic text-dark">No contacts found!!</text>
    }
    return (
      <table className="table table-responsive table-striped">
        <tbody>
        <tr>
          <th></th>
          <th>First Name</th>
          <th>Middle Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th></th>
        </tr>
        {
          this.state.contacts.map((contact) => {
            return (
              <tr key={contact.id}>
                <td><i className="fas fa-times text-danger" onClick={this.onDeleteContact} id={contact.id}></i></td>
                <td>{contact.first_name}</td>
                <td>{contact.middle_name}</td>
                <td>{contact.last_name}</td>
                <td>{contact.email_address}</td>
                <td>{contact.phone_number}</td>
                <td><i className="fas fa-edit" data-toggle="modal" data-target="#updateModal" id={contact.id} onClick={this.onEditClick}></i></td>
              </tr>)
          })
        }
        </tbody>
      </table>
    );
  };

  render() {
    const { query, errors } = this.state;
    return (
      <div>
        <div className="row mt-5">
          <div className="col-md-8 col-md-offset-8">
            <form>
              <div className="input-group">
                <input type="text"
                       placeholder="Search by name or email"
                       value={query}
                       id="search"
                       name="query"
                       className="form-control"
                       onChange={this.onChange}/>
                <span className="input-group-btn ml-3">
                  <button onClick={this.onSubmit} className="btn btn-primary">Search</button>
                </span>
              </div>
            </form>
            { errors.form && <div className="alert alert-danger">{errors.form}</div> }
          </div>
          <div className="col-md-4 col-md-offset-4">
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#createModal">
              Create Contact
            </button>
          </div>
        </div>
        <div className="row mt-5">
          {
            this.renderContacts()
          }
          {
            this.renderPagination()
          }
        </div>
        <CreateContactModal/>
        {
          this.state.contactToUpdate && this.state.contactToUpdate.id ? <UpdateContactModal contact={this.state.contactToUpdate}/> : ""
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    query: state.query,
    page: state.page
  }
};

export default connect(mapStateToProps, { search, deleteContact })(ContactPage);