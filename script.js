//* add bet function to add funds to pot and and subtract funds from purse. */

/* var betOutput = 0
var purse = 500

let up = betOutput


increaseBetFive()
increaseBetTen()
increaseBetTwenty()
decreasePurseFive()
decreasePurseTen()
decreasePurseTwenty()

let betFive = document.querySelector(".betFive");
let betTen = document.querySelector(".betTen");
let betTwenty = document.querySelector(".betTwenty");

betFive.addEventListener("click", function (e) {
  let betOutput = document.querySelector("#betOutput");
  let result = Number(output.innerText) + 5;

  if (result > purse) {
    result = "Max Bet";
  }

  betOutput.innerText = result;
});

betTen.addEventListener("click", function (e) {
  let betOutput = document.querySelector("#betOutput");
  let result = Number(output.innerText) + 10;

  if (result > purse) {
    result = "Max Bet";
  }

  betOutput.innerText = result;
});

betTwenty.addEventListener("click", function (e) {
  let betOutput = document.querySelector("#betOutput");
  let result = Number(output.innerText) + 20;

  if (result > purse) {result = "Max Bet";
  }

  betOutput.innerText = result;
}); */

//* add deal function to deal cards to player & dealer cards array.  Creat "Hit Me" & Stay Button */

function dealCards(){}

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


//* create fumction onDrink to change luck & blur to screen */

