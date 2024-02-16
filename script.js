//* add bet function to add funds to pot and and subtract funds from purse. - help from Chat GPT */

function transferFunds() {
    var amountToTransfer = parseFloat(document.getElementById('amountToTransfer').value);
    var purseBalance = parseFloat(document.getElementById('purseBalance').textContent);
    var potBalance = parseFloat(document.getElementById('potBalance').textContent);

    if (!isNaN(amountToTransfer) && amountToTransfer > 0 && amountToTransfer <= purseBalance) {
        var newPurseBalance = purseBalance - amountToTransfer;
        var newPotBalance = potBalance + amountToTransfer;

        document.getElementById('purseBalance').textContent = newPurseBalance.toFixed(2);
        document.getElementById('potBalance').textContent = newPotBalance.toFixed(2);

    } else if (potBalance === 0) {
        alert("Invalid bet amount. Pot balance is zero.");
    } else {
        alert("Max bet reached or invalid amount.");
    }
}

//* add deal function to deal cards to player & dealer cards array. */

var playerHand = [];
var dealerHand = [];
var deck = createDeck();
var hands;

function deal() {
    shuffle(deck);
    hands = dealInitialCards(deck);
    playerHand = hands.playerHand; // Assign dealt hands to playerHand and dealerHand arrays
    dealerHand = hands.dealerHand;
    renderHand('playerHand', hands.playerHand);
    renderHand('dealerHand', [hands.dealerHand[0], { rank: 'Hidden', suit: '', value: 0, image: './assets/PNG-cards-1.3/Card-Back-05.png' }]);
    createHitMeButton();
    createStayButton();
}

function createDeck() {
    var suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    var ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
    var deck = [];
    for (var i = 0; i < suits.length; i++) {
        for (var j = 0; j < ranks.length; j++) {
            var card = {
                rank: ranks[j],
                suit: suits[i],
                value: getValue(ranks[j]),
                image: getImageUrl(ranks[j], suits[i])
            };
            deck.push(card);
        }
    }
    return deck;
}

