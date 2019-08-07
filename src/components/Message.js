import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <li className="message" key={this.props.stamp}>
        <span className="message_user">{this.props.user}</span>
        <p>{this.props.message}</p>
      </li>
    );
  }
}
export default Message;
