///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////_______________________________________________________________________________________________________________________////
////__SAKATA DEVELOPMENT___________________________________________________________________________________________________////
////__UPDATE: V1.0.1_______________________________________________________________________________________________________////
////_______________________________________________________________________________________________________________________////
////__UPDATE NOTES:________________________________________________________________________________________________________////
////__1.New more realistic spin animation._________________________________________________________________________________////
////__2.Updated deposit button, now you can chose how much you want to deposit between 1$ to 5000$.________________________////
////__3.Added built in stop button inside spin button._____________________________________________________________________////
////__4.Added responsive web design, fixed landscape mode not responding.__________________________________________________////
////__5.Rearranged HTML,CSS & JS codes improved code quality, readability and flow.________________________________________////
////_______________________________________________________________________________________________________________________////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// დავამატოთ წითელი შავის ფუნქცია. (GAMBLE)
// დავამატოთ ბონუსი. (BONUS GAME)
// დავამატოთ მოგებული ხაზების გახაზვის ფუნქცია.
// დავამატოთ ხაზების შეცვლის ფუნქცია.


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const pressSound = new Audio("sounds/press.mp3"); // BUTTON CLICK SOUND
const coinDropSound = new Audio("sounds/coindrop.mp3"); // WIN SOUND
const spinSound = new Audio("sounds/spin.mp3"); // SPIN SOUND

let balance = 100; // SET BALANCE
let bet = 1; // SET BET
let lastWin = 0; // SET LAST WIN

let rowTimeOut1, rowTimeOut2, rowTimeOut3, rowTimeOut4, rowTimeOut5; // TO STOP SPIN ANIMATION
let winTimeOut; // TO GET INSTANT PAYOUT IF WIN - FOR STOP BUTTON

let win = false; // TO CHECK IF WIN
let symbolsContainer = []; // TO STORE SYMBOL INDEXES ON EACH SPIN
let isSpinClicked = true; //FOR SPIN/STOP BUTTON SWITCH

//UPDATE VALUE DISPLAY
update(balance);
update(bet);
update(lastWin);

//BUTTONS WITH FUNCTIONS
document.getElementById("dep-btn").addEventListener("click", depositButton); // BUTTON FOR ADD DEPOSIT
function depositButton(){
    pressSound.play();
    
    var addedMoney = prompt("Deposit of money:");
    var parsedMoney = parseFloat(addedMoney);
  
    if (!isNaN(parsedMoney)) {
      if (parsedMoney >= 1 && parsedMoney <= 5000) {
        balance += parsedMoney;
        alert("Deposit successful. New balance: " + balance + "$");
      } else {
        alert("You can deposit from $1 to $5000.");
      }
    } else {
      alert("Please enter a valid numerical value.");
    }

    update(balance);
}
document.getElementById("bet-btn").addEventListener("click", betButton); // BUTTON FOR INCREASE BET
function betButton(){
    pressSound.play();
    
    if (bet < 10) {
        bet++;
        update(bet);
    } else if (bet < 50) {
        bet += 5;
        update(bet);
    } else if (bet < 100) {
        bet += 10;
        update(bet);
    } else if (bet < 200) {
        bet += 20;
        update(bet);
    } else if (bet < 500) {
        bet += 50;
        update(bet);
    } else {
        bet = 1;
        update(bet);
    }
}
document.getElementById("spin-btn").addEventListener("click", spinButton); // BUTTON FOR START SPIN
function spinButton(){ 
    pressSound.play();

    if(balance >= bet){
        spinSound.play();
        spinSound.playbackRate = 1.2;

        balance -= bet;
        update(balance);
        animateSpin();
        generateAndPushRandomSymbols();
        chekcForWinningLines(); 
        spinStopSwitcher();

    } else {
        alert("You don't have enough credit.");
    }
}
document.getElementById("stop-btn").addEventListener("click", stopButton); // BUTTON FORA STOP SPIN
function stopButton(){
    pressSound.play();
    spinSound.pause();
    spinSound.currentTime = 0;
    
    for(var i=1; i<=15; i++){
        document.getElementById("cell-"+i).style.visibility = "visible"; 
    }
    
    clearTimeout(rowTimeOut1);
    clearTimeout(rowTimeOut2);
    clearTimeout(rowTimeOut3);
    clearTimeout(rowTimeOut4);
    clearTimeout(rowTimeOut5);
    clearTimeout(winTimeOut);
    updateLastWin();
    spinStopSwitcher();
}


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> FUNCTIONS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//

