// 🎬 Script
// 
// 

window.onload = function () {
    loadDivs();
    buildCardsAll()
    reportCardsToConsole();
    setTimeout(function () {
        document.querySelector('#handcontianer').classList.add('hide');
    }, 2000);
}



// Functions
// 
// 

// 🚚 Card location array logistics
function moveCard(cardNum, from, to) {
    if (to.length < to.maxSize) {
        to.push(from[cardNum]);
        console.log("Added card to " + to.titleString);
        removeCard(cardNum, from)
        buildCardsAll();
    } else {
        console.log("Already " + table.maxSize + " cards on/in " + to.titleString + ". Called off the action")
    }
};

function placeCard(cardNum, location) {
    if (location.length < location.maxSize) {
        location.push(location[cardNum]);
    } else {
        console.log("Already " + table.maxSize + " cards on/in " + location.titleString + ". Called off the action")
    }
    buildCardsAll();
    console.log("Added card " + cardNum + " to " + location.titleString);
};

function removeCard(cardNum, location) {
    location.splice(cardNum, 1);
    buildCardsAll();
    console.log("removed card no. " + cardNum + " from " + location.titleString);
};



// 🃏 Card Interaction

function cardClick(cardRaw) {
    let cardNumber = parseInt(cardRaw.dataset.order);
    let cardLocation = window[cardRaw.dataset.location];

    if (cardLocation.allowMove !== false) {
        moveCard(cardNumber, cardLocation, window[cardLocation.allowMove]);
    } else {
        console.log("Can't move this card anywhere right now")
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
    updateCardNumberCounters();
};

function buildCardsAll() {
    setTimeout(function () {
        buildCards(hand);
    }, 15);
    setTimeout(function () {
        buildCards(table);
    }, 20);
    setTimeout(function () {
        buildCards(deck);
    }, 25);

}

function mintCards(mintThisCard, orderNumber, locationTitle) {
    let mintedCard = "<div data-order=\"" + orderNumber + "\" data-location=\"" + locationTitle + "\" data-cardId=\"c" + mintThisCard.title + "\" class=\"card " + mintThisCard.title + "\" id=\"Card\" onClick=\"cardClick(this);\"> <div class=\"inner\"> <h4 class=\"title\">" + mintThisCard.title + "</h4> <div class=\"picture\"><div class=\"pic-interior\"></div></div> <p class=\"desc\"></p><p class=\"stats\">  Cost: " + mintThisCard.cost + "</p></div> </div>";
    // check what is being minted:  console.log("minted a fresh " + mintThisCard.title + " in " + locationTitle);
    return mintedCard;
}

// 🎮 Gameplay functions

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


// 🃏 Dragging 

// Configuring https://github.com/Shopify/draggable/tree/master/src/Draggable#classes
var droppable = new Draggable.Sortable(document.querySelectorAll('.playableLocation'), {
    draggable: '.card',
    delay: 200,
});

//  triggers when a card is firstpicked up
droppable.on('drag:start', function () {
    setTimeout(function () {
        heldCard = document.querySelector('.draggable--original');
    }, 3);
});

// when dropping a card down, make the location arrays match the cards rendered in html
droppable.on('drag:stop', function () {
    if (document.querySelector('.draggable-container--over') != null) {
        // Get the container the card was dropped in
        let placeCardWasDropped = document.querySelector('.draggable-container--over');
        // Read the cards html to find where the card came from (prior location is writen to a locaiton data tag on the card)
        let pulledFromLocationString = heldCard.getAttribute('data-location');
        // create an array of all card divs in dropped location 
        let placeCardWasDroppedContents = placeCardWasDropped.children;
        if (placeCardWasDropped.id != pulledFromLocationString) {
            // too many cards in lcoation already? 
            if (window[placeCardWasDropped.id].length < window[placeCardWasDropped.id].maxSize) {
                // see what cards are in html, take their data-card ids, convert those to objects, add back into the provided locations array, rebuild
                window[placeCardWasDropped.id].length = 0;
                for (i = 0; i < placeCardWasDroppedContents.length; i++) {
                    window[placeCardWasDropped.id].push(window[placeCardWasDroppedContents[i].getAttribute('data-cardID')]);
                }
                // remove the card from the place it came from (end bit is the array index as found in the cards data-order)
                console.log("removing card number " + heldCard.getAttribute('data-order') + " from " + pulledFromLocationString);
                window[pulledFromLocationString].splice(heldCard.getAttribute('data-order'), 1);
            }
        }
    }
    buildCardsAll();
});




// 👁 UI 

// show deck on bottom third of screen hover
document.querySelector('.bottomThird').addEventListener("mouseover", function () {
    console.log("mouseover")
    document.querySelector('#handcontianer').classList.remove('hide');
});
document.querySelector('#handcontianer').addEventListener("mouseover", function () {
    console.log("mouseleave")
    document.querySelector('#handcontianer').classList.remove('hide');
});
// hide deck on mouse cursor exit
document.querySelector('#handcontianer').addEventListener("mouseleave", function () {
    console.log("mouseleave")
    setTimeout(function () {
        document.querySelector('#handcontianer').classList.add('hide');
    }, 300);
});

function updateCardNumberCounters() {
    let deckCounterSpan = document.querySelector('.deckCounter');
    deckCounterSpan.innerHTML = deck.length;
}



// Reporting and logging

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




// initalising variables and stuff

var heldCard;

function loadDivs() {
    table.div = document.getElementById('table');
    hand.div = document.getElementById('hand');
    deck.div = document.getElementById('deck');
}


// Config


var deck = [];
deck.maxSize = 50;
deck.titleString = "deck";
//  where is a card from this location permitted to move to on click or drag?
deck.allowMove = "hand";

var table = [cBlock, cBlock, cBlock, cStrike, cStrike];
table.maxSize = 20;
table.titleString = "table";
table.allowMove = "deck";

var hand = [];
hand.maxSize = 5;
hand.titleString = "hand";
hand.allowMove = "table";