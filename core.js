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
        console.log("Already " + table.maxSize + " cards on/in " + location.titleString + ". Called off the action")
    }
    buildCards(location);
    console.log("Added card no. " + cardNum + " to " + location.titleString);
};

function removeCard(cardNum, location) {
    location.splice(cardNum, 1);
    buildCards(location);
    console.log("removed card no. " + cardNum + " from " + location.titleString);
};

function moveCard(cardNum, from, to) {
    if (to.length < to.maxSize) {
        to.push(from[cardNum]);
        console.log("Added card to " + to.titleString);
        removeCard(cardNum, from)
        buildCards(to);
        buildCards(from);
    } else {
        console.log("Already " + table.maxSize + " cards on/in " + to.titleString + ". Called off the action")
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

// 🃏 Rednering cards in HTML
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

function mintCards(mintThisCard, orderNumber, locationTitle) {
    let mintedCard = "<div data-order=\"" + orderNumber + "\" data-location=\"" + locationTitle + "\" data-cardId=\"c" + mintThisCard.title + "\" class=\"card " + mintThisCard.title + "\" id=\"Card\" onClick=\"cardClick(this);\"> <div class=\"inner\"> <h4 class=\"title\">" + mintThisCard.title + "</h4> <div class=\"picture\"><div class=\"pic-interior\"></div></div> <p class=\"desc\"></p><p class=\"stats\">  Cost: " + mintThisCard.cost + "</p></div> </div>";
    // check what is being minted:  console.log("minted a fresh " + mintThisCard.title + " in " + locationTitle);
    return mintedCard;
}


// List all cards in hand, deck and table out in the console
function reportCardsToConsole() {
    let deckList = [];
    let handList = [];
    let tableList = [];
    // this errors if one of the arrays is empty
    if (deck.length > 0) {
        deck.forEach(function (obj) {
            deckList.push(obj.title);
        });
    }
    if (hand.length > 0) {
        hand.forEach(function (obj) {
            handList.push(obj.title);
        });
    }
    if (table.length > 0) {
        table.forEach(function (obj) {
            tableList.push(obj.title);
        });
    }
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
    buildCards(obj);
    return obj;
}

// Is this card in this place? 
function checkForCard(card, location) {
    for (var i = 0; i < location.length; i++) {
        if (location[i] === card) {
            return true;
        } else {
            return false;
        };
    };
};

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




// dragging 

var droppable = new Draggable.Sortable(document.querySelectorAll('.playableLocation'), {
    draggable: '.card',
 });

//  triggers when a card is picked up
 droppable.on('drag:move', function() {
    var heldCard = document.querySelector('.draggable--original');
    console.log(heldCard.getAttribute('data-order') + heldCard.getAttribute('data-location') + heldCard.getAttribute('data-cardId'));
  });
  



// var sortable = new Draggable.Sortable(
//     document.querySelector('#deck'), {
//         draggable: '.card',
//     }
// )

// var sortable = new Draggable.Sortable(
//     document.querySelector('#table'), {
//         draggable: '.card',
//     }
// )

// var sortable = new Draggable.Sortable(
//     document.querySelector('#hand'), {
//         draggable: '.card',
//     }
// )
// sortable.on('sortable:start', () => {
//     console.log('sortable:start')
// })
// sortable.on('sortable:sort', () => {
//     console.log('sortable:sort')
// })
// sortable.on('sortable:sorted', () => {
//     console.log('sortable:sorted')
// })
// sortable.on('sortable:stop', () => {
//     console.log('sortable:stop')
// })