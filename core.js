window.onload = function () {

loadDivs();
reportCardsToConsole();
// deal(shortSword);


drawButton.onclick = function(){
    drawCard();
}




}


// functions

var deck = 0;
var hand = 0;
var table = 0;

function reportCardsToConsole() {
    console.log("Deck:" + deck + "." + "Hand:" + hand + "." + "Table:" + table + ".")
}

function dealCard() {
}

}

function drawCard() {
if (table.length>4){ alert("You can only have 5 cards in your hand at a time"); } else 
if (deck.length<1){ alert("No cards in your deck"); } else 
{
    hand +=  
    /*add the top value from the array deck to hand. afterwards make and call a function to remove the top card off deck */

console.log("Card drawn");
reportCardsToConsole();
}

function loadDivs() {
    // var deltCard = document.getElementById("tableSlot1");
    var drawButton = document.getElementById("drawButton");
}

remove



