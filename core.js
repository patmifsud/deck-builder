

// Cards
var cBlock = {title:"Block", cost:20, def:10, rarity:0 }
var cShield = {title:"Shield", cost:20, def:15, rarity:1}
var cBig_Shield = {title:"Big Shield", cost:200, def:25, rarity:2 }
var cStrike = {title:"Strike", cost:30, atk:5, rarity:0 }
var cBolt = {title:"Bolt", cost:70, atk:10, rarity:1 }
var cDefencive_Strike = {title:"Defencive_Strike", cost:200, def:20, atk:20, rarity:2 }
var cBurn = {title:"Burn", cost:300, atk:20, effect:"burn", effectAttribute:3, rarity:2 }

// Script

window.onload = function () {

loadDivs();

dealButton.onclick = function(){
    dealCard("deck", "hand");
}

shuffleButton.onclick = function(){
    shuffle(deck);
}

shuffle(deck);

}

// Setup


var deck = [cBlock, cBlock, cBlock, cBlock, cBlock, cStrike, cStrike];
var table = [];
var hand = [];


// Functions

// This funciton takes a card from a place (from) and puts it somewhere else (to). Use lowercase strings 
function dealCard(from, to) {
    var fromVar = deck;
    var toVar = hand;
    
    if (from == "deck"){fromVar = deck; } 
    else if (from == "table"){fromVar = table;}
    else if (from == "hand"){fromVar = hand;};

    if (to == "deck"){toVar = deck;} 
    else if (to == "table"){toVar = table;}
    else if (to == "hand"){toVar = hand;};
    
    if(fromVar.length > 0){
        toVar.push(fromVar[0]);
        fromVar.shift();
        console.log("Card drawn from " + from + " and placed on " + to );
        reportCardsToConsole();
    } else {
        console.log("There are no cards in " + from + " to draw into " + to );
    }

    // if (deck.length < 1){ alert("No cards in your deck"); console.log("Deck Empty"); } else{
    //     // can only be 5 cards on the table. Get rid of zero if too many
    //     if (table.length >= 5){ table.shift();  };
    //     table.push(deck[0]);
    //     deck.shift();
    //     console.log("Card drawn from deck and placed on table");
    // }
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
    deckList.push(obj.title);});

    hand.forEach(function(obj){
    handList.push(obj.title);});

    table.forEach(function(obj){
    tableList.push(obj.title);});
    console.log("Deck (" + deck.length + " cards)" + deckList + " | " + "Hand (" + hand.length + " cards)" + handList + " | " + "Table ("  + table.length + " cards)" + tableList);
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

/* <div class="card" id="tableCard">
        <div class="inner">
            <h4 class="title"></h4>
            <div class="picture"><div class="pic-interior"></div></div>
            <p class="desc"></p>
            <p class="stats"></p>
        </div>
    </div> */

// I needed to make this variable no local but didn't know how else other than inserting it here.
