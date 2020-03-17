import React from 'react'
import UserSignInBtn from './UserSignInBtn'
import UserSignUpBtn from './UserSignUpBtn'
import UserSignOutBtn from './UserSignOutBtn'
import { connect } from 'react-redux'
import { currentUserSignOut, currentUserCheck } from '../actions'

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.user.isSignedIn,
        isFetching: state.user.isFetching,
    }
  }
  
  const mapDispatchToProps = (dispatch) => ({
    currentUserSignOut: () => {
        dispatch(currentUserSignOut())
    },
    currentUserCheck: () => {
        dispatch(currentUserCheck())
    }
  })

class UserSignInBtnGrp extends React.Component {

    componentWillMount = () => {
        if(!this.props.isSignedIn){
            this.props.currentUserCheck()
        }
    }

    render(){
        const { isSignedIn, isFetching } = this.props

        return(
            <div>

                {!isFetching && isSignedIn && 
                    <UserSignOutBtn handleSignOut={this.props.currentUserSignOut}/>
                }
                
                {!isFetching && !isSignedIn && 
                    <span>
                        <UserSignInBtn />
                        <UserSignUpBtn />
                    </span>
                }

            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserSignInBtnGrp)