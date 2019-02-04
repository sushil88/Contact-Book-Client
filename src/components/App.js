import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import MessageList from './message/MessageList';

class App extends Component {
  render() {
    return (
        <div className="container" id="root">
            <NavigationBar />
            <MessageList />
            {this.props.children}
        </div>
    );
  }
}

export default App;
