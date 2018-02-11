import React, { Component } from 'react';
import { Header } from '../../components/header';

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <div className="content-wrap">
          <div className="container-fluid text-center">    
            <div className="row content">
              <div className="col-md-10 text-left  col-md-offset-1"> 
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
