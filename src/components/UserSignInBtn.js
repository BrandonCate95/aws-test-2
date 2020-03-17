import React from 'react'
import { Link } from 'react-router-dom'

class UserSignInBtn extends React.Component {
    render(){
        return(
            <Link to="/signin">
                Sign In
            </Link>
        )
    }
}

export default UserSignInBtn