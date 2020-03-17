import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { currentUserCheck } from '../actions'

const mapStateToProps = (state) => {
  return {
      isSignedIn: state.user.isSignedIn,
      fetched: state.user.fetched,   
  }
}

const mapDispatchToProps = (dispatch) => ({
  currentUserCheck: (res) => {
      dispatch(currentUserCheck(res))
  }
})

class PrivateRoute extends React.Component {

  componentWillMount = () => {
    this.props.currentUserCheck()
  }

  render() {
     const {component: Component, fetched, isSignedIn, ...rest} = this.props;

     return(
      <Route
        {...rest}
        render={(props) => !fetched 
          ? <div>loading</div>
          : isSignedIn
            ? <Component {...props} />
            : <Redirect to={{pathname: '/signin', state: {from: props.location}}} />
        }
      />
    )
  }
}
 
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PrivateRoute)