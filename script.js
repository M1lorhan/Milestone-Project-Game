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

    } else {
        alert("Max Bet ");
    }
} 

//* add deal function to deal cards to player & dealer cards array. */

function deal() {
    var deck = createDeck();
    shuffle(deck);
    var hands = dealInitialCards(deck);
    renderHand('playerHand', hands.playerHand);
    renderHand('dealerHand', [hands.dealerHand[0], { rank: 'Hidden', suit: '', value: 0, image: './assets/PNG-cards-1.3/Card-Back-05.png' }]);
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

// Function to create a deck of cards
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

// Function to shuffle the deck
function shuffle(deck) {
    for (var i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

// Function to deal cards to a player
function dealCard(deck, playerHand) {
    var card = deck.pop();
    playerHand.push(card);
}

// Function to deal initial cards to the player and dealer
function dealInitialCards(deck) {
    var playerHand = [];
    var dealerHand = [];
    dealCard(deck, playerHand);
    dealCard(deck, dealerHand);
    dealCard(deck, playerHand);
    dealCard(deck, dealerHand);
    return { playerHand: playerHand, dealerHand: dealerHand };
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

//* Create "Hit Me" & "Stay" Buttons. - help from Chat GPT */
 
function hitMeButton(){
	var newButton = document.createElement('button');
    newButton.textContent = 'Hit Me!';
    newButton.classList.add('styledButton');

    newButton.addEventListener('click', function() {
        alert('Hit Me button clicked!').class.dealCards;
    });

    var buttonContainer = document.getElementById('dealCardsContainer');
    dealCardsContainer.appendChild(newButton);

}

function stayButton(){
	var newButton = document.createElement('button');
    newButton.textContent = 'Stay!';
    newButton.classList.add('styledButton');
    
    // Add event listener to the new button (optional)
    newButton.addEventListener('click', function() {
        alert('Stay button clicked!');
    });

    // Append the new button to the container
    var buttonContainer = document.getElementById('dealCardsContainer');
    dealCardsContainer.appendChild(newButton);

}

//* create function to evaluate for winner & update purse */

/* function onDeal(){

    var outputElement = document.getElementById("output");
// Example variable representing some condition
    var condition = true;

    if (playerHandValue == 21 && dealerHandValue == 21) {
        outputElement.textContent = "Push";
    } else if (playerHandValue == 21 && dealerHandValue < 21) {
        outputElement.textContent = "Player Wins";
    } else (playerHandValue < 21 && dealerHandValue == 21) 
        outputElement.textContent = "Dealer Wins";
}

function onHitMe(){
    if (playerHandValue == 21) {
        outputElement.textContent = "PlayerWins";
    } else (playerHandValue > 21) 
        outputElement.textContent = "Dealer Wins";
}

function onStay(){
    if (playerHandValue == 20 && dealerHandValue == 20) {
    outputElement.textContent = "Push";
    } else if (playerHandValue > 20 && playerCards == dealerHandValue && dealerHandValue == 21) {
        outputElement.textContent = "Push";
    } else if (playerHandValue == 21 && dealerHandValue < 21) {
        outputElement.textContent = "Player Wins";
    } else (playerHandValue < 21 && dealerHandValue == 21) 
        outputElement.textContent = "Dealer Wins";


}

// function to calculate hand value.  help from ChatGPT

 function calculatePlayerHandValue(playerHand) {
    let playerCards = 0;
    let aceCount = 0;

    for (let card of playerHand) {
        if (card === "A") {
            aceCount++; playerCards += 11;
        } else if (card === "J" || card === "Q" || card === "K") {
            playerCards += 10; 
        } else {
            playerCards += parseInt(card); 
        }
    }

    while (playerCards > 21 && aceCount > 0) {
        playerCards -= 10; aceCount--; 
    }

    return playerCards;
}

let playerHand = []; 
let playerHandValue = calculatePlayerHandValue(playerHand);
return("Hand value:", playerHandValue);

function calculateDealerHandValue(dealerHand) {
    let dealerCards = 0;
    let aceCount = 0;

    for (let card of dealerHand) {
        if (card === "A") {
            aceCount++; dealerCards += 11; 
        } else if (card === "J" || card === "Q" || card === "K") {
            dealerCards += 10;
        } else {
            dealerCards += parseInt(card);
        }
    }

    while (dealerCards > 21 && aceCount > 0) {
        dealerCards -= 10; aceCount--; 
    }

    return dealerCards;
}

let dealerHand = []; 
let dealerHandValue = calculateDealerHandValue(dealerHand);
return("Hand value:", dealerHandValue); 


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

function removeButtons(outcome) {
    var hitMeButton = document.getElementById("hitMeButton");
    var stayButton = document.getElementById("stayButton");

    if (outcome === "win" || outcome === "loss" || outcome === "push") {
        // Remove the buttons from the DOM
        hitMeButton.remove();
        stayButton.remove();
    }
}

// Example usage:
// Assume "win", "loss", or "push" as game outcome
removeButtons("win");