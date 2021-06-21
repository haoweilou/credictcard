import React from 'react'

const Backcard = () => {
    return (
        <div className="card" id="back" style={{ display: "none" }}>
            <div className="cardElementWrapper" style={{ width: "100%" }}>
                <div style={{ width: '100%', height: "34px", background: "black", position: 'fixed', left: "0", top: "15%" }}></div>
            </div>

            <div className="cardElementWrapper signitureWrapper">
                <div className="cardSigniture" id="cardSigniture"></div>
                <div className="cvv"  id="cvvArea">
                </div>
            </div>
        </div>
    )
}

export default Backcard
