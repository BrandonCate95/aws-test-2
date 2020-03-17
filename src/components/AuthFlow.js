import React from 'react'
import { Redirect } from 'react-router-dom'
import { Authenticator, SignIn, ConfirmSignUp, Greetings } from 'aws-amplify-react';
import MySignUp from './MySignUp'

class AuthFlow extends React.Component {

  state = {
    redirectToReferrer: false
  }

  handleAuthStateChange = (state) => {
    if (state === 'signedIn') {
      this.setState({ redirectToReferrer: true })
    }
  }

  render(){
    const { from } = this.props.location.state || { from: { pathname: "/" } }
    const { redirectToReferrer } = this.state    
    
    if(redirectToReferrer){
      return <Redirect to={from} />
    }

    return (
      <div>
        <Authenticator hideDefault={true} onStateChange={this.handleAuthStateChange}>
          <SignIn/>
          <MySignUp/>
          <ConfirmSignUp/>
          <Greetings/>
        </Authenticator>
      </div>
    );
  }
}

export default AuthFlow; 