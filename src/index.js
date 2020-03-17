import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'

import { Auth } from 'aws-amplify'
import AWSAppSyncClient  from 'aws-appsync'
import { Rehydrated } from 'aws-appsync-react'
import { ApolloProvider } from 'react-apollo'

import awsmobile from './aws-exports'

const client = new AWSAppSyncClient ({
    url: awsmobile.aws_appsync_graphqlEndpoint,
    region: awsmobile.aws_appsync_region,
    auth: {
        type: awsmobile.aws_appsync_authenticationType,
        credentials: () => Auth.currentCredentials(),
    }
})

const loggerMiddleware = createLogger()

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
)

const WithProvider = () => (
    <ApolloProvider client={client}>
        <Rehydrated>
            <Provider store={store}>
                <App />
            </Provider>
        </Rehydrated>
    </ApolloProvider>
) 

ReactDOM.render(<WithProvider />, document.getElementById('root'));
registerServiceWorker();
