/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, activePlayer, roundScore, gamePlaying, diceimage, previousDiceScore;
init();

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    //1 .random number
    previousDiceScore = dice;
    var dice = Math.floor(Math.random() * 6) + 1;

    //2 display result
    diceimage = document.querySelector(".dice");
    diceimage.style.display = "block";
    diceimage.src = "dice-" + dice + ".png";
    //3 Update the round score IF the Rolled number was NOT a 1 else it will be next  players chance
    if (dice !== 1) {
      // add to roundscore
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else if (previousDiceScore === dice && dice === 6) {
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent =
        scores[activePlayer];
      nextPlayer();
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    // Add CURRENT Score to GLOBAL score
    scores[activePlayer] += roundScore;
    //update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    // check if player won the game
    var input = document.getElementById("final-score").value;
    var winningScore;
    // Undefined , 0 , null or " " are coerced to false;
    // Anything else is true
    if (input) {
      winningScore= input;
    } else {
      winningScore = 100;
    }

    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      diceimage.style.display = "none";
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  // Next Player
  activePlayer = (activePlayer + 1) % 2;
  roundScore = 0;
  console.log(activePlayer);
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;

  //toggle means if it is there it removes  and if it is not present then it adds
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  diceimage.style.display = "none";
}
document.querySelector(".btn-new").addEventListener("click", init);
function init() {
  scores = [0, 0];
  roundScore = 0;
  previousDiceScore = 0;
  gamePlaying = true;
  activePlayer = 0;
  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
