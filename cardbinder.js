
// Config

// Config


deck = [cBlock, cBolt, cBlock, cBlock, cBurn, cStrike, cStrike];
deck.maxSize = 50;
deck.titleString = "deck";
//  where is a card from this location permitted to move to on click or drag?
deck.allowMove = "hand";

table = [cBlock, cBlock, cBlock, cBurn, cStrike];
table.maxSize = 20;
table.titleString = "table";
table.allowMove = "deck";

hand = [cBlock];
hand.maxSize = 5;
hand.titleString = "hand";
hand.allowMove = "table";


// Cards


var cBlock = {
    title: "Block",
    cost: 20,
    def: 10,
    rarity: 0

};

var cShield = {
    title: "Shield",
    cost: 20,
    def: 15,
    rarity: 1
};

var cBig_Shield = {
    title: "Big Shield",
    cost: 200,
    def: 25,
    rarity: 2
};

var cStrike = {
    title: "Strike",
    cost: 30,
    atk: 5,
    rarity: 0
};

var cBolt = {
    title: "Bolt",
    cost: 70,
    atk: 10,
    rarity: 1
};

var cDefencive_Strike = {
    title: "Defencive_Strike",
    cost: 200,
    def: 20,
    atk: 20,
    rarity: 2
};

var cBurn = {
    title: "Burn",
    cost: 300,
    atk: 20,
    effect: "burn",
    effectAttribute: 3,
    rarity: 2
};

