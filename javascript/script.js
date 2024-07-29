// Krish Lavani - 8998302

"use strict";

// selecting a random word from wordlist
let chosenWordObj = wordList[Math.floor(Math.random() * wordList.length)];
// store only word in variable
let chosenWord = chosenWordObj.word;
// store only hint in variable
let hint = chosenWordObj.hint;
// create array with underscore to represent unguessed word
let displayWord = "_".repeat(chosenWord.length).split("");
// sets attempts to 6
let attempts = 6;


// code run when DOM is fully loaded
$(document).ready(()=>{
    // call every functions
    updateWord();
    updateHint();
    updateAttempt();
    createKeyboard();
    
    // set reset button to reset function
    $("#reset").click(reset);
});

// update word with guessed letters
function updateWord() {
    $("#word").text(displayWord.join(" "));
}

//display and update hint for current word
function updateHint() {
    $("#hint").text(`Hint: ${hint}`);
}

// update attempts and images after every guess
function updateAttempt() {
    $("#attempt").text(`Attempt left: ${attempts}`);
    $("#hangmanImage").attr("src", `./images/step${6-attempts}.png`);
}

// create keyboard on screen for viewer
function createKeyboard(){
    // create array of letters
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    // get keyboard ID
    const $keyboard = $("#keyboard");
    
    alphabet.forEach( letter => {
        //create button for each letter
        const $button = $("<button></button>")
            .text(letter)
            //add class for css
            .addClass("key")
            // add click event handler for button
            .click(() => handleGuess(letter, $button));
        // append keyboard button
        $keyboard.append($button);
    });
}


function handleGuess(letter, $button){
    //disable button after click
    $button.prop("disabled",true);
    // if letter is in word then display on word
    if(chosenWord.includes(letter)){
        for(let i=0; i < chosenWord.length; i++){
            if(chosenWord[i] === letter){
                // display word where guess word are
                displayWord[i] = letter;
            }
        }
        // update display word
        updateWord();
        // check if viewer win or not
        win();
    }
    else{
        // if viewer guess wrong word then decrement attempts
        attempts--;
        // update attempts
        updateAttempt();
        // if attempts are not left then end the game
        if(attempts===0){
            gameEnd(false);
        }
    }
}

//function that check player is win or not
function win(){
    // there is no underscore in word then player has won
    if(!displayWord.includes("_")){
        gameEnd(true); // end game with win
    }
}

// function display appropriate message 
function gameEnd(win){
    if(win){
        // win message 
        $("#message").text("You Win!");
    }else{
        // game over message
        $("#message").text(`Game Over! The word was: ${chosenWord}`);
    }
    //disable all the keys
    $(".key").prop("disable",true);
}

// reset function that reset and update all the functions and variables
function reset(){
    chosenWordObj = wordList[Math.floor(Math.random() * wordList.length)];
    chosenWord = chosenWordObj.word;
    hint = chosenWordObj.hint;
    displayWord = "_".repeat(chosenWord.length).split("");
    attempts = 6;
    updateWord();
    updateHint();
    updateAttempt();
    //clear the message
    $("#message").text("");
    // enable all keys again
    $(".key").prop("disable",false);
}
