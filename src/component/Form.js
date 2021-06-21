import React, { useState, useEffect } from 'react';
import { updateCVV, updateCardName, updateExpire, displayFront, displayBack, updateDisplayCard } from './Card'
import { API } from 'aws-amplify';
import { createTodo, deleteTodo} from '../graphql/mutations';
import { listTodos } from '../graphql/queries';
import { checkCard, getCardType, validCard } from './Cardnumber';


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

    const displayErrorMessage = (msg) => {
        var errorArea =  document.getElementById("errorMsg")
        if (errorArea.innerHTML === "&nbsp;") {
            errorArea.innerHTML = msg;
        }
        setTimeout(function () {
            if (errorArea.innerHTML !== "&nbsp;") {
                errorArea.innerHTML = "&nbsp;";
            }
        }, 2000);
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
        if(!number){
            displayErrorMessage("Please enter a valid number card number");
            return;
        } 
        if(getCardType(number)==="" || !validCard()){
            displayErrorMessage("Invalid card type");
            return;
        }
        if(!name){
            displayErrorMessage("Please enter a valid card holder name");
            return;
        }
        if(!expire){
            displayErrorMessage("Please enter a valid expiration");
            return;
        }
        var year = 2000+parseInt(expire.split("/")[1]);
        var month = parseInt(expire.split("/")[0]);
        var today = new Date();
        var currYear = today.getFullYear();
        var currMonth = today.getMonth();
        if(year<currYear || (year === currYear && month-1 < currMonth)){
            displayErrorMessage("Card is expired! Select another card");
            return;
        }


        if(!cvv){
            displayErrorMessage("Please enter a valid cvv code");
            return;
        }

        if(carExsit(number)){
            displayErrorMessage("Card exits");
            return;
        }

        API.graphql({query:createTodo,variables:{input:data}})
        getList();
        checkCard();
        displayErrorMessage("Card saved");
        window.location.reload();

    }

    function clearForm() {
        document.getElementById("cardName").value = "";
        document.getElementById("cardNumber").value = "";
        document.getElementById("expireYear").value = "Year";
        document.getElementById("expireMonth").value = "expireMonth";
        document.getElementById("cvv").value = "";
    }

    function removeCreditcard() {
        var number = checkCard();
        if(!carExsit(number)){
            displayErrorMessage("Card not exist in system");
            return;
        }
        var id = getCardByNumber(number).id;
        try{
            API.graphql({ query: deleteTodo, variables: { input: { id } }});
        }
        catch (error) {
            console.log(error);
        }
        const removedArray = creditcards.filter(creditcard => creditcard.id !== id);
        setCreditcards(removedArray);
        clearForm();
    }

    const getCardByNumber = (number) => {
        for (let index = 0; index < creditcards.length; index++) {
            const creditcard = creditcards[index];
            if(number === creditcard['number']){return creditcard;}
        }
        return null;
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
        document.getElementById("cardName").value=data['name'];
        document.getElementById("cardNumber").value=data['number'];
        document.getElementById("cvv").value=data['cvv'];
        document.getElementById("expireMonth").value= parseInt(data['expire'].split("/")[0]);
        document.getElementById("expireYear").value=2000+parseInt(data['expire'].split("/")[1]);
        checkCard();
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

                <div className="remove" id="remove" onClick={removeCreditcard} >
                    <span>
                        Remove
                    </span>
                </div>

                <div className="erroMessage" id="errorMsg">
                    &nbsp;
                </div>
            </div>
        </div>

    )
}

export default Form
