import React, { Component } from 'react';
import Message from './Message';
import _ from 'lodash';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    let app = this.props.db.database().ref('messages');
    app.on('value', snapshot => {
      this.getData(snapshot.val());
    });
  }

  getData(values) {
    let messagesVal = values ? values : {};
    const messagesFromFirebase = Object.keys(messagesVal).map(el => {
      return {
        message: messagesVal[el].message,
        key: messagesVal[el].stamp,
        username: messagesVal[el].username
      };
    });
    let messages = _(messagesVal)
      .keys()
      .map(messageKey => {
        let cloned = _.clone(messagesVal[messageKey]);
        cloned.key = messageKey;
        return cloned;
      })
      .value();
    this.setState({
      messages: messages
    });
    const msgList = document.querySelector('.messageList');
    msgList.scrollTop = msgList.scrollHeight;
  }

  render() {
    let messageNodes = this.state.messages.reverse().map(message => {
      return (
        <Message
          key={message.stamp}
          message={message.message}
          user={message.username}
          stamp={message.stamp}
        />
      );
    });
    return <ul className="messageList">{messageNodes}</ul>;
  }
}

export default MessageList;
