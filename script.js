//* add bet function to add funds to pot and and subtract funds from purse. - help from Chat GPT */

var initialPotBalance = 0
var initialPurseBalance = 500

function transferFunds() {
    // Get the transfer amount from the input field
    var purseBalance = parseFloat(document.getElementById('purseBalance').textContent);
    var potBalance = parseFloat(document.getElementById('potBalance').textContent);
    var amountToTransfer = parseFloat(document.getElementById('amountToTransfer').value);
    
    // Check if the transfer amount is valid
    if (!isNaN(amountToTransfer) && amountToTransfer > 0) {
        // Check if the transfer amount is within the purse balance
        if (amountToTransfer <= purseBalance) {
            // Calculate new purse and pot balances after transfer
            var newPurseBalance = purseBalance - amountToTransfer;
            var newPotBalance = potBalance + amountToTransfer;

            // Update the purse and pot balance elements in the DOM
            document.getElementById('purseBalance').textContent = newPurseBalance.toFixed(2);
            document.getElementById('potBalance').textContent = newPotBalance.toFixed(2);
        } else {
            // Alert if transfer amount exceeds purse balance
            alert("Insufficient funds in your purse.");
        }
    } else {
        // Alert if transfer amount is invalid
        alert("Invalid amount to transfer.");
    }
}

function disableDealButton() {
    var dealButton = document.getElementById('createButton');
    if (potBalance === 0) {
        dealButton.disabled = true;
    } else {
        dealButton.disabled = false;
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
    playerHand = hands.playerHand; 
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
    hitMeButton.style.display = 'block';
    hitMeButton.style.margin = '5 auto';
    document.body.appendChild(hitMeButton);
}    

function createStayButton() {
    var stayButton = document.createElement('button');
    stayButton.textContent = 'Stay';
    stayButton.onclick = stay;
    stayButton.classList.add('stay-button');
    stayButton.style.display = 'block'; 
    stayButton.style.margin = '5 auto'; 
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
    container.innerHTML = ''; 
    hand.forEach(function(card) {
        var cardImage = document.createElement('img');
        cardImage.src = card.image;
        container.appendChild(cardImage);
    });
}

// Function to get the value of a card
function getValue(rank) {
    if (rank === 'Ace') {
        return 11; 
    } else if (['Jack', 'Queen', 'King'].includes(rank)) {
        return 10;
    } else {
        return parseInt(rank);
    }
}

// Function to get the URL of the card image
function getImageUrl(rank, suit) {
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
    let message;
    let playerHasAce = false;
    let playerHasFaceCard = false;

    // Check if the player's hand contains an Ace and a face card
    for (let card of playerHand) {
        if (card.rank === 'Ace') {
            playerHasAce = true;
        } else if (['King', 'Queen', 'Jack'].includes(card.rank)) {
            playerHasFaceCard = true;
        }
    }

    // Calculate winnings based on the player's hand
    let winningsMultiplier = 1; // Default multiplier
    if (playerHasAce && playerHasFaceCard) {
        winningsMultiplier = 1.5; // 150% of the bet
    }

    switch (true) {
        case playerHandValue === 21 && dealerHandValue === 21:
            message = "Push";
            break;
        case playerHandValue === 21 && dealerHandValue < 21:
            message = "Congratulations, You Win!";
            updatePurse();
            offerDrink();
            clearPot();
            break;
        case playerHandValue < 21 && dealerHandValue === 21:
            message = "The house wins";
            clearPot();
            break;
        case playerHandValue === dealerHandValue:
            message = "Push";
            break;
        case playerHandValue > 21:
            message = "The house wins";
            clearPot();
            break;
        case dealerHandValue > 21 || playerHandValue > dealerHandValue:
            message = "Congratulations, You Win!";
            updatePurse();
            offerDrink();
            clearPot();
            break;
        default:
            message = "The house wins";
            clearPot();
            break;
    }
    alert(message);
    clearHands();
    removeButtons();
}

function updatePurse() {
    var purseBalance = parseFloat(document.getElementById('purseBalance').textContent);
    var potBalance = parseFloat(document.getElementById('potBalance').textContent);
    
    // Calculate winnings as potBalance * 2
    var winnings = potBalance * 2;

    if (!isNaN(purseBalance) && !isNaN(winnings)) {
        var newPurseBalance = purseBalance + winnings;
        document.getElementById('purseBalance').textContent = newPurseBalance.toFixed(2);
    } else {
        console.error("Purse balance or winnings is not a valid number.");
    }
}

function clearPot() {
    var newPotBalance = initialPotBalance;
    var potBalanceElement = document.getElementById('potBalance');
    
    if (potBalanceElement) {
        potBalanceElement.textContent = newPotBalance.toFixed(2);
    } else {
        console.error("Pot balance element not found.");
    }
}

function clearHands() {
    playerHand = [];
    dealerHand = [];
    
    document.getElementById('playerHand').innerHTML = '';
    document.getElementById('dealerHand').innerHTML = '';
}

//* create function onWin to offer drink to player */
function offerDrink() {
    var response = prompt("The Casino would like to offer you a complementary drink? (yes/no)").toLowerCase();
    var imageSrc;

    if (response === "yes") {
        imageSrc = "./assets/mai-tai.jpg"
        drinkAccepted = true;
        document.body.classList.add('blur-effect');
            } else {
        imageSrc = "./assets/pexels-ron-lach-8879621.jpg"; 
        drinkAccepted = false;
        document.body.classList.remove('blur-effect')};

    var drinkImage = document.createElement('img');
    drinkImage.src = imageSrc;
    document.body.appendChild(drinkImage);
}   


//* create function onDrink to change luck & blur to screen */


//* create to check age & update player name. help from ChatGPT */

function updateName() {
    var newName = prompt("Please enter your name:");

    if (newName !== null && newName.trim() !== "") {
        var playerNameElement = document.getElementById("playerName");
        playerNameElement.textContent = newName + "'s Cards";
    } else {
        alert("No name entered.");
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