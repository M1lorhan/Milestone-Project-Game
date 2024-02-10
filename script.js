//* add bet function to add funds to pot and and subtract funds from purse. */

let betFive = document.querySelector("#betFive");
let betTen = document.querySelector("#betTen");
let betTwenty = document.querySelector("#betTwenty");

betFive.addEventListener("onclick", function () {
  let output = document.querySelector("#output");
  let result = Number(output.innerText) + 5;

  if (result > 500) {
    result = "Max Bet";
  }

  output.innerText = result;
});

betTen.addEventListener("onclick", function () {
  let output = document.querySelector("#output");
  let result = Number(output.innerText) + 10;

  if (result > purse) {
    result = "Max Bet";
  }

  output.innerText = result;
});

betTwenty.addEventListener("onclick", function () {
  let output = document.querySelector("#output");
  let result = Number(output.innerText) + 20;

  if (result > 500) {
    result = "Max Bet";
  }

  output.innerText = result;
});

//* add deal function to deal cards to player & dealer cards array.  Creat "Hit Me" & Stay Button */


//* create function to evaluate for winner & update purse */




//* create function onWin to offer drink to player */


//* create fumction onDrink to change luck & blur to screen */

