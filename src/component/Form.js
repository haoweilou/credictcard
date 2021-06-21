import { checkCard } from './Cardnumber';
import { updateCVV, updateCardName, updateExpire, displayFront, displayBack, updateDisplayCard } from './Card'
import { API } from 'aws-amplify';
import { createTodo, deleteTodo} from '../graphql/mutations';
import { listTodos } from '../graphql/queries';
import React, { useState, useEffect } from 'react';


//once user input their number, this function will be triggered to optimize the app

const Form = () => {
    const [creditcards, setCreditcards] = useState([]);
    useEffect(() => {
        getList();
    }, []);

    async function getList() {
        const apiData = await API.graphql({query: listTodos });
        var items = apiData.data.listTodos.items;
        setCreditcards(items);
    }

    const saveCreditcard = () => {
        var number = checkCard();
        var cvv = updateCVV();
        var name = updateCardName();
        var expire = updateExpire();
        var data = {
            "name": name,
            "number": number,
            "expire": expire,
            "cvv": cvv
        }
        console.log(creditcards);
        console.log(getList());
        if(!number || !cvv || !name || !expire){return;}
        if(carExsit(number)){return;}

        API.graphql({query:createTodo,variables:{input:data}})
        getList();
    }

    const carExsit = (number) => {
        for (let index = 0; index < creditcards.length; index++) {
            const creditcard = creditcards[index];
            if(number === creditcard['number']){return true;}
        }
        return false;
    }

    const loadSavedCard=(e)=>{
        var value = document.getElementById("previousCard").value;
        if(value === "card"){return;}
        var data = JSON.parse(value);
        console.log(data);
        document.getElementById("cardName").value=data['name'];
        document.getElementById("cardNumber").value=data['number'];
        document.getElementById("cvv").value=data['cvv'];
        document.getElementById("expireMonth").value= parseInt(data['expire'].split("/")[0]);
        document.getElementById("expireYear").value=2000+parseInt(data['expire'].split("/")[1]);
        updateDisplayCard();
    }

    var yearOption = [];
    for (let index = 2020; index < 2040; index++) {
        yearOption.push(<option key={index} value={index}>{index}</option>);
    }

    var monthOption = [];
    for (let index = 1; index <= 12; index++) {
        monthOption.push(<option key={index} value={index}>{index}</option>);
    }

    return (
        <div className="form" onLoad={getList}>
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
                    <select name="" 
                        id="expireYear" 
                        defaultValue="Year" 
                        onChange={updateExpire} 
                        onFocus={displayFront}
                    >
                        <option value="">Year</option>
                        {yearOption}
                    </select>

                    <select 
                        name="" 
                        id="expireMonth" 
                        defaultValue="Month" 
                        onChange={updateExpire} 
                        onFocus={displayFront}
                    >
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
                    <select name="previousCard" id="previousCard" onChange={loadSavedCard}>
                        <option value="card">Cards</option>
                        {
                            creditcards.map(
                                creditcard => {
                                    return (
                                        <option value= {JSON.stringify(creditcard)} className="cardOption" key={creditcard.id}>
                                            {creditcard.number}
                                        </option>
                                    )
                                }
                            )
                        }
                    </select>
                </div>
                
                <div className="submit" id="submit" onClick={saveCreditcard}>
                    <span>
                        Submit
                    </span>
                </div>
            </div>
        </div>

    )
}

export default Form
