//Player Business Logic
function Player() {
  this.runningTotal = 0;
  this.rollCounter = 0;
  this.turnTotal = 0;
  this.numDice = 5;
  // this.winCounter = 0;
  // // this.lossCounter =0;
  // this.computer = false;
  // this.difficulty = false;
}

Player.prototype.generateTotal = function () {
  let roll = Math.floor(Math.random() * 6) + 1;
  this.runningTotal = this.runningTotal + roll
  this.rollCounter++;
  this.turnTotal++;
  this.turnTotal = this.turnTotal + roll;
  if (roll !== 1) {
    console.log(`Rolled a ${roll} and current score is ${this.runningTotal}. Rolled a total of ${this.rollCounter} times.`);
  }
  else {
    this.turnTotal = 0
    this.hold();
    console.log(`Oops! Rolled a ${roll} and score was reset to ${this.turnTotal}. Rolled a total of ${this.rollCounter} times.`);
  }
}

  Player.prototype.rollDice = function () {
    for (i = 1; this.numDice >= i; i++) {
      this.generateTotal();
    }
  }

  Player.prototype.hold = function() {
    console.log(`Turn is over! Rolled a total of ${rollingCounter} times this turn. Current score is ${runningTotal}`)
    this.runningTotal = this.runningTotal + this.turnTotal;
  }

  Player.prototype.computerMove = function() {
    if (this.difficulty === false) {
        this.generateTotal();
        this.generateTotal();
        this.rollCounter = 0;
        this.hold();
        }
    else {
      console.log("Hard AI here")
        if (playerOne.runningTotal > computerPlayer.runningTotal) {
        this.generateTotal();
      }
    }
  }

  //Initialize players
  let playerOne = new Player();
  let playerTwo = new Player();
  let computerPlayer = new Player();
  
// console.log(playerOne.rollDice());
  console.log(computerPlayer.computerMove())
  console.log(computerPlayer.computerMove())

//UI Logic
$(document).ready(function() {
  event.preventDefault()
});

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
// return (vowelsTest ? vowelsCounted++ && console.log(vowelsCounted) : console.log(vowelsCounted));
// }
// }

// let stringTest = "heyhey";
// checkVowel(stringTest);