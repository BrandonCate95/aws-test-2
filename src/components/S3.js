import React from 'react'
import Amplify, { Storage } from 'aws-amplify';
import aws_exports from '../aws-exports';
Amplify.configure(aws_exports);

class S3 extends React.Component {

    uploadPublic = () => {
        Storage.get('test.txt')
            .then(result => console.log(result))
            .catch(err => console.log(err));
    }

    render(){
        return(
            <div>
                S3 stuff page
                <button onClick={this.uploadPublic}>
                    Upload Public
                </button>
            </div>            
        )
    }

}

export default S3