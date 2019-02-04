import React from 'react';
import PropTypes from "prop-types";

export default class Message extends React.Component {

  static propTypes = {
    message: PropTypes.object.isRequired,
    deleteMessage: PropTypes.func.isRequired
  };

  onClick = () => {
    this.props.deleteMessage(this.props.message.id);
  };

  render() {
    const { type, text } = this.props.message;
    return (
      <div className={type === "success" ? "alert alert-success" : "alert alert-danger"}>
        <button onClick={this.onClick} className="close"><span>&times;</span></button>
        {text}
      </div>
    );
  }
}