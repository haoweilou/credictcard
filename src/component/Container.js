import React from 'react'
import './component.css'
import Form from './Form'
import Card from './Card'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

const Container = () => {
    return (
        <div className="container"> 
            <Card />
            <Form />
            <div className="signoutButton">
                <AmplifySignOut />
            </div>
        </div>
    )
}

export default withAuthenticator(Container);
