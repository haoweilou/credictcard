import React from 'react'
import {displayFront, updateDisplayCard} from "./Card"
import data from "./data/cardData.json"
const CARD_LOGO = {
    "master":'<i class="fab fa-cc-mastercard"></i>',
    "visa":'<i class="fab fa-cc-visa"></i>',
    "amex":'<i class="fab fa-cc-amex"></i>',
    "discover":'<i class="fab fa-cc-discover"></i>',
    "dinner-club":'<i class="fab fa-cc-diners-club"></i>',
    "":""
}

const CARD_COLOR = {
    "master":'linear-gradient(#b21f1f,#fdbb2d)',
    "visa":'linear-gradient(#02aab0,#00cdac)',
    "amex":'linear-gradient(#667db6,#0082c8)',
    "discover":'linear-gradient(#3B4371,#3B4371)',
    "dinner-club":'linear-gradient(#003973,#E5E5BE)',
    "":""
}
//get raw card number from input
const getCardNumber = () => {
    return document.getElementById("cardNumber").value;
}

//format the number to pure number with maximum 16 digits
const getformatCardNumber = () => {
    var cardNumber = getCardNumber().replace(/[^0-9]+/g,'');
    if(cardNumber.length > 16){
        cardNumber = cardNumber.slice(0,16);
    }
    return cardNumber;
}

const getBankById = (number) => {
    for (let index = 0; index < data.length; index++) {
        const creditcardData = data[index];
        if(creditcardData['BIN'] === number){
            return creditcardData;
        }
        
    }
    return {"ISSUING_ORGANIZATION_(BANK)":""}
}

const updateIssuBank = () => {
    var cardnumber = getformatCardNumber();
    var number  = parseInt(cardnumber.substring(0,6));
    var bank = getBankById(number);
    document.getElementById("issueBank").innerHTML = bank['ISSUING_ORGANIZATION_(BANK)'];
}

const checkCard = () => {
    var inputArea =  document.getElementById("cardNumber");
    updateCardType();
    var valid = validCard();
    var color;
    valid ? color="":color="red";
    inputArea.style.color = color;
    inputArea.value = getNumberWithSpace();
    updateDisplayCard();
    updateIssuBank();
    return inputArea.value;
}   

//add space in string to make it looks better
const getNumberWithSpace = () => {
    var number = getformatCardNumber();
    return  number.replace(/(.{4})/g, '$1 ').replace(/ $/,"");
}

const getCardType = () => {
    var number = getformatCardNumber();
    var first = number[0];
    if(first === '4'){
        return 'visa';
    } else if(first === '5') {
        return 'master';
    } else if(first === '3' && number.length >= 2 && (number[1] === '4' || number[1] === '7')){
        return 'amex';
    } else if(first === '6') {
        return 'discover';
    } else if(number.startsWith("30") || number.startsWith("36") || number.startsWith("38")){
        return "dinner-club";
    }
    return ""
}

const updateCardType = () => {
    var type = getCardType();
    var displayArea = document.getElementById("cardType");
    displayArea.innerHTML = CARD_LOGO[type];
    document.getElementById("front").style.background = CARD_COLOR[type];
    document.getElementById("back").style.background = CARD_COLOR[type];
}

const validCard = () => {
    var type = getCardType();
    var number = getformatCardNumber();
    if(type==="master"){
        return number[0] === '5' && number.length === 16;
    } else if(type==="visa"){
        return number[0] === '4' && number.length >= 13 && number.length <= 16;
    } else if(type==="amex"){
        return (number.startsWith("34") || number.startsWith("37")) && number.length === 15;
    } else if(type==="discover"){
        return number[0] === '6' && number.length === 15;
    } else if(type==="dinner-club"){
        return (number.startsWith("30") || number.startsWith("36") || number.startsWith("38")) && number.length === 14;
    } 
    return false;
}

const Cardnumber = () => {
    return (
        <div className="inputWrapper" style={{position:"relative"}} onFocus={displayFront}>
            <label htmlFor="cardNumber">Card Number</label>
            <input
                type="text"
                id="cardNumber"
                onChange={checkCard}
            />
            <span className="cardType" id="cardType"></span>
        </div>
    )
}

export default Cardnumber
export {getCardType,checkCard,validCard}