function animateSpin(){  
    for(var i=1; i<=15; i++){
        document.getElementById("cell-"+i).style.visibility = "hidden"; 
    }

    rowTimeOut1 = setTimeout(function() {
        setTimeout(function(){
            document.getElementById("cell-1").style.visibility = "visible";
        }, 60);
        setTimeout(function(){
            document.getElementById("cell-6").style.visibility = "visible";
        }, 120);
        setTimeout(function(){
            document.getElementById("cell-11").style.visibility = "visible";
        }, 180);       
    }, 180);

    rowTimeOut2 = setTimeout(function() {
        setTimeout(function(){
            document.getElementById("cell-2").style.visibility = "visible";
        }, 60);
        setTimeout(function(){
            document.getElementById("cell-7").style.visibility = "visible";
        }, 120);
        setTimeout(function(){
            document.getElementById("cell-12").style.visibility = "visible";
        }, 180); 
    }, 360);

    rowTimeOut3 = setTimeout(function() {
        setTimeout(function(){
            document.getElementById("cell-3").style.visibility = "visible";
        }, 60);
        setTimeout(function(){
            document.getElementById("cell-8").style.visibility = "visible";
        }, 120);
        setTimeout(function(){
            document.getElementById("cell-13").style.visibility = "visible";
        }, 180); 
    }, 540); 

    rowTimeOut4 = setTimeout(function() {
        setTimeout(function(){
            document.getElementById("cell-4").style.visibility = "visible";
        }, 60);
        setTimeout(function(){
            document.getElementById("cell-9").style.visibility = "visible";
        }, 120);
        setTimeout(function(){
            document.getElementById("cell-14").style.visibility = "visible";
        }, 180); 
    }, 720); 

    rowTimeOut5 = setTimeout(function() {
        setTimeout(function(){
            document.getElementById("cell-5").style.visibility = "visible";
        }, 60);
        setTimeout(function(){
            document.getElementById("cell-10").style.visibility = "visible";
        }, 120);
        setTimeout(function(){
            document.getElementById("cell-15").style.visibility = "visible";
        }, 180); 
    }, 900);
}

function generateAndPushRandomSymbols(){ 
    for(var i=1; i<=15; i++){
        const randomSymbol =  Math.floor(Math.random() * 6) + 1;
        document.getElementById("cell-"+i).style.backgroundImage = 'url("images/symbols/'+ randomSymbol +'.png")';
        symbolsContainer.push(randomSymbol); 
    }
}

function chekcForWinningLines() {
    lastWin = balance;
 
    if (symbolsContainer[0] === symbolsContainer[1] &&
        symbolsContainer[1] === symbolsContainer[2] &&
        symbolsContainer[2] === symbolsContainer[3] &&
        symbolsContainer[3] === symbolsContainer[4]) {
        win = true;
        payOutMoney(5, symbolsContainer[0]);
    } else if (symbolsContainer[0] === symbolsContainer[1] &&
               symbolsContainer[1] === symbolsContainer[2] &&
               symbolsContainer[2] === symbolsContainer[3]) {
        win = true;
        payOutMoney(4, symbolsContainer[0]);
    } else if (symbolsContainer[0] === symbolsContainer[1] &&
               symbolsContainer[1] === symbolsContainer[2]) {
        win = true;
        payOutMoney(3, symbolsContainer[0]);
    }

    if (symbolsContainer[5] === symbolsContainer[6] &&
        symbolsContainer[6] === symbolsContainer[7] &&
        symbolsContainer[7] === symbolsContainer[8] &&
        symbolsContainer[8] === symbolsContainer[9]) {
        win = true;
        payOutMoney(5, symbolsContainer[5]);
    } else if (symbolsContainer[5] === symbolsContainer[6] &&
               symbolsContainer[6] === symbolsContainer[7] &&
               symbolsContainer[7] === symbolsContainer[8]) {
        win = true;
        payOutMoney(4, symbolsContainer[5]);
    } else if (symbolsContainer[5] === symbolsContainer[6] &&
               symbolsContainer[6] === symbolsContainer[7]) {
        win = true;
        payOutMoney(3, symbolsContainer[5]);
    }

    if (symbolsContainer[10] === symbolsContainer[11] &&
        symbolsContainer[11] === symbolsContainer[12] &&
        symbolsContainer[12] === symbolsContainer[13] &&
        symbolsContainer[13] === symbolsContainer[14]) {
        win = true;
        payOutMoney(5, symbolsContainer[10]);
    } else if (symbolsContainer[10] === symbolsContainer[11] &&
               symbolsContainer[11] === symbolsContainer[12] &&
               symbolsContainer[12] === symbolsContainer[13]) {
        win = true;
        payOutMoney(4, symbolsContainer[10]);
    } else if (symbolsContainer[10] === symbolsContainer[11] &&
               symbolsContainer[11] === symbolsContainer[12]) {
        win = true;
        payOutMoney(3, symbolsContainer[10]);
    }

    if (symbolsContainer[0] === symbolsContainer[6] &&
        symbolsContainer[6] === symbolsContainer[12] &&
        symbolsContainer[12] === symbolsContainer[8] &&
        symbolsContainer[8] === symbolsContainer[4]) {
        win = true;
        payOutMoney(5, symbolsContainer[0]);
    } else if (symbolsContainer[0] === symbolsContainer[6] &&
               symbolsContainer[6] === symbolsContainer[12] &&
               symbolsContainer[12] === symbolsContainer[8]) {
        win = true;
        payOutMoney(4, symbolsContainer[0]);
    } else if (symbolsContainer[0] === symbolsContainer[6] &&
               symbolsContainer[6] === symbolsContainer[12]) {
        win = true;
        payOutMoney(3, symbolsContainer[0]);
    }

    if (symbolsContainer[10] === symbolsContainer[6] &&
        symbolsContainer[6] === symbolsContainer[2] &&
        symbolsContainer[2] === symbolsContainer[8] &&
        symbolsContainer[8] === symbolsContainer[14]) {
        win = true;
        payOutMoney(5, symbolsContainer[10]);
    } else if (symbolsContainer[10] === symbolsContainer[6] &&
               symbolsContainer[6] === symbolsContainer[2] &&
               symbolsContainer[2] === symbolsContainer[8]) {
        win = true;
        payOutMoney(4, symbolsContainer[10]);
    } else if (symbolsContainer[10] === symbolsContainer[6] &&
               symbolsContainer[6] === symbolsContainer[2]) {
        win = true;
        payOutMoney(3, symbolsContainer[10]);
    }
    
    winTimeOut = setTimeout(function() {
        spinStopSwitcher();
        updateLastWin();
    }, 1230);
    
    symbolsContainer = [];
}