function shuffle(deck) {
    for (var i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

// Function to deal initial cards to the player and dealer
function dealInitialCards(deck) {
    dealCard(deck, playerHand);
    dealCard(deck, dealerHand);
    dealCard(deck, playerHand);
    dealCard(deck, dealerHand);
    return { playerHand: playerHand, dealerHand: dealerHand };
}

// Function to deal cards to a player
function dealCard(deck, playerHand) {
    var card = deck.pop();
    playerHand.push(card);
}

function createHitMeButton() {
    var hitMeButton = document.createElement('button');
    hitMeButton.textContent = 'Hit Me';
    hitMeButton.onclick = hitMe;
    hitMeButton.classList.add('hit-me-button');
    document.body.appendChild(hitMeButton);
}    

function createStayButton() {
    var stayButton = document.createElement('button');
    stayButton.textContent = 'Stay';
    stayButton.onclick = stay;
    stayButton.classList.add('stay-button');
    document.body.appendChild(stayButton);
}

function hitMe() {
    dealCard(deck, playerHand);
    renderHand('playerHand', playerHand);
    playerHandValue = calculatePlayerHandValue(playerHand);
}

function stay() {
    renderHand('dealerHand', dealerHand);
    while (calculateDealerHandValue(dealerHand) < 17) {
        dealCard(deck, dealerHand);
    }
    playerHandValue = calculatePlayerHandValue(playerHand);
    dealerHandValue = calculateDealerHandValue(dealerHand);
    determineWinner();
}

function renderHand(containerId, hand) {
    var container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear the container
    hand.forEach(function(card) {
        var cardImage = document.createElement('img');
        cardImage.src = card.image;
        container.appendChild(cardImage);
    });
}

// Function to get the value of a card
function getValue(rank) {
    if (rank === 'Ace') {
        return 11; // Assuming Ace is worth 11 initially
    } else if (['Jack', 'Queen', 'King'].includes(rank)) {
        return 10;
    } else {
        return parseInt(rank);
    }
}

// Function to get the URL of the card image
function getImageUrl(rank, suit) {
    // Construct the URL based on the rank and suit (assuming images are stored in a folder named "images")
    return './assets/PNG-cards-1.3/' + rank.toLowerCase() + '_of_' + suit.toLowerCase() + '.png';
}

// function to calculate hand value.  help from ChatGPT

function calculatePlayerHandValue(playerHand) {
    let playerCards = 0;
    let aceCount = 0;

    for (let card of playerHand) {
        if (card.rank === "Ace") {
            aceCount++;
            playerCards += 11;
        } else if (["Jack", "Queen", "King"].includes(card.rank)) {
            playerCards += 10;
        } else {
            playerCards += parseInt(card.rank);
        }
    }

    while (playerCards > 21 && aceCount > 0) {
        playerCards -= 10;
        aceCount--;
    }

    return playerCards;
}

function calculateDealerHandValue(dealerHand) {
    let dealerCards = 0;
    let aceCount = 0;

    for (let card of dealerHand) {
        if (card.rank === "Ace") {
            aceCount++;
            dealerCards += 11;
        } else if (["Jack", "Queen", "King"].includes(card.rank)) {
            dealerCards += 10;
        } else {
            dealerCards += parseInt(card.rank);
        }
    }

    while (dealerCards > 21 && aceCount > 0) {
        dealerCards -= 10;
        aceCount--;
    }

    return dealerCards;
}

// Now you can use playerHand and dealerHand variables in your functions
let playerHandValue = calculatePlayerHandValue(playerHand);
let dealerHandValue = calculateDealerHandValue(dealerHand);

function determineWinner() {
    if (playerHandValue === 21 && dealerHandValue === 21) {
        message = "Push";
    } else if (playerHandValue === 21 && dealerHandValue < 21) {
        message = "Player Wins";
        updatePurse(betAmount * 2);
    } else if (playerHandValue < 21 && dealerHandValue === 21) {
        message = "Dealer Wins";
        clearPot();
    } else if (playerHandValue === dealerHandValue) {
        message = "Push";
    } else if (playerHandValue > 21) {
        message = "Dealer Wins";
        clearPot();
    } else if (dealerHandValue > 21 || playerHandValue > dealerHandValue) {
        message = "Player Wins";
        updatePurse(betAmount * 2);
    } else {
        message = "Dealer Wins";
        clearPot();
    }
    alert(message);
    clearHands();
    removeButtons();
}

function updatePurse(winnings) {
    var betAmount = parseFloat(document.getElementById('amountToTransfer').value);
    var purseBalance = parseFloat(document.getElementById('purseBalance').textContent);

    var newPurseBalance = purseBalance - betAmount + winnings;
    document.getElementById('purseBalance').textContent = newPurseBalance.toFixed(2);
}

function clearPot() {
    var betAmount = parseFloat(document.getElementById('amountToTransfer').value);
    var potBalance = parseFloat(document.getElementById('potBalance').textContent);

    var newPotBalance = potBalance - betAmount;
    document.getElementById('potBalance').textContent = newPotBalance.toFixed(2);
}

function clearHands() {
    // Clear playerHand and dealerHand arrays
    playerHand = [];
    dealerHand = [];
    
    // Clear playerHand and dealerHand HTML containers
    document.getElementById('playerHand').innerHTML = '';
    document.getElementById('dealerHand').innerHTML = '';
}

//* create function onWin to offer drink to player */


//* create function onDrink to change luck & blur to screen */


//* create to check age & update player name. help from ChatGPT */

function updateName() {
    var newName = prompt("Please enter the new player name:");

    if (newName !== null && newName.trim() !== "") {
        var playerNameElement = document.getElementById("playerName");
        playerNameElement.textContent = newName + "'s Cards";
    } else {
        alert("No new name entered.");
    }
}

var isOver21 = confirm("Are you over the age of 21? Click 'OK' for 'Yes' and 'Cancel' for 'No'.");

if (isOver21) {
    alert("You have confirmed that you are over the age of 21. Welcome!");
} else {
    var redirectTo = "https://www.sesamestreet.org/";
    alert("You have indicated that you are not over the age of 21. You will be redirected.");
    window.location.href = redirectTo;
}

//* function to remove "hit me" & "button" on result */

function removeButtons() {
    var hitMeButton = document.querySelector('.hit-me-button');
    var stayButton = document.querySelector('.stay-button');
    
    if (hitMeButton && hitMeButton.parentNode) {
        hitMeButton.parentNode.removeChild(hitMeButton);
    }

    if (stayButton && stayButton.parentNode) {
        stayButton.parentNode.removeChild(stayButton);
    }
}