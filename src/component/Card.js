import React from 'react'
import "./card.css"
import Frontcard from './Frontcard'
import Backcard from './Backcard'
import { getCardType } from './Cardnumber'

const CARD_IMAGE = {
    "master":'/cardLogo/master.png',
    "visa":'/cardLogo/visa.png',
    "amex":'/cardLogo/amex.png',
    "discover":'/cardLogo/discover.png',
    "dinner-club":'/cardLogo/dinners-club.png',
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

const updateDisplayCard = () => {
    updateCardNumber();
    updateCardName();
    updateExpire();
    updateCVV();
    updateLogo();
}

const updateCardName = () => {
    var string = document.getElementById("cardName").value;
    if(string===""){
        string = "&nbsp";
    }
    var area = document.getElementById("displayCardName");
    area.innerHTML = string;
    var signiture = document.getElementById("cardSigniture");
    signiture.innerHTML = string;
    return string;
}

const updateCardNumber = () => {
    var number = document.getElementById("cardNumber").value;
    var area = document.getElementById("displayCardNumber");
    area.innerHTML = number;
}

const updateExpire = () => {
    var month = document.getElementById("expireMonth").value;
    if(month===""){month="MM";}
    else{month=month.padStart(2, "0");}
    var year = document.getElementById("expireYear").value;
    if(year===""){year="YY";}
    else{year-=2000;}
    var area = document.getElementById("displayExpiration");
    var value = month + "/" + year;
    area.innerHTML = value;
    return value;
}

const updateLogo = () => {
    var area = document.getElementById("cardlogo");
    area.src = CARD_IMAGE[getCardType()];
}

const updateCVV = () => {
    var cvvInputArea = document.getElementById("cvv");
    var cvv = cvvInputArea.value;
    cvv = cvv.replace(/[^0-9]/g,"");
    cvv = cvv.substring(0,4);
    cvvInputArea.value = cvv;
    var area = document.getElementById("cvvArea");
    area.innerHTML = cvv;
    return cvv;
}

const displayFront = () => {
    var front = document.getElementById("front");
    var back = document.getElementById("back");
    front.style.display = "block";
    back.style.display = "none";
}

const displayBack = () => {
    var front = document.getElementById("front");
    var back = document.getElementById("back");
    front.style.display = "none";
    back.style.display = "block";
}

const flipCard = () => {
    var isFront = document.getElementById("front").style.display === "block";
    isFront?displayBack():displayFront();
}

const Card = () => {
    return (
        <div style={{position: 'fixed',left: '50%',right: '50%'}} onClick={flipCard} id="cardWrapper">
            <Frontcard />
            <Backcard />
        </div>
    )
}

export default Card
export {updateDisplayCard,updateCardName,updateExpire,displayFront,displayBack,updateCVV}
