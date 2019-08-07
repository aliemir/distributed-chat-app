import React, { Component } from 'react';
import MessageList from './components/MessageList';
import MessageBox from './components/MessageBox';
import Header from './components/Header';
import firebase from 'firebase';

class App extends Component {
  constructor(props) {
    super(props);
    var config = {
      apiKey: 'AIzaSyCT4Oy7W0hpEKvfJSAmbGA2GxxEAI3k-kQ',
      authDomain: 'distributed-cah.firebaseapp.com',
      databaseURL: 'https://distributed-cah.firebaseio.com',
      projectId: 'distributed-cah',
      storageBucket: '',
      messagingSenderId: '212642959044',
      appId: '1:212642959044:web:7ada863b9f14888a'
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
