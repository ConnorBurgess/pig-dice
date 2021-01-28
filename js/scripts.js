//Player Business Logic
function Player(num) {
  this.runningTotal = 0;
  this.rollCounter = 0;
  this.turnTotal = 0;
  this.numDice = 1;
  this.player = num;
  this.active = 0
  this.win = 0;
}
Player.prototype.generateTotal = function () {
  let roll = Math.floor(Math.random() * 6) + 1;
  this.turnTotal = roll ;
  this.runningTotal = this.runningTotal + roll;
  this.rollCounter++;
  if (roll !== 1) {
    $("#output").append(`<li><strong id="player-name"> Player ${this.player}</strong> rolled a <em class="roll-color">${roll}</em> and current score is <em class="roll-color">${this.runningTotal}</em>. Rolled a total of <em class="roll-color">${this.rollCounter}</em> times.</li>`);
    if(this.runningTotal >= "100") {
      this.win++
      playerOne.runningTotal = 0;
      playerTwo.runningTotal = 0;
      this.turnTotal = 0;
      $("#output").empty();
      $("#output").append(`<em id="bright-word">You are the greatest Barbie Pig Dice Champion ever! YOU WIN!</em> Wins: ${this.win}`);
      $("#output-player").empty();
      $("#output-player").append(`This is win # ${this.win}. It is still <strong id="player-name-bright">Player ${this.player}</strong>'s turn, <em id="bright-word">KEEP ROLLING</em>! `)
      document.body.style.backgroundImage = "url('https://media.giphy.com/media/KCO3yCqBggRjO/giphy.gif')";
      $("#btn-roll").hide();
      $("#output").hide();
      $("#btn-hold").hide();
      $("#btn-roll").fadeIn(3000);
      $("#btn-hold").fadeIn(3000);
      $("#output").fadeIn(3000);
    }
  }
  else {
    $("#output").append(`<li> Oops! <strong id="player-name"> Player ${this.player}</strong> rolled a <em class="roll-color">${roll}</em> and score was reset to <em class="roll-color">${this.turnTotal}.</em> Rolled a total of <em class="roll-color">${this.rollCounter}</em> times.</li>`);
    $("#btn-roll").hide();
    $("#btn-hold").hide();
    $("#output-animation").hide();
    $("#output-animation").fadeIn(1500);
    $("#btn-roll").fadeIn(3000);
    $("#btn-roll").fadeIn(2000);
    $("#btn-hold").fadeIn(2000);
    if (this.player === 1) {
      $("#output-player").empty();
      $("#output-player").append(`It is <strong id="player-name-bright">Player 2</strong>'s turn. Wins: ${this.win}   `);
      $("#output-player").append(`<img src="https://www.qedcat.com/misc/pigs1.jpg" width="65px">`)
      playerOne.turnTotal = 0
      this.active = 0;
      this.rollCounter = 0;
      playerTwo.active = 1;
    }
    else if (this.player === 2) {
      $("#output-player").empty();
      $("#output-player").append(`It is <strong id="player-name-bright">Player 1</strong>'s turn. Wins: ${this.win}   `);
      $("#output-player").append(`<img src="https://www.qedcat.com/misc/pigs1.jpg" width="65px">`)
      playerTwo.turnTotal = 0
      this.active === 0;
      this.rollCounter = 0;
      playerOne.active = 1;
    }
  }
}

Player.prototype.rollDice = function () {
  for (i = 1; this.numDice >= i; i++) {
    outputCount++;
    this.generateTotal();
  }
}

