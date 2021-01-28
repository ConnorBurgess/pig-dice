//Player Business Logic
function Player(num) {
  this.runningTotal = 0;
  this.rollCounter = 0;
  this.turnTotal = 0;
  this.numDice = 1;
  this.player = num;
  this.active = 0
  this.win = 0;
  this.difficulty = false;
  this.computer = false;
}
Player.prototype.rollDice = function () {
  for (i = 1; this.numDice >= i; i++) {
    outputCount++;
    this.generateTotal();
  }
}
Player.prototype.generateTotal = function () {
  let roll = Math.floor(Math.random() * 6) + 1;
  this.turnTotal = roll;
  this.runningTotal = this.runningTotal + roll;
  this.rollCounter++;
  if (roll !== 1 && this.player !== 3) {
    $("#output").append(`<li><strong id="player-name"> Player ${this.player}</strong> rolled a <em class="roll-color">${roll}</em> and current score is <em class="roll-color">${this.runningTotal}</em>. Rolled a total of <em class="roll-color">${this.rollCounter}</em> times.</li>`);
    if (this.runningTotal >= "100") {
      this.win++
      playerOne.runningTotal = 0;
      playerTwo.runningTotal = 0;
      computerPlayer.runningTotal = 0;
      this.rollCounter = 0;
      this.turnTotal = 0;
      $("#output, #output-player").empty();
      $("#output").append(`<em id="player-name-bright">You are the greatest Barbie Pig Dice Champion ever! <br></em>`);
      $("#output-player").append(`This is Win ${this.win}. It is still <strong id="player-name-bright">Player ${this.player}</strong>'s turn, <em id="bright-word">KEEP ROLLING</em>! `)
      document.body.style.backgroundImage = "url('https://media.giphy.com/media/KCO3yCqBggRjO/giphy.gif')";
      $("#btn-roll, #output, #btn-hold").hide();
      $("#btn-roll, #btn-hold, #output").fadeIn(3000);
    }
  }
  else if (this.runningTotal >= "100" && computerPlayer.active === 1) {
    this.win++
    playerOne.runningTotal = 0;
    computerPlayer.runningTotal = 0;
    this.turnTotal = 0;
    this.rollCounter = 0;
    $("#output, #output-player").empty();
    $("#output").append(`<strong id="bright-word"> lol ya lost to a bot ${computerPlayer.win} times!</strong>`);
    document.body.style.backgroundImage = "url('https://thumbs.dreamstime.com/z/cute-seamless-unicorn-pattern-textile-graphic-t-shirt-print-hand-drawn-unicorns-background-cute-seamless-unicorn-pattern-textile-138422126.jpg')";
  }
  else if (this.player === 1 || this.player === 2) {
    $("#output").append(`<li><em>OOPS!</em> <strong id="bright-word"> Player ${this.player}</strong> rolled a <em class="roll-color">${roll}</em> and score was reset to <em class="roll-color">${this.turnTotal}.</em> Rolled a total of <em class="roll-color">${this.rollCounter}</em> times.</li>`);
    $("#btn-roll, #btn-hold, #output-animation").hide();
    $("#output-animation").fadeIn(1500);
    $("#btn-roll").fadeIn(3000);
    $("#btn-roll, #btn-hold").fadeIn(2000);
    if (this.player === 1 && computerPlayer.computer === false) {
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
      this.active = 0;
      this.rollCounter = 0;
      playerOne.active = 1;
    }
    else if (this.player === 1 && computerPlayer.computer === true) {
      this.active = 0;
      computerPlayer.active = 1;
      computerPlayer.computerMove();
    }
  }
  else if (this.player === 3) {
    $("#output").append(`<li><strong id="player-name"> Bot</strong> rolled a <em class="roll-color">${roll}</em> and current score is <em class="roll-color">${this.runningTotal}</em>. Rolled a total of <em class="roll-color">${this.rollCounter}</em> times.</li>`);
  }
}
Player.prototype.hold = function () {
  this.runningTotal = this.runningTotal + this.turnTotal;
  $("#output").empty();
  $("#output").append(`<li id="turn-over-color"> Turn is over! Rolled a total of ${this.rollCounter} times this turn. Current score is ${this.runningTotal} </li>`)
  $("#btn-roll, #btn-hold").hide();
  $("#btn-roll").fadeIn(2000);
  $("#btn-hold").fadeIn(2000);
  if (playerOne.active === 1 && computerPlayer.computer === true) {
    roll = 0;
    this.turnTotal = 0;
    this.rollCounter = 0;
    this.active = 0;
    computerPlayer.active = 1;
    computerPlayer.computerMove();
    $("#output-player").text(`It is <strong id="player-name-bright">the Bot's</strong>'s turn.`);
  }
  else if (playerOne.active === 1 && computerPlayer.computer === false) {
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
// Computer AI Logic
Player.prototype.computerMove = function () {
  if (this.difficulty === false) {
    $("#btn-roll, #btn-hold").hide();
    this.rollDice()
    if (this.turnTotal >= 2) {
      this.rollDice()
      $("#output-player").empty();
      $("#output-player").append(`It is <strong id="player-name-bright">Player 1</strong>'s turn.`);
      this.turnTotal = 0;
      this.rollCounter = 0;
      this.active = 0;
      playerOne.active = 1;
      computerPlayer.active = 0;
      $("#btn-roll, #btn-hold").show();
    } else {
      this.turnTotal = 0;
      this.rollCounter = 0;
      this.active = 0;
      playerOne.active = 1;
      computerPlayer.active = 0;
      $("#btn-roll, #btn-hold").show();
    }
  }
  // HARD AI LOGIC
  else if (this.difficulty === true) {
    $("#btn-roll, #btn-hold").hide();
    console.log(this.rollCounter);

    for (i = 0; i < 5; i++) {
      this.rollDice();
      if (playerOne.runningTotal <= this.runningTotal + this.turnTotal) {
        break;
      }
      else if (this.turnTotal >= 26) {
        break;
      }
      else {
        this.rollDice();
        this.rollDice();
      }
    }
    this.turnTotal = 0;
    this.rollCounter = 0;
    this.active = 0;
    playerOne.active = 1;
    computerPlayer.active = 0;
    console.log("test");
    $("#btn-roll, #btn-hold").show();
  }
}

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
  else if (computerPlayer.active === 1) {
    if (outputCount >= 4) {
      $("#output").empty();
      outputCount = 0;
    }
  }
};

function hold() {
  if (playerOne.active === 1) {
    playerOne.hold();
    $("#output-player").empty();
    $("#output-player").append(`<strong id="player-name-bright">Player ${playerOne.player}</strong> decides to hold.`);
  }
  else if (playerTwo.active === 1) {
    playerTwo.hold();
    $("#output-player").empty();
    $("#output-player").append(`<strong id="player-name-bright">Player ${playerTwo.player}</strong> decides to hold.`);
  }
};

//Initialize players
let playerOne = new Player(1);
let playerTwo = new Player(2);
let computerPlayer = new Player(3);

//UI Logic
$(document).ready(function () {
  document.body.style.backgroundImage = "url('https://thumbs.dreamstime.com/z/cute-seamless-unicorn-pattern-textile-graphic-t-shirt-print-hand-drawn-unicorns-background-cute-seamless-unicorn-pattern-textile-138422126.jpg')";
  $("#form2, #btn-pvp, #btn-reset, #btn-pve, #btn-easy, #btn-hard").hide();
  $("#page-top").slideDown(3000);
  playerOne.active = 1;
  $("#btn-start").click(function (event) {
    event.preventDefault();
    $("#btn-pvp, #btn-pve").show();
    $("#btn-reset").fadeIn(10000);
    $("#btn-start, .col-md-8").hide();
    $(".col-md-8").fadeIn(1500);
    $("#output-player").text("Choose a game!");
    //VS Player
    $("#btn-pvp").click(function (event) {
      document.body.style.backgroundImage = "url('https://media.giphy.com/media/KCO3yCqBggRjO/giphy.gif')";
      computerPlayer.computer = false;
      event.preventDefault();
      $("#output-player").empty();
      $("#output-player").append(`Playing <em id="bright-word">PVP</em>! It is <strong id="player-name-bright">Player 1</strong>'s turn.`);
      $("#form1").hide();
      $("#form2").show();
      $("#btn-roll").click(function (event) {
        document.body.style.backgroundImage = "url('https://thumbs.dreamstime.com/z/cute-seamless-unicorn-pattern-textile-graphic-t-shirt-print-hand-drawn-unicorns-background-cute-seamless-unicorn-pattern-textile-138422126.jpg')";
        event.preventDefault();
        gameStart();
      });
      $("#btn-hold").click(function (event) {
        event.preventDefault();
        hold()
      });
    });
    //VS computer
    $("#btn-pve").click(function (event) {
      document.body.style.backgroundImage = "url('https://media.giphy.com/media/KCO3yCqBggRjO/giphy.gif')"; event.preventDefault();
      computerPlayer.computer = true;
      $("#btn-pvp, #btn-pve").hide();
      $("#btn-easy, #btn-hard").show();
      $("#btn-easy").click(function (event) {
        event.preventDefault();
        $("#btn-easy, #btn-hard").hide();
        document.body.style.backgroundImage = "url('https://thumbs.dreamstime.com/z/cute-seamless-unicorn-pattern-textile-graphic-t-shirt-print-hand-drawn-unicorns-background-cute-seamless-unicorn-pattern-textile-138422126.jpg')";
        playerOne.active = 0;
        computerPlayer.active = 1;
        $("#form1, #btn-roll, #btn-hold").hide();
        $("#form2").show();
        computerPlayer.computerMove();
        $("#btn-roll").click(function (event) {
          event.preventDefault();
          gameStart();
        });
        $("#btn-hold").click(function (event) {
          event.preventDefault();
          hold();
        });
      });
      $("#btn-hard").click(function (event) {
        document.body.style.backgroundImage = "url('https://i.etsystatic.com/17882580/d/il/26eba0/2789160017/il_340x270.2789160017_mjgg.jpg?version=0')";
        event.preventDefault();
        $("#output-player").empty();
        $("#output-player").append(`It is <strong id="player-name-bright">Player 1</strong>'s turn.`);
        $("#btn-easy, #btn-hard").hide();
        playerOne.active = 0;
        computerPlayer.difficulty = true;
        computerPlayer.active = 1;
        $("#form1, #btn-roll, #btn-hold").hide();
        $("#form2").show();
        computerPlayer.computerMove();
        $("#btn-roll").click(function (event) {
          event.preventDefault();
          gameStart();
        });
        $("#btn-hold").click(function (event) {
          event.preventDefault();
          hold();
        });
      });
    });
  });
});