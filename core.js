// Cards
let cBlock = {
    title: "Block",
    cost: 20,
    def: 10,
    rarity: 0

};
let cShield = {
    title: "Shield",
    cost: 20,
    def: 15,
    rarity: 1
};
let cBig_Shield = {
    title: "Big Shield",
    cost: 200,
    def: 25,
    rarity: 2
};
let cStrike = {
    title: "Strike",
    cost: 30,
    atk: 5,
    rarity: 0
};
let cBolt = {
    title: "Bolt",
    cost: 70,
    atk: 10,
    rarity: 1
};
let cDefencive_Strike = {
    title: "Defencive_Strike",
    cost: 200,
    def: 20,
    atk: 20,
    rarity: 2
};
let cBurn = {
    title: "Burn",
    cost: 300,
    atk: 20,
    effect: "burn",
    effectAttribute: 3,
    rarity: 2
};

// Script

window.onload = function () {
    loadDivs();
    dealButton.onclick = function () {
        dealCard("deck", "table");
    }

    shuffleButton.onclick = function () {
        shuffle(deck);
    }

    shuffle(deck);

}

// Config

var deck = [cBlock, cBolt, cBlock, cBlock, cBurn, cStrike, cStrike];
deck.maxSize = 50;
var table = [];
table.maxSize = 6;
var hand = [];
hand.maxSize = 5;
var maxHandSize = 7;
var maxTableSize = 6;


// Functions

function placeCard(card, location) {
    if (location.length < location.maxSize) {
        location.push(card);
    } else {
        console.log("Already " + maxTableSize + " cards on the table")
    }
    buildCards(location);
};

function removeCard(card, location) {
        for( var i = 0; i < location.length; i++){ 
            if ( location[i] === card) {
              location.splice(i, 1); 
            }
         }
    buildCards(location);
};

// Take all the cards in one place (hand, table, deck), create the html for each card and write it to the location provided 
function buildCards(location) {
    let collectToWrite = "";
    for (let i = 0; i < location.length; i++) {
        let mintThisCard = location[i];
        collectToWrite += mintCards(mintThisCard);
    };
    location.div.innerHTML = collectToWrite;
};



//refactor this to instead be like 'writeCardTable' etc
// This funciton takes a card from a place (from) and puts it somewhere else (to). Use lowercase strings 


function dealCard(from, to) {
    let fromlet;
    let tolet;
    let toLimit;

    if (from == "deck") {
        fromlet = deck;
    } else if (from == "table") {
        fromlet = table;
    } else if (from == "hand") {
        fromlet = hand;
    } else {
        console.log("Invalid params. deck table or hand as strings please.");
        return;
    };

    if (to == "deck") {
        tolet = deck;
        toLimit = 50;
    } else if (to == "table") {
        tolet = table;
        toLimit = 5;
    } else if (to == "hand") {
        tolet = hand;
        toLimit = 6;
    } else {
        console.log("Invalid params. deck table or hand as strings please.");
        return;
    };

    if (tolet.length > toLimit) {
        console.log(to + " was full. No card drawn.");
    } else if (fromlet.length > 0) {
        tolet.push(fromlet[0]);
        fromlet.shift();
        console.log("Card drawn ", tolet.slice(-1)[0], " from ", from, " and placed on ", to);
        reportCardsToConsole();
    } else {
        console.log("There are no cards in " + from + " to draw into " + to);
    }
    buildCards(table);
};

function loadDivs() {
    let dealButton = document.getElementById("dealButton");
    let shuffleButton = document.getElementById("shuffleButton");
    table.div = document.getElementById('cardRow');
    hand.div = document.getElementById('hand');
    deck.div = document.getElementById('deck');
}

// misc
// List all cards in hand, deck and table out in the console
function reportCardsToConsole() {
    let deckList = [];
    let handList = [];
    let tableList = [];
    deck.forEach(function (obj) {
        deckList.push(obj.title);
    });

    hand.forEach(function (obj) {
        handList.push(obj.title);
    });

    table.forEach(function (obj) {
        tableList.push(obj.title);
    });
    console.log("Deck (" + deck.length + " cards)" + deckList + " | " + "Hand (" + hand.length + " cards)" + handList + " | " + "Table (" + table.length + " cards)" + tableList);
}

// from stackoverflow, don't know how it works https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(obj) {
    let j, x, i;
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

function mintCards(mintThisCard) {
    let mintedCard = "<div class=\"card " + mintThisCard.title + "\" id=\"Card\"> <div class=\"inner\"> <h4 class=\"title\">" + mintThisCard.title + "</h4> <div class=\"picture\"><div class=\"pic-interior\"></div></div> <p class=\"desc\"></p><p class=\"stats\">  Cost: " + mintThisCard.cost + "</p></div> </div>";
    // console.log(mintThisCard.title + " has been minted");
    return mintedCard;

}


/* <div class="card" id="tableCard">
        <div class="inner">
            <h4 class="title"></h4>
            <div class="picture"><div class="pic-interior"></div></div>
            <p class="desc"></p>
            <p class="stats"></p>
        </div>
    </div> */