import { Auth } from 'aws-amplify'

const valTrue = true

export const userSignInStart = () => ({
    type: 'USER_SIGNIN_START',
    isFetching: valTrue,
})

export const userSignInSuccess = (payload) => ({
    type: 'USER_SIGNIN_SUCCESS',
    payload
})

export const userSignInFailure = (error) => ({
    type: 'USER_SIGNIN_FAILURE',
    error
})

export function currentUserCheck() {
    return dispatch => {
        dispatch(userSignInStart())
        return Auth.currentUserInfo()
            .then( (res) => dispatch(userSignInSuccess(res)) )
            .catch( (err) => dispatch(userSignInFailure(err)) )
    }
}

export const userSignOutStart = () => ({
    type: 'USER_SIGNOUT_START',
    isFetching: valTrue,
})

export const userSignOutSuccess = () => ({
    type: 'USER_SIGNOUT_SUCCESS'
})

export const userSignOutFailure = (error) => ({
    type: 'USER_SIGNOUT_ FAILUER',
    error
})

export function currentUserSignOut() {
    return dispatch => {
        dispatch(userSignOutStart())
        return Auth.signOut()
            .then(() => dispatch(userSignOutSuccess()) )
            .catch(err => dispatch(userSignOutFailure(err)) )
    }
}
