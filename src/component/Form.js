import { checkCard } from './Cardnumber';
import { updateCVV, updateCardName, updateExpire, displayFront, displayBack, updateDisplayCard } from './Card'

//once user input their number, this function will be triggered to optimize the app
const initialFormState = {id:'', cardnumber: '', cardholdername: '',expiration:'',cvv:'' }
const Form = () => {

    var yearOption = [];
    for (let index = 2020; index < 2040; index++) {
        yearOption.push(<option key={index} value={index}>{index}</option>);
    }

    var monthOption = [];
    for (let index = 1; index <= 12; index++) {
        monthOption.push(<option key={index} value={index}>{index}</option>);
    }

    return (
        <div className="form">
            <div className="inputArea">
                <div className="inputWrapper">
                    <label htmlFor="cardName">Cardholder Name</label>
                    <input
                        type="text"
                        id="cardName"
                        onChange={updateCardName}
                    />
                </div>

                <div className="inputWrapper" style={{position:"relative"}} onFocus={displayFront}>
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                        type="text"
                        id="cardNumber"
                        onChange={checkCard}
                    />
                    <span className="cardType" id="cardType"></span>
                </div>

                <div className="gridWrapper inputWrapper">
                    <label htmlFor="expireYear">Expire Time</label>
                    <div></div>
                    <label htmlFor="cvv">CVV</label>
                    <select name="" id="expireYear" defaultValue="Year" onChange={updateExpire} onFocus={displayFront}>
                        <option value="">Year</option>
                        {yearOption}
                    </select>

                    <select name="" id="expireMonth" defaultValue="Month" onChange={updateExpire} onFocus={displayFront}>
                        <option value="">Month</option>
                        {monthOption}
                    </select>

                    <input
                        type="text"
                        id="cvv"
                        onFocus={displayBack}
                        onChange={updateCVV}
                    />
                </div>

                <div className="inputWrapper">
                    <label htmlFor="cardName">Saved Card</label>
                    <select name="previousCard" id="previousCard" onChange={updateDisplayCard}>
                        <option value="">Cards</option>
                    </select>
                </div>
                
                <div className="submit" id="submit">
                    <span>
                        Submit
                    </span>
                </div>
            </div>
        </div>

    )
}

export default Form
