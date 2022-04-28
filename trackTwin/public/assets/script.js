//Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getDatabase, ref, set,get,onValue } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
// Import the functions you need from the SDKs you need
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";

  // TODO: Add SDKs for Firebase products that you want to use

  // https://firebase.google.com/docs/web/setup#available-libraries


  // Your web app's Firebase configuration

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  const firebaseConfig = {

    apiKey: "AIzaSyD9u7-AjvZM8NF94mX0b2zN_u5VH2kgmuQ",

    authDomain: "mindgameprojectdemo.firebaseapp.com",

    databaseURL: "https://mindgameprojectdemo-default-rtdb.firebaseio.com",

    projectId: "mindgameprojectdemo",

    storageBucket: "mindgameprojectdemo.appspot.com",

    messagingSenderId: "349822043800",

    appId: "1:349822043800:web:13233c9a9fa8e76b5172ed",

    measurementId: "G-K7N1Q36C0J"

  };


  // Initialize Firebase

  const app = initializeApp(firebaseConfig);

  const analytics = getAnalytics(app);

//write the data
function writeData(patternValue,levelValue,score){
const db = getDatabase(app);
set(ref(db,`score/pattern-${patternValue}/`),{
  pattern: patternValue,
  complexity: levelValue,
  best: score
});

}
//read the data
function readData(val){
let high,pat;
const db = getDatabase(app); ;
onValue(ref(db, `score/pattern-${val}`), (snapshot) => {
   high = snapshot.val().best;
   pat  = snapshot.val().pattern;
  if(pat== val)
      bestMove.innerText=high;
})
}

