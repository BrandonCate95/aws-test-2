import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import PrivateRoute from './containers/PrivateRoute'

import Home from './components/Home'
import AuthFlow from './components/AuthFlow'
import S3 from './components/S3'

import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify';
import { ListEvents } from './Queries/ListEvents'
import { CreateEvent } from './Mutations/CreateEvent'
import { EditEvent } from './Mutations/EditEvent';
import { GetEvent } from './Queries/GetEvent'

import aws_exports from './aws-exports';
Amplify.configure(aws_exports); 

const PrivatePage = () => (
  <div>
    'hello this is the private page!'
  </div>
);

class App extends React.Component {

  onLoadFunc = async () => {
    const allEvents = await API.graphql(graphqlOperation(ListEvents)).catch(err => console.log(err));
    console.log(allEvents)
  }

  userAuthCheck = async () => {
    const auth = await Auth.currentCredentials().then(obj => {return obj.authenticated})
    return auth
  }

  getUsername = async () => {
    const username = await Auth.currentUserInfo().then(obj => {return obj.username})
    return username
  }

  createEvent = async () => {
    // Mutation
    const eventDetails = {
      //authlevel: 'private',
      name: 'cognito auth test 2',
      when: '8:00pm 000',
      where: 'Ballroom 000 2',
      description: 'cognito auth test 2',
    };

    const auth = await this.userAuthCheck()
    if(auth){
      console.log('signed in')
      const username = await this.getUsername()

      Amplify.configure({
        API: {
          graphql_headers: async () => ({
            'username': username
          })
        }
      });

      const newEvent = await API.graphql(graphqlOperation(CreateEvent, eventDetails)).catch(err => console.log(err));
      console.log(newEvent);      
    }else{
      console.log('Not signed in')
    }

  }

  editEvent = async () => {
    const eventDetails = {
      id: '1fdc9243-deaf-4228-8124-071e905b2c88',
      description: 'update test 2',
    };

    const auth = await this.userAuthCheck()
    if(auth){
      console.log('signed in')
      const username = await this.getUsername()

      Amplify.configure({
        API: {
          graphql_headers: async () => ({
            'username': username
          })
        }
      });

      const newEvent = await API.graphql(graphqlOperation(EditEvent, eventDetails)).catch(err => console.log(err));
      console.log(newEvent);      
    }else{
      console.log('Not signed in')
    }
  }

  getEvent = async () => {

    const username = await this.getUsername()

    Amplify.configure({
      API: {
        graphql_headers: async () => ({
          'username': username
        })
      }
    });
    const event = await API.graphql(graphqlOperation(GetEvent)).catch(err => console.log(err));
    console.log(event);          
  }

  render() {
    //this.onLoadFunc()
    //this.getUser()
    //this.createEvent()
    //this.editEvent()
    this.getEvent()
    return (
        <Router>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/signin" component={AuthFlow}/>
              <Route path="/S3" component={S3}/>
              <PrivateRoute path="/private" component={PrivatePage}/>
            </Switch>
        </Router>
    );
  }
}

export default App;