Player.prototype.hold = function () {
  this.runningTotal = this.runningTotal + this.turnTotal;
  $("#output").empty();
  $("#output").append(`<li id="turn-over-color"> Turn is over! Rolled a total of ${this.rollCounter} times this turn. Current score is ${this.runningTotal} </li>`)
  $("#btn-roll").hide();
  $("#btn-hold").hide();
  $("#btn-roll").fadeIn(2000);
  $("#btn-hold").fadeIn(2000);
  if (playerOne.active === 1) {
    roll = 0;
    this.turnTotal = 0;
    this.rollCounter = 0;
    this.active = 0;
    playerTwo.active = 1;
    $("#output-player").text(`It is <strong id="player-name-bright">Player 2</strong>'s turn.`);
  }
  else if (playerTwo.active === 1) {
    roll = 0;
    this.turnTotal = 0;
    this.rollCounter = 0;
    this.active = 0;
    playerOne.active = 1;
    $("#output-player").text(`It is <strong id="player-name-bright">Player 1</strong>'s turn.`);
  }
}

// Player.prototype.computerMove = function () {
//   if (this.difficulty === false) {
//     this.generateTotal();
//     this.generateTotal();
//     this.rollCounter = 0;
//     this.hold();
//   }
//   else {
//     $("#output").text("Hard AI here")
//     if (playerOne.runningTotal > computerPlayer.runningTotal) {
//       this.generateTotal();
//     }
//   }
// }

let outputCount = 0;
function gameStart() {
  if (playerOne.active === 1) {
    if (outputCount >= 4) {
      $("#output").empty();
      outputCount = 0;
    }
    playerOne.rollDice();
    outputCount++;
  }
  else if (playerTwo.active === 1) {
    if (outputCount >= 4) {
      $("#output").empty();
      outputCount = 0;
    }
    playerTwo.rollDice();
  }
};

function hold() {
  if (playerOne.active === 1) {
    playerOne.hold();
    $("#output-player").text(`<strong id="player-name-bright">Player ${playerOne.player}</strong> decides to hold.`);

  }
  else if (playerTwo.active === 1) {
    playerTwo.hold();
    $("#output-player").text(`<strong id="player-name-bright">Player ${playerTwo.player}</strong> decides to hold.`);

  }
};

//Initialize players
let playerOne = new Player(1);
let playerTwo = new Player(2);
//let computerPlayer = new Player();


//UI Logic
$(document).ready(function () {
  $("#form2").hide();
  $("#btn-pvp").hide();
  $("#btn-reset").hide();
  $("#btn-pve").hide();
  $("#page-top").slideDown(3000);
  playerOne.active = 1;
  $("#btn-start").click(function (event) {
    document.body.style.backgroundImage = "url('https://media.giphy.com/media/KCO3yCqBggRjO/giphy.gif')";
 
    event.preventDefault();
    $("#btn-pvp, #btn-pve, #btn-reset").show();
    
    $("#btn-start").hide();
    $(".col-md-8").hide();
    $(".col-md-8").fadeIn(1500);
    $("#output-player").text("Choose a game!");
    $("#btn-pvp").click(function (event) {
      event.preventDefault();
      $("#output-player").empty();
      $("#output-player").append(`Playing <em id="bright-word">PVP</em>! It is <strong id="player-name-bright">Player 1</strong>'s turn.`);
      $("#form1").hide();
      $("#form2").show();
      $("#btn-roll").click(function(event) {
        document.body.style.backgroundImage = "url('https://thumbs.dreamstime.com/z/cute-seamless-unicorn-pattern-textile-graphic-t-shirt-print-hand-drawn-unicorns-background-cute-seamless-unicorn-pattern-textile-138422126.jpg')";
        event.preventDefault();
        gameStart();
      });
      $("#btn-hold").click(function(event) {
        event.preventDefault();
        hold()
      });
    });
    $("#btn-pve").click(function (event) {
      event.preventDefault();
      $("#form1").hide();
      $("#form2").show();
      $("#btn-roll").click(function(event) {
 //       document.body.style.backgroundImage = "none";
        document.body.style.backgroundImage = "url('https://thumbs.dreamstime.com/z/cute-seamless-unicorn-pattern-textile-graphic-t-shirt-print-hand-drawn-unicorns-background-cute-seamless-unicorn-pattern-textile-138422126.jpg')";
        event.preventDefault();
        gameStart();
      });
      $("#btn-hold").click(function(event) {
        event.preventDefault();
        hold();
      });
    });
  });



});