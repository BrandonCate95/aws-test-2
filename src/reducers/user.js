const userInitial = {
  username: '',
  email: '',
  isSignedIn: false,
  isFetching: false,
  fetched: false,
  error: false,
}

const user = ( state = userInitial, action ) => {
    switch (action.type) {
      case 'USER_SIGNIN_START':
        return Object.assign({}, state, {
          isFetching: true,
          fetched:false,
        })        
      case 'USER_SIGNIN_SUCCESS':
        return Object.assign({}, state, {
          username: action.payload.username,
          email: action.payload.email,
          isSignedIn: true,
          isFetching: false,
          fetched: true,
          error: ''
        })
      case 'USER_SIGNIN_FAILURE':
        return Object.assign({}, state, {
          username: '',
          email: '',
          isSignedIn: false,
          error: action.error,
          isFetching: false,
          fetched:true,
        })
      case 'USER_SIGNOUT_START':
        return Object.assign({}, state, {
          isFetching: true,
          fetched:false,
        })           
      case 'USER_SIGNOUT_SUCCESS':
        return Object.assign({}, state, {
          username: '',
          email: '',
          isSignedIn: false,
          isFetching: false,
          fetched: true,
          error: ''
        })
      case 'USER_SIGNOUT_FAILURE':
        return Object.assign({}, state, {
          username: '',
          email: '',
          isSignedIn: true, //not sure how to handle this yet
          isFetching: false,
          fetched: true,
          error: action.error
        })  
      default:
        return state
    }
  }
  
  export default user