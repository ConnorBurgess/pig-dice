//Player Business Logic
function Player(num) {
  this.runningTotal = 0;
  this.rollCounter = 0;
  this.turnTotal = 0;
  this.numDice = 1;
  this.player = num;
  this.active = 0
  // this.difficulty = false;
  // this.win = 0;
  // this.loss = 0;
}

Player.prototype.generateTotal = function () {
  let roll = Math.floor(Math.random() * 6) + 1;
  this.turnTotal = roll + 1;
  this.runningTotal = this.runningTotal + roll + 1;
  this.rollCounter++;
  if (roll !== 1) {
    $("#output").text(`Rolled a ${roll} and current score is ${this.runningTotal}. Rolled a total of ${this.rollCounter} times.`);
  }
  else {
    this.turnTotal = 0
    $("#output").text(`Oops! Rolled a ${roll} and score was reset to ${this.turnTotal}. Rolled a total of ${this.rollCounter} times.`);
    if (this.player === 1) {
      $("#output").text(`It is Player 2's turn.`);
      this.active = 0;
      this.rollCounter = 0;
      playerTwo.active = 1;
    }
    else if (this.player === 2) {
      $("#output").text(`It is Player 1's turn.`);
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
  $("#output").text(`Turn is over! Rolled a total of ${this.rollCounter} times this turn. Current score is ${this.runningTotal}`)
  this.runningTotal = this.runningTotal + this.turnTotal;
  if (playerOne.active === 1) {
    playerOne.active = 0;
    playerTwo.active = 1;
    $("#output").text(`It is Player 2's turn.`);
  }
  else if (playerTwo.active === 1) {
    playerTwo.active = 0;
    playerOne.active = 1;
    $("#output").text(`It is Player 1's turn.`);
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
    $("#output").text("It is player One's turn");
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
    $("#output").text(`Player ${playerOne.player}'s rolls the dice.`);
  }
  else if (playerTwo.active === 1) {
    playerTwo.rollDice();
    $("#output").text(`Player ${playerTwo.player}'s rolls the dice.`);
  }
};

function hold() {
  if (playerOne.active === 1) {
    playerOne.hold();
    $("#output").text(`Player ${playerOne.player} decides to hold.`);
  }
  else if (playerTwo.active === 1) {
    playerTwo.hold();
    $("#output").text(`Player ${playerTwo.player} decides to hold.`);
  }
};








//Click functions


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