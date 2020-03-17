import React from 'react'
import { Link } from 'react-router-dom'

class UserSignUpBtn extends React.Component {
    render(){
        return(
            <Link to="/">
                Sign Up
            </Link>
        )
    }
}

export default UserSignUpBtn