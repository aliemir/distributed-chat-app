import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header>
        <a className="header" href="/">
          {this.props.title}{' '}
        </a>
      </header>
    );
  }
}
export default Header;