const playButton = document.querySelector('.play_button');
const hide = document.querySelector('.wrapper');
const home = document.querySelector('.home_section');
const playAgain = document.querySelector('.again');
const bestMove = document.querySelector('.bmoves span');
const timeTag = document.querySelector(".time span");
const victory = document.querySelector(".sucess");
const lose = document.querySelector(".lost");
hide.classList.add("hide");
playAgain.classList.add("hide");
playButton.addEventListener('click', function(){

let maxTime;
let timeRem = maxTime;
let turn = 0;
let pairCard = 0;
let disable = false;
let start = false;
let firstCard, secondCard, timer,moves=100;
    hide.classList.remove("hide");
    home.classList.add('hide');
    home.classList.add('hide');
    playAgain.classList.remove("hide");
const patternSelector = document.getElementById('pattern');
const patternValue = patternSelector.options[patternSelector.selectedIndex].value;
const levelSelector = document.getElementById('complexity');
const levelValue = levelSelector.options[levelSelector.selectedIndex].value; 
const list = document.querySelector('.cards');
const overlay = document.querySelector('.overlay');
const timeUpBox = document.querySelector('.alert-fail');
const successBox= document.querySelector('.alert');

if(!start)
{
        const db = getDatabase(app); 
	onValue(ref(db, `score/pattern-${patternValue}`), (snapshot) => {
        if(snapshot.val())
        {
		if(snapshot.val().pattern == patternValue) 
		bestMove.innerText  = snapshot.val().best;
        }
	});

}

for(let i=0;i<patternValue;i++){
 list.innerHTML += `<li class="card">
                    <div class="view front-view">
                        <img src="./assets/que_icon.svg" alt="icon">
                     </div>
                     <div class="view back-view">
                        <img src="./assets/img-${i%(patternValue/2)}.png" alt="card-img">
                     </div>
                     </li>`;

}
const cards = document.querySelectorAll(".card");
const flipsTag = document.querySelector(".flips b");
const refreshBtn = document.querySelector(".details button");

if(patternValue == 36 )
{
if(levelValue=="E")
  {timeTag.innerHTML="<b>60</b>";maxTime=150;}
if(levelValue=="M")
  {timeTag.innerHTML="<b>45</b>";maxTime=120;}
if(levelValue=="A")
  {timeTag.innerHTML="<b>30</b>";maxTime=90;}
}
if(patternValue == 30 )
{
if(levelValue=="E")
  {timeTag.innerHTML="<b>60</b>";maxTime=120;}
if(levelValue=="M")
  {timeTag.innerHTML="<b>45</b>";maxTime=100;}
if(levelValue=="A")
  {timeTag.innerHTML="<b>30</b>";maxTime=80;}
}
if(patternValue <= 20 && patternValue >16)
{
if(levelValue=="E")
  {timeTag.innerHTML="<b>60</b>";maxTime=80;}
if(levelValue=="M")
  {timeTag.innerHTML="<b>45</b>";maxTime=60;}
if(levelValue=="A")
  {timeTag.innerHTML="<b>30</b>";maxTime=45;}
}
if(patternValue >= 12 && patternValue <=16)
{
if(levelValue=="E")
  {timeTag.innerHTML="<b>60</b>";maxTime=60;}
if(levelValue=="M")
  {timeTag.innerHTML="<b>45</b>";maxTime=45;}
if(levelValue=="A")
  {timeTag.innerHTML="<b>30</b>";maxTime=30;}
}
if(patternValue <= 10 && patternValue >=4)
{
if(levelValue=="E")
  {timeTag.innerHTML="<b>60</b>";maxTime=45;}
if(levelValue=="M")
  {timeTag.innerHTML="<b>45</b>";maxTime=30;}
if(levelValue=="A")
  {timeTag.innerHTML="<b>30</b>";maxTime=20;}
}

if(patternValue == 6){
cards.forEach((card) => {
card.setAttribute("style","cursor: pointer;position: relative;perspective: 1000px;transform-style: preserve-3d;height: calc(100% / 2 - 10px);width: calc(100% / 3  - 10px);");});
}
if(patternValue == 8){
cards.forEach((card) => {
card.setAttribute("style","cursor: pointer;position: relative;perspective: 1000px;transform-style: preserve-3d;height: calc(100% / 2 - 10px);width: calc(100% / 4  - 10px);");});
}
if(patternValue == 12){
cards.forEach((card) => {
card.setAttribute("style","cursor: pointer;position: relative;perspective: 1000px;transform-style: preserve-3d;height: calc(100% / 3 - 10px);width: calc(100% / 4  - 10px);");});
}
if(patternValue == 16){
cards.forEach((card) => {
card.setAttribute("style","cursor: pointer;position: relative;perspective: 1000px;transform-style: preserve-3d;height: calc(100% / 4 - 10px);width: calc(100% / 4  - 10px);");});
}
if(patternValue == 20){
cards.forEach((card) => {
card.setAttribute("style","cursor: pointer;position: relative;perspective: 1000px;transform-style: preserve-3d;height: calc(100% / 5 - 10px);width: calc(100% / 4  - 10px);");});
}
if(patternValue == 30){
cards.forEach((card) => {
card.setAttribute("style","cursor: pointer;position: relative;perspective: 1000px;transform-style: preserve-3d;height: calc(100% / 6 - 10px);width: calc(100% / 5  - 10px);");});
}
if(patternValue == 36){
cards.forEach((card) => {
card.setAttribute("style","cursor: pointer;position: relative;perspective: 1000px;transform-style: preserve-3d;height: calc(100% / 6 - 10px);width: calc(100% / 6  - 10px);");});
}


function initTimer() {
    if(timeRem <= 0) {
        timeUpBox.classList.remove('hide')
        overlay.classList.remove('hide')
        return clearInterval(timer);
    }
    timeRem--;
    timeTag.innerText = timeRem;
}

function turnCard({target: clickedCard}) {
    if(!start) {
        start = true;
        timer = setInterval(initTimer, 1000);
    }
    if(clickedCard !== firstCard && !disable && timeRem > 0) {
        turn++;
        flipsTag.innerText = turn;
        clickedCard.classList.add("flip");
        if(!firstCard) {
            return firstCard = clickedCard;
        }
         secondCard= clickedCard;
        disable = true;
        let firstCardImg = firstCard.querySelector(".back-view img").src,
        secondCardImg = secondCard.querySelector(".back-view img").src; 
        pairCards(firstCardImg, secondCardImg);
       
    }
        
}
function mixCard() {
     successBox.classList.add('hide');
     overlay.classList.add('hide');
     timeUpBox.classList.add('hide')
    timeRem = maxTime;
    turn = pairCard = 0;
    firstCard = secondCard = "";
    clearInterval(timer);
    timeTag.innerText = timeRem;
    flipsTag.innerText = turn;
    disable = start = false;

    let arr = [];
    for(let i=0;i<patternValue;i++)
      { 
        arr.push(i%(patternValue/2));
        }
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, index) => {
        card.classList.remove("flip");
        card.classList.remove("hidden");
        let imgTag = card.querySelector(".back-view img");
        setTimeout(() => {
            imgTag.src = `assets/img-${arr[index]}.png`;
        }, 500);
        card.addEventListener("click", turnCard);
    });
}
function delay(firstCard,secondCard){
         setTimeout(() => {
        firstCard.classList.add("hidden");
        secondCard.classList.add("hidden");
        }, 700);
}
function pairCards(pic1, pic2) {
    if(pic1 === pic2) {
        delay(firstCard,secondCard);
        pairCard++;
        if(pairCard === (patternValue/2) && timeRem > 0) {  
             setTimeout(() => {
                successBox.classList.remove('hide');
                overlay.classList.remove('hide');
            }, 500);
              if(turn <= bestMove.innerText || bestMove.innerText ==0){ 
               readData(patternValue);
               writeData(patternValue,levelValue,turn);
                }  
               return clearInterval(timer);

        }
        firstCard.removeEventListener("click", turnCard);
        secondCard.removeEventListener("click", turnCard);
        firstCard = secondCard = "";
        return disable=false;
    }

    setTimeout(() => {
        firstCard.classList.add("shake");
        secondCard.classList.add("shake");
    }, 400);

    setTimeout(() => {
        firstCard.classList.remove("shake", "flip");
        secondCard.classList.remove("shake", "flip");
        firstCard = secondCard = "";
        disable = false;
    }, 1200);
}



mixCard();

refreshBtn.addEventListener("click", mixCard);
victory.addEventListener("click", mixCard);
lose.addEventListener("click", mixCard);
cards.forEach(card => {
    card.addEventListener("click", turnCard);
});
})






