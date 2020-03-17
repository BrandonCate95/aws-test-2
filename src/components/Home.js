import React from 'react'
import { Link } from 'react-router-dom'
import UserSignInBtnGrp from './UserSignInBtnGrp'

class Home extends React.Component {  
    render() {
      return (
        <div className="App">
          <Link to="/">Home</Link>
          <Link to="/S3">S3 test page</Link>
          <Link to="/private">Private</Link>
          <header className="App-header">
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.  
          </p>
          <UserSignInBtnGrp />
        </div>
      );
    }
  }
  
  export default Home;