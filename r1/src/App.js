import React, { Component } from 'react';
import './App.less';

class App extends Component {
    render() {
        return (
            <div className="App">
                <p className={'text'}>top</p>
                {this.props.children}
            </div>
        );
    }
}

export default App;
