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

function dealCards(){}


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