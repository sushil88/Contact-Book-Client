import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addMessage } from '../actions/messageActions';
import PropTypes from 'prop-types'

export default function(ComposedComponent) {
  class Authenticate extends Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
      addMessage: PropTypes.func.isRequired
    };

    static contextTypes = {
      router: PropTypes.object.isRequired
    };
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }

    componentDidMount() {
      if (!this.props.isAuthenticated) {
        this.props.addMessage({
          type: 'error',
          text: 'You need to login to access this page'
        });
        this.context.router.push('/login');
      }
    }

    componentDidUpdate(prevProps, prevState, snap) {
      if (!this.props.isAuthenticated) {
        this.context.router.push('/');
      }
    }
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  }

  return connect(mapStateToProps, { addMessage })(Authenticate);
}