function spinStopSwitcher(){
    if (isSpinClicked) {
        document.getElementById("spin-btn").style.display = "none";
        document.getElementById("stop-btn").style.display = "block";
        isSpinClicked = false;
    } else {
        document.getElementById("stop-btn").style.display = "none";
        document.getElementById("spin-btn").style.display = "block";
        isSpinClicked = true;
    }
}

function updateLastWin(){
    update(balance);
    lastWin = balance - lastWin;
    if(win){
        update(lastWin);
        coinDropSound.play();
        win = false;
    }
}

function payOutMoney(comboAmmount,withSymbol){ 
    if (comboAmmount === 5) {
        switch(withSymbol){
            case 1: 
                balance += bet * 1000;
                break;
            case 2: 
                balance += bet * 100;
                break;
            case 3:
                balance += bet * 100;
                break;
            case 4:
                balance += bet * 40;
                break;
            case 5:
                balance += bet * 40;
                break;
            case 6:
                balance += bet * 40;
                break;
            case 7: 
                balance += bet * 40;
                break;
            case 8: 
                balance += bet * 40;
                break;
            default: 
                break;
        }  
    } else if (comboAmmount === 4) {
        switch(withSymbol){
            case 1: 
                balance += bet * 200;
                break;
            case 2: 
                balance += bet * 40;
                break;
            case 3:
                balance += bet * 40;
                break;
            case 4:
                balance += bet * 10;
                break;
            case 5:
                balance += bet * 10;
                break;
            case 6:
                balance += bet * 10;
                break;
            case 7: 
                balance += bet * 10;
                break;
            case 8: 
                balance += bet * 10;
                break;
            default: 
                break;
        }
    } else if (comboAmmount === 3) {
        switch(withSymbol){
            case 1: 
                balance += bet * 20;
                break;
            case 2: 
                balance += bet * 10;
                break;
            case 3:
                balance += bet * 10;
                break;
            case 4:
                balance += bet * 4;
                break;
            case 5:
                balance += bet * 4;
                break;
            case 6:
                balance += bet * 4;
                break;
            case 7: 
                balance += bet * 4;
                break;
            case 8: 
                balance += bet * 4;
                break;
            default: 
                break;
        }   
    }
}

function update(value){
    if(value == balance) {
        document.getElementById("balance").textContent = balance + "$";
    } else if (value == bet) {
        document.getElementById("bet").textContent = bet + "$";
    } else if (value == lastWin){
        document.getElementById("last-win").textContent = lastWin + "$";
    }
}