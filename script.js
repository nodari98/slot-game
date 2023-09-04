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
////__UPDATE: V1.0.2_______________________________________________________________________________________________________////
////__1.added mark line when win, now you can easily see which line wins.__________________________________________________////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// დავამატოთ წითელი შავის ფუნქცია. (GAMBLE)
// დავამატოთ ბონუსი. (BONUS GAME)
// დავამატოთ ხაზების შეცვლის ფუნქცია.
//  ********************************* VARIABLES ********************************* //
let balance = 100;
let bet = 1;
let lastWin = 0;
let spinEndTime = 1430; // TIME WHEN SPIN FULL CICLE ENDS
let symbolsContainer = []; // TO STORE SYMBOL INDEXES ON EACH SPIN
let win = false; // TO CHECK IF WIN
let zoomOut = false;
let isSpinClicked = true; //FOR SPIN/STOP BUTTON SWITCH
let line1, line2, line3, line4, line5;
let lineTimeout1,lineTimeout2,lineTimeout3,lineTimeout4,lineTimeout5;
let rowTimeOut1, rowTimeOut2, rowTimeOut3, rowTimeOut4, rowTimeOut5; // TO STOP SPIN ANIMATION
let winTimeOut; // TO GET INSTANT PAYOUT IF WIN - FOR STOP BUTTON

