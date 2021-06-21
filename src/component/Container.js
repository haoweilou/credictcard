import React from 'react'
import './component.css'
import Form from './Form'
import Card from './Card'

const Container = () => {
    return (
        <div className="container"> 
            <Card />
            <Form />
            <div className="signoutButton">
            </div>
        </div>
    )
}

export default Container;
