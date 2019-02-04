import React, {Component} from 'react';
import PropTypes from "prop-types";
import Message from './Message';
import { connect } from 'react-redux';
import { deleteMessage } from '../../actions/messageActions';

class MessageList extends Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    deleteMessage: PropTypes.func.isRequired
  };

  render() {
    return (
      <div>
        {this.props.messages.map(message => <Message key={message.id} message={message} deleteMessage={this.props.deleteMessage} />)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages
  }
};

export default connect(mapStateToProps, { deleteMessage })(MessageList);