update(balance);
update(bet);
update(lastWin);
//  ********************************* BUTTONS WITH FUNCTIONS ********************************* //
document.getElementById("dep-btn").addEventListener("click", depositButton); // BUTTON FOR ADD DEPOSIT
function depositButton(){
    
    var addedMoney = prompt("თანხის შეტანა:");
    var parsedMoney = parseFloat(addedMoney);
  
    if (!isNaN(parsedMoney)) {
      if (parsedMoney >= 1 && parsedMoney <= 5000) {
        balance += parsedMoney;
        alert("თანხა წარმატებით ჩაირიცხა. თქვენი ახალი ბალანსია: " + balance + "$");
      } else {
        alert("თანხის შეტანა შესაძლებელია 1$ დან 5000$ მდე.");
      }
    } else {
      alert("გთხოვთ მიუთითოთ თანხა ციფრებში.");
    }

    update(balance);
}
document.getElementById("bet-btn").addEventListener("click", betButton); // BUTTON FOR INCREASE BET
function betButton(){
    
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
    if(balance >= bet){
        balance -= bet;
        update(balance);
        generateAndPushRandomSymbols();
        clearLastSpin();
        animateSpin();
        chekcForWinningLines();
        spinStopSwitcher();

    } else {
        alert("თქვენ არ გაქვთ საკმარისი თანხა.");
    }
}
document.getElementById("stop-btn").addEventListener("click", stopButton); // BUTTON FOR STOP SPIN
function stopButton(){
    for(var i=1; i<=15; i++){
        document.getElementById("cell-"+i).style.visibility = "visible"; 
    }
    
    clearTimeout(rowTimeOut1);
    clearTimeout(rowTimeOut2);
    clearTimeout(rowTimeOut3);
    clearTimeout(rowTimeOut4);
    clearTimeout(rowTimeOut5);
    clearTimeout(winTimeOut);
    clearTimeout(lineTimeout1);
    clearTimeout(lineTimeout2);
    clearTimeout(lineTimeout3);
    clearTimeout(lineTimeout4);
    clearTimeout(lineTimeout5);
    showWinningLines();
    updateLastWin();
    spinStopSwitcher();
}
document.getElementById('zoom-btn').addEventListener('click', zoomButton); // BUTTON FOR ZOOM IN/OUT
function zoomButton(){
    if(!zoomOut){
        // Calculate the new scale for zooming out (e.g., 0.8 for 80%)
        var newScale = 0.7;
    
        // Apply the new scale to the body element
        document.body.style.transform = 'scale(' + newScale + ')';
        document.getElementById("zoom-btn").textContent = "Zoom In";
        zoomOut = true;
        } else {
    
        // Calculate the new scale for zooming out (e.g., 0.8 for 80%)
        var newScale = 1;
    
        // Apply the new scale to the body element
        document.body.style.transform = 'scale(' + newScale + ')';
        document.getElementById("zoom-btn").textContent = "Zoom Out";
        zoomOut = false;
        }
}
//  ********************************* MORE FUNCTIONS ********************************* //
//I'ts done don't touch.
function generateAndPushRandomSymbols(){ 
    for(var i=1; i<=15; i++){
        const randomSymbol =  Math.floor(Math.random() * 6) + 1;
        document.getElementById("cell-"+i).style.backgroundImage = 'url("images/symbols/'+ randomSymbol +'.png")';
        symbolsContainer.push(randomSymbol); 
    }
}
//I'ts done don't touch.
function animateSpin(){  

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
    }, 250);

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
    }, 500);

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
    }, 750); 

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
    }, 1000); 

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
    }, 1250);
}
//I'ts done don't touch.
function chekcForWinningLines() {
    lastWin = balance;
 
    if (symbolsContainer[0] === symbolsContainer[1] &&
        symbolsContainer[1] === symbolsContainer[2] &&
        symbolsContainer[2] === symbolsContainer[3] &&
        symbolsContainer[3] === symbolsContainer[4]) {
        win = true;
        line1 = true;
        payOutMoney(5, symbolsContainer[0]);
    } else if (symbolsContainer[0] === symbolsContainer[1] &&
               symbolsContainer[1] === symbolsContainer[2] &&
               symbolsContainer[2] === symbolsContainer[3]) {
        win = true;
        line1 = true;
        payOutMoney(4, symbolsContainer[0]);
    } else if (symbolsContainer[0] === symbolsContainer[1] &&
               symbolsContainer[1] === symbolsContainer[2]) {
        win = true;
        line1 = true;
        payOutMoney(3, symbolsContainer[0]);
    }

    if (symbolsContainer[5] === symbolsContainer[6] &&
        symbolsContainer[6] === symbolsContainer[7] &&
        symbolsContainer[7] === symbolsContainer[8] &&
        symbolsContainer[8] === symbolsContainer[9]) {
        win = true;
        line2 = true;
        payOutMoney(5, symbolsContainer[5]);
    } else if (symbolsContainer[5] === symbolsContainer[6] &&
               symbolsContainer[6] === symbolsContainer[7] &&
               symbolsContainer[7] === symbolsContainer[8]) {
        win = true;
        line2 = true;
        payOutMoney(4, symbolsContainer[5]);
    } else if (symbolsContainer[5] === symbolsContainer[6] &&
               symbolsContainer[6] === symbolsContainer[7]) {
        win = true;
        line2 = true;
        payOutMoney(3, symbolsContainer[5]);
    }

    if (symbolsContainer[10] === symbolsContainer[11] &&
        symbolsContainer[11] === symbolsContainer[12] &&
        symbolsContainer[12] === symbolsContainer[13] &&
        symbolsContainer[13] === symbolsContainer[14]) {
        win = true;
        line3 = true;
        payOutMoney(5, symbolsContainer[10]);
    } else if (symbolsContainer[10] === symbolsContainer[11] &&
               symbolsContainer[11] === symbolsContainer[12] &&
               symbolsContainer[12] === symbolsContainer[13]) {
        win = true;
        line3 = true;
        payOutMoney(4, symbolsContainer[10]);
    } else if (symbolsContainer[10] === symbolsContainer[11] &&
               symbolsContainer[11] === symbolsContainer[12]) {
        win = true;
        line3 = true;
        payOutMoney(3, symbolsContainer[10]);
    }

    if (symbolsContainer[0] === symbolsContainer[6] &&
        symbolsContainer[6] === symbolsContainer[12] &&
        symbolsContainer[12] === symbolsContainer[8] &&
        symbolsContainer[8] === symbolsContainer[4]) {
        win = true;
        line4 = true;
        payOutMoney(5, symbolsContainer[0]);
    } else if (symbolsContainer[0] === symbolsContainer[6] &&
               symbolsContainer[6] === symbolsContainer[12] &&
               symbolsContainer[12] === symbolsContainer[8]) {
        win = true;
        line4 = true;
        payOutMoney(4, symbolsContainer[0]);
    } else if (symbolsContainer[0] === symbolsContainer[6] &&
               symbolsContainer[6] === symbolsContainer[12]) {
        win = true;
        line4 = true;
        payOutMoney(3, symbolsContainer[0]);
    }
 
    if (symbolsContainer[10] === symbolsContainer[6] &&
        symbolsContainer[6] === symbolsContainer[2] &&
        symbolsContainer[2] === symbolsContainer[8] &&
        symbolsContainer[8] === symbolsContainer[14]) {
        win = true;
        line5 = true;
        payOutMoney(5, symbolsContainer[10]);
    } else if (symbolsContainer[10] === symbolsContainer[6] &&
               symbolsContainer[6] === symbolsContainer[2] &&
               symbolsContainer[2] === symbolsContainer[8]) {
        win = true;
        line5 = true;
        payOutMoney(4, symbolsContainer[10]);
    } else if (symbolsContainer[10] === symbolsContainer[6] &&
               symbolsContainer[6] === symbolsContainer[2]) {
        win = true;
        line5 = true;
        payOutMoney(3, symbolsContainer[10]);
    }
 
    winTimeOut = setTimeout(function() {
        showWinningLines();
        spinStopSwitcher();
        updateLastWin();
    }, spinEndTime);
    
    symbolsContainer = [];
}
//I'ts done don't touch.
function updateLastWin(){
    update(balance);
    lastWin = balance - lastWin;
    if(win){
        update(lastWin);
        win = false;
        line1 = false;
        line2 = false;
        line3 = false;
        line4 = false;
        line5 = false;
    }
}
//I'ts done don't touch.
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
//I'ts done don't touch.
function clearLastSpin (){
    for(var i=1; i<=5; i++){
        document.getElementById("hr"+i).style.display = "none";
    }
    for(var i=1; i<=15; i++){
        document.getElementById("cell-"+i).style.visibility = "hidden"; 
    }
}
//I'ts done don't touch.
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
//I'ts done don't touch.
function update(value){
    if(value == balance) {
        document.getElementById("balance").textContent = balance + "$";
    } else if (value == bet) {
        document.getElementById("bet").textContent = bet + "$";
    } else if (value == lastWin){
        document.getElementById("last-win").textContent = lastWin + "$";
    }
}
//I'ts done don't touch.
function showWinningLines(){
    if(line1){
        document.getElementById("hr1").style.display = "block";
    }
    if(line2){
        document.getElementById("hr2").style.display = "block";
    }
    if(line3){
        document.getElementById("hr3").style.display = "block";
    }
    if(line4){
        document.getElementById("hr4").style.display = "block";
    }
    if(line5){
        document.getElementById("hr5").style.display = "block";
    }
}