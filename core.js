

// Cards
var cBlock = {name:"Block", cost:20, def:10, rarity:0 }
var cShield = {name:"Shield", cost:20, def:15, rarity:1}
var cBig_Shield = {name:"Big Shield", cost:200, def:25, rarity:2 }
var cStrike = {name:"Strike", cost:30, atk:5, rarity:0 }
var cBolt = {name:"Bolt", cost:70, atk:10, rarity:1 }
var cDefencive_Strike = {name:"Defencive_Strike", cost:200, def:20, atk:20, rarity:2 }
var cBurn = {name:"Burn", cost:300, atk:20, effect:"burn", effectAttribute:3, rarity:2 }

// Script

window.onload = function () {

loadDivs();
// deal(shortSword);

dealButton.onclick = function(){
    dealCard();
}

shuffleButton.onclick = function(){
    shuffle(deck);
}

shuffle(deck);

}

// Functions

var deck = [cBlock, cBlock, cBlock, cBlock, cBlock, cStrike, cStrike];
var hand = [];
var table = [];

function dealCard() {
    if (deck.length < 1){ alert("No cards in your deck"); console.log("Deck Empty"); } else{
        // can only be 5 cards on the table. Get rid of zero if too many
        if (table.length >= 5){ table.shift();  };
        table.push(deck[0]);
        deck.shift();
        console.log("Card drawn from deck and placed on table");
    }
    reportCardsToConsole();
}

function loadDivs() {
    var dealButton = document.getElementById("dealButton");
    var shuffleButton = document.getElementById("shuffleButton");
}

// misc
// List all cards in hand, deck and table out in the console
function reportCardsToConsole() {
    var deckList = []; var handList = []; var tableList = [];
    deck.forEach(function(obj){
    deckList.push(obj.name);});

    hand.forEach(function(obj){
    handList.push(obj.name);});

    table.forEach(function(obj){
    tableList.push(obj.name);});
    console.log("Deck (" + deck.length + " card(s)) " + deckList + " | " + "Hand (" + hand.length + " card(s)) " + handList + " | " + "Table ("  + table.length + " card(s))" + tableList);
}

// from stackoverflow, don't know how it works https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(obj) {
    var j, x, i;
    for (i = obj.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = obj[i];
        obj[i] = obj[j];
        obj[j] = x;
    }
    console.log("shuffled");
    reportCardsToConsole();
    return obj;
}