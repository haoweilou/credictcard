import React from 'react'

const Frontcard = () => {
    return (
        <div className="card" id="front" style={{display:"block"}}>
            <div className="cardElementWrapper cardIssuBank" id="issueBank">
                issue Bank
            </div>
            <div className="cardElementWrapper cardLogo">
                <img src="/cardLogo/mastercard.png" alt="" id="cardlogo" />
            </div>
            <div className="cardElementWrapper cardNumber">
                <div className="cardLabel">Card Number</div>
                <div className="cardValue" id="displayCardNumber">&nbsp;</div>
            </div>

            <div className="cardElementWrapper cardName">
                <div className="cardLabel">Cardholder Name</div>
                <div className="cardValue" id="displayCardName">&nbsp;</div>
            </div>

            <div className="cardElementWrapper expiration">
                <div className="cardLabel">Expiration</div>
                <div className="cardValue" id="displayExpiration">MM/YY</div>
            </div>
        </div>
    )
}

export default Frontcard
