import React, { Component } from 'react';
import MessageList from './components/MessageList';
import MessageBox from './components/MessageBox';
import Header from './components/Header';
import firebase from 'firebase';

class App extends Component {
  constructor(props) {
    super(props);
    var config = {
      apiKey: 'api',
      authDomain: 'domain.firebaseapp.com',
      databaseURL: 'https://domain.firebaseio.com',
      projectId: 'distributed-cah',
      storageBucket: '',
      messagingSenderId: 'senderid',
      appId: 'appid'
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <div className="container">
        <Header title="distributed-chat-app" />
        <div className="message-box-wrapper">
          <MessageBox db={firebase} />
        </div>

        <div className="message-list-wrapper">
          <MessageList db={firebase} />
        </div>
        <div className="footer">
          Ali Emir Sen, Asim Ozturk, Rana Unaldi, Seda Kaynar
          <p>/weather, /badjoke, /movie</p>
        </div>
      </div>
    );
  }
}

export default App;
