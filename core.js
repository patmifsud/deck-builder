// 🎬 Script

window.onload = function () {
    loadDivs();

    dealButton.onclick = function () {
        moveCard(0, deck, table)
    }

    shuffleButton.onclick = function () {
        shuffle(deck);
        buildCards(hand);
    }

    buildCards(hand);
    buildCards(table);
    buildCards(deck);

    reportCardsToConsole();
}


// Functions

// 🚙 Card Logistics
function placeCard(cardNum, location) {
    if (location.length < location.maxSize) {
        location.push(location[cardNum]);
    } else {
        console.log("Already " + table.maxSize + " cards on/in " + location.titleString )
    }
    buildCards(location);
    console.log("Added card no. " + cardNum + " to " + location.titleString );
};

function removeCard(cardNum, location) {
    location.splice(cardNum, 1);
    buildCards(location);
    console.log("removed card no. " + cardNum + " from " + location.titleString );
};

function moveCard(cardNum, from, to) {
    if (to.length < to.maxSize) {
        to.push(from[cardNum]);
        removeCard(cardNum, from)
        buildCards(to);
        buildCards(from);
    } else {
        console.log("Already " + table.maxSize + " cards on/in " + to.titleString)
    }

};


// 🃏 Card Interaction
function cardClick(cardRaw) {
    cardNum = parseInt(cardRaw.dataset.order);
    if (cardRaw.dataset.location == "table") {
        console.log("cardClick thinks the card is on the table")
        moveCard(cardNum, table, hand);
    } else if (cardRaw.dataset.location == "deck") {
        console.log("cardClick thinks the card is in the deck")
        moveCard(cardNum, deck, table);
    } else {
        console.log("cardClick thinks the card is in the hand")
        moveCard(cardNum, hand, table);
    }
}


// Take all the cards in one place (hand, table, deck), create the html for each card and write it to the location provided 
function buildCards(location) {
    let collectToWrite = "";
    if (location.length > 0) {
        for (let i = 0; i < location.length; i++) {
            let mintThisCard = location[i];
            collectToWrite += mintCards(mintThisCard, [i], location.titleString);
        };
    }
    location.div.innerHTML = collectToWrite;
};

function checkForCard(card, location) {
    for (var i = 0; i < location.length; i++) {
        if (location[i] === card) {
            return true;
        } else {
            return false;
        };
    };
};

// List all cards in hand, deck and table out in the console
function reportCardsToConsole() {
    let deckList = [];
    let handList = [];
    let tableList = [];
    // this errors if one of the arrays is empty
    if (deck.length > 0){
    deck.forEach(function (obj) {
        deckList.push(obj.title);
    });}
    if (hand.length > 0){
    hand.forEach(function (obj) {
        handList.push(obj.title);
    });}
    if (table.length > 0){
    table.forEach(function (obj) {
        tableList.push(obj.title);
    });}
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

function mintCards(mintThisCard, orderNumber, locationTitle) {
    let mintedCard = "<div data-order=\"" + orderNumber + "\" data-location=\"" + locationTitle + "\" data-cardId=\"c" + mintThisCard.title + "\" class=\"card " + mintThisCard.title + "\" id=\"Card\" onClick=\"cardClick(this);\"> <div class=\"inner\"> <h4 class=\"title\">" + mintThisCard.title + "</h4> <div class=\"picture\"><div class=\"pic-interior\"></div></div> <p class=\"desc\"></p><p class=\"stats\">  Cost: " + mintThisCard.cost + "</p></div> </div>";
    // check what is being minted:  console.log("minted a fresh " + mintThisCard.title + " in " + locationTitle);
    return mintedCard;
}

function loadDivs() {
    var dealButton = document.getElementById("dealButton");
    var shuffleButton = document.getElementById("shuffleButton");
    table.div = document.getElementById('table');
    hand.div = document.getElementById('hand');
    deck.div = document.getElementById('deck');
}

//config
var deck = [cBlock, cBolt, cBlock, cBlock, cBurn, cStrike, cStrike];
deck.maxSize = 50;
deck.titleString = "deck";

var table = [cBlock];
table.maxSize = 6;
table.titleString = "table";

var hand = [cBlock];
hand.maxSize = 5;
hand.titleString = "hand";


// old version that moved and added cards by card name and not by order in location
// may still need it
// function placeCard(card, location) {
//     if (location.length < location.maxSize) {
//         location.push(card);
//     } else {
//         console.log("Already " + maxTableSize + " cards on/in " + location.name)
//     }
//     buildCards(location);
//     reportCardsToConsole();
// };

// function removeCard(card, location) {
//     for (var i = 0; i < location.length; i++) {
//         if (location[i] === card) {
//             location.splice(i, 1);
//             break;
//         }
//     }
//     buildCards(location);
//     reportCardsToConsole();
// };

// function moveCard(card, from, to) {
//     if (checkForCard(card, from)) {
//         if (to.length < to.maxSize) {
//             to.push(card);
//         } else {
//             console.log("Already " + maxTableSize + " cards on/in " + to)
//         }}else{return false};
//     removeCard(card, from)
//     buildCards(to);
//     buildCards(from);
//     reportCardsToConsole();
// };



// misc
/* <div class="card" id="tableCard">
        <div class="inner">
            <h4 class="title"></h4>
            <div class="picture"><div class="pic-interior"></div></div>
            <p class="desc"></p>
            <p class="stats"></p>
        </div>
    </div> */




//refactor this to instead be like 'writeCardTable' etc
// This funciton takes a card from a place (from) and puts it somewhere else (to). Use lowercase strings 


// function dealCard(from, to) {
//     let fromlet;
//     let tolet;
//     let toLimit;

//     if (from == "deck") {
//         fromlet = deck;
//     } else if (from == "table") {
//         fromlet = table;
//     } else if (from == "hand") {
//         fromlet = hand;
//     } else {
//         console.log("Invalid params. deck table or hand as strings please.");
//         return;
//     };

//     if (to == "deck") {
//         tolet = deck;
//         toLimit = 50;
//     } else if (to == "table") {
//         tolet = table;
//         toLimit = 5;
//     } else if (to == "hand") {
//         tolet = hand;
//         toLimit = 6;
//     } else {
//         console.log("Invalid params. deck table or hand as strings please.");
//         return;
//     };

//     if (tolet.length > toLimit) {
//         console.log(to + " was full. No card drawn.");
//     } else if (fromlet.length > 0) {
//         tolet.push(fromlet[0]);
//         fromlet.shift();
//         console.log("Card drawn ", tolet.slice(-1)[0], " from ", from, " and placed on ", to);
//         reportCardsToConsole();
//     } else {
//         console.log("There are no cards in " + from + " to draw into " + to);
//     }
//     buildCards(table);
// };



    // // cardLocation = (eval(cardRaw.dataset.location).titleString);
    // // console.log(cardNum);
    // // console.log(cardLocation);


    // reportCardsToConsole();
