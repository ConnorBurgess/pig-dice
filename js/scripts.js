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
    $("#output").append(`<li> Player ${this.player} rolled a ${roll} and current score is ${this.runningTotal}. Rolled a total of ${this.rollCounter} times.</li>`);
    if(this.runningTotal >= "100") {
      this.win++
      this.runningTotal = 0;
      $("#output").text(`You are the greatest Barbie Pig Dice Champion ever! YOU WIN! Wins: ${this.win}`)
    }
  }
  else {
    $("#output").append(`<li> Oops! Player ${this.player} rolled a ${roll} and score was reset to ${this.turnTotal}. Rolled a total of ${this.rollCounter} times.</li>`);
    if (this.player === 1) {
      $("#output-player").text(`It is Player 2's turn. Wins: ${this.win}`);
      $("#output-player").append(`<img src="https://www.qedcat.com/misc/pigs1.jpg" width="50px">`)
      playerOne.turnTotal = 0
      this.active = 0;
      this.rollCounter = 0;
      playerTwo.active = 1;
    }
    else if (this.player === 2) {
      $("#output-player").text(`It is Player 1's turn. Wins: ${this.win}`);
      $("#output-player").append(`<img src="https://www.qedcat.com/misc/pigs1.jpg" width="50px">`)
      playerTwo.turnTotal = 0
      this.active === 0;
      this.rollCounter = 0;
      playerOne.active = 1;
    }
  }
}

Player.prototype.rollDice = function () {
  for (i = 1; this.numDice >= i; i++) {
    this.generateTotal();
  }
}

Player.prototype.hold = function () {
  this.runningTotal = this.runningTotal + this.turnTotal;
  $("#output").append(`<li> Turn is over! Rolled a total of ${this.rollCounter} times this turn. Current score is ${this.runningTotal} </li>`)
  if (playerOne.active === 1) {
    roll = 0;
    this.turnTotal = 0;
    this.rollCounter = 0;
    this.active = 0;
    playerTwo.active = 1;
    $("#output-player").text(`It is Player 2's turn.`);
  }
  else if (playerTwo.active === 1) {
    roll = 0;
    this.turnTotal = 0;
    this.rollCounter = 0;
    this.active = 0;
    playerOne.active = 1;
    $("#output-player").text(`It is Player 1's turn.`);
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

//Initialize players
let playerOne = new Player(1);
let playerTwo = new Player(2);
//let computerPlayer = new Player();

// $("#output").text(playerOne.rollDice());
// $("#output").text(computerPlayer.computerMove())
//$("#output").text(computerPlayer.computerMove())

//UI Logic
$(document).ready(function () {
  $("#form2").hide();
  $("#btn-pvp").hide();
  $("#btn-pve").hide();
  playerOne.active = 1;
  $("#btn-start").click(function (event) {
    event.preventDefault();
    $("#btn-pvp, #btn-pve").show();
    $("#btn-start").hide();
    $("#output-player").text("It is player One's turn");
    $("#btn-pvp").click(function (event) {
      event.preventDefault();
      $("#form1").hide();
      $("#form2").show();
      $("#btn-roll").click(function(event) {
        event.preventDefault();
        fillerfunction();
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
        event.preventDefault();
        fillerfunction();
      });
      $("#btn-hold").click(function(event) {
        event.preventDefault();
        hold();
      });
    });
  });
});

function fillerfunction() {
  if (playerOne.active === 1) {
    playerOne.rollDice();
 //   $("#output-player").text(`Player ${playerOne.player}'s rolls the dice.`);
  }
  else if (playerTwo.active === 1) {
    playerTwo.rollDice();
  //  $("#output-player").text(`Player ${playerTwo.player}'s rolls the dice.`);
  }
};

function hold() {
  if (playerOne.active === 1) {
    playerOne.hold();
    $("#output-player").text(`Player ${playerOne.player} decides to hold.`);
  }
  else if (playerTwo.active === 1) {
    playerTwo.hold();
    $("#output-player").text(`Player ${playerTwo.player} decides to hold.`);
  }
};




//Click functions
// setTimeout(function () {
//  bs in here
// }, 5500);

//Code below is not related to program

// // Business Logic for AddressBook ---------
// function AddressBook() {
//   this.contacts = {};
//   this.currentId = 0;
// }

// AddressBook.prototype.addContact = function(contact) {
//   contact.id = this.assignId();
//   this.contacts[contact.id] = contact;
// }

// AddressBook.prototype.assignId = function() {
//   this.currentId += 1;
//   return this.currentId;
// }

// AddressBook.prototype.findContact = function(id) {
// if (this.contacts[id] != undefined) {
//   return this.contacts[id];
// }
// return false;
// }

// // Business Logic for Contacts ---------
// function Contact(firstName, lastName, phoneNumber) {
// this.firstName = firstName;
// this.lastName = lastName;
// this.phoneNumber = phoneNumber;
// }

//aeiou /gi
//input: Epicodus Output: 3
//Input: Hmm Output: 0
//Bob Loblaw Output: 3


// let vowelsCounted = 0;

// function checkVowel(string) {
// for ( i = 0; i <= string.length; i++) {
// let vowelsTest = (/[aeiou]/gi.test(vowelsCounted));
// return (vowelsTest ? vowelsCounted++ && $("#output").text(vowelsCounted) : $("#output").text(vowelsCounted));
// }
// }

// let stringTest = "heyhey";
// checkVowel(stringTest);