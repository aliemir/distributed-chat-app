import React, { Component } from 'react';
import trim from 'trim';

class MessageBox extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    //this.onKeyup = this.onKeyup.bind(this);
    this.fetchJoke = this.fetchJoke.bind(this);
    this.fetchWeather = this.fetchWeather.bind(this);
    this.fetchMovie = this.fetchMovie.bind(this);
    var prefix = [
      'uzgun',
      'yakisikli',
      'serseri',
      'minik',
      'belali',
      'korkusuz',
      'deli',
      'guzel',
      'bombaci',
      'zalim',
      'efsane',
      'derbeder',
      'toksik',
      'asik',
      'yorgun',
      'cilekes'
    ];
    var noun = [
      'portakal',
      'reis',
      'kral',
      'cocuk',
      'bebe',
      'ankarali',
      'karsiyaka',
      'kedi',
      'panda',
      'mulayim',
      'tavsan',
      'hamsi',
      'cilek'
    ];
    var suffix = [
      '01',
      '16',
      '26',
      '06',
      '35',
      '1903',
      '1905',
      '1907',
      '1963',
      '00',
      '96',
      'xx'
    ];

    this.state = {
      message: '',
      username:
        prefix[Math.floor(Math.random() * prefix.length)] +
        '_' +
        noun[Math.floor(Math.random() * noun.length)] +
        '_' +
        suffix[Math.floor(Math.random() * suffix.length)]
    };
  }

  onChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  /*   onKeyup(e) {
    if (e.keyCode === 13 && trim(e.target.value) !== '') {
      this.handleSubmit(e);
    }
  } */

  fetchJoke() {
    let dbCon = this.props.db.database().ref('/messages');
    return fetch('https://icanhazdadjoke.com/', {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        dbCon.push({
          message: trim(data.joke),
          stamp: Date.now(),
          username: 'joker_bot'
        });
      });
  }

  fetchWeather() {
    let dbCon = this.props.db.database().ref('/messages');
    const city = 'eskisehir,turkey';
    const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=8dc90c22640fc62cc57f5a5c1e880105`;
    return fetch(apiCall, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        const messageString = `Weather for your city ${data.name} is ${
          data.weather[0].main
        }, ${data.weather[0].description}. It's ${Math.round(
          data.main.temp
        )} celcius degree and humidity is ${Math.round(data.main.humidity)}%.`;
        dbCon.push({
          message: trim(messageString),
          stamp: Date.now(),
          username: 'weather_bot'
        });
      });
  }

  fetchMovie() {
    let dbCon = this.props.db.database().ref('/messages');
    const page = Math.floor(Math.random() * 10) + 1;
    const movieRow = Math.floor(Math.random() * 20);
    const apiCall = `https://api.themoviedb.org/3/discover/movie?api_key=1cb7a3590fe5fa7325422676a047cc41&language=en&page=${page}&vote_average.gte=6.9`;
    return fetch(apiCall, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        const movie = data.results[movieRow];
        const messageString = `${
          movie.title
        }. This movie has an average rating of ${
          movie.vote_average
        }.  A movie about, ${movie.overview}.   `;
        dbCon.push({
          message: trim(messageString),
          stamp: Date.now(),
          username: 'movie_bot'
        });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let dbCon = this.props.db.database().ref('/messages');
    if (this.state.message[0] === '/') {
      if (this.state.message.includes('/weather')) {
        this.fetchWeather();
      } else if (this.state.message.includes('/badjoke')) {
        this.fetchJoke();
      } else if (this.state.message.includes('/movie')) {
        this.fetchMovie();
      }
    } else {
      dbCon.push({
        message: trim(this.state.message),
        stamp: Date.now(),
        username: this.state.username
      });
    }
    this.setState({
      message: ''
    });
  }

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <input
          key="message"
          disabled
          type="text"
          className="user-input"
          value={this.state.username}
        />
        <input
          type="text"
          className="text-input"
          onChange={this.onChange}
          //onKeyUp={this.onKeyup}
          value={this.state.message}
        />
        <button className="submit-button"> > </button>
      </form>
    );
  }
}

export default MessageBox;
