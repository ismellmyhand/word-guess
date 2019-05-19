
// word array
var words = ["visual", "studio", "code", "class", "sugar", "horse", "forest", "coffee", "car", "dog", "cat", "pasta", "sky", "game", "victory", "money", "woman", "happy", "music"];
var lettersGuessed = "";

var GuessWordContainer = document.getElementById("GuessWordContainer");
var WordStatus = document.getElementById("WordStatus");
var DivWrongGuesses = document.getElementById("DivWrongGuesses");
var LettersProcessed = document.getElementById("LettersProcessed");
var TotalWins = document.getElementById("TotalWins");
var guessWordLetters = [];
var unGuessedLetters;
var guessLetter;
var guessWord = getNewGuessWord();
var WrongGuesses = 0;
var winCount = 0;
var gameOverWinMsg = "Congratulations you win!";
var gameNotOverMsg = "Guess Word Letters to Win!";
var gameReset = false;



resetGame();

function getNewGuessWord() {
return  words[Math.floor(Math.random() * words.length)];

}


function resetGame() {
    guessWord = getNewGuessWord();
    document.getElementById("GuessWordContainer").innerHTML = guessWord;
    unGuessedLetters = guessWord.length;
    WrongGuesses=0;
    guessWordLetters = [];

    lettersGuessed = "";
    LettersProcessed.innerHTML = lettersGuessed;
    document.getElementById("WordStatus").innerHTML = "Guess a letter";
    document.getElementById("DivWrongGuesses").innerHTML = WrongGuesses;
    gameReset = false;
    for (var i = 0; i < guessWord.length; i++) {
        guessWordLetters[i] = "_";
    }
    
    GuessWordContainer.innerHTML = guessWord;
    document.getElementById("WordStatus").innerHTML = gameNotOverMsg;
    }



function XYZ(guessLetter) {
    if (gameReset == true) {
        gameReset = false;
        resetGame();
        return;
    }
    var wrongGuess = true;
    //if valid guessLetter check to see if letter is in guessWordLetters
    
    for (var x = 0; x < guessWord.length; x++) {
        if (guessWord[x] === guessLetter) {
            guessWordLetters[x] = guessLetter;
            wrongGuess = false;
            unGuessedLetters--;
            
        }

    }
    WrongGuesses = WrongGuesses + wrongGuess;
    DivWrongGuesses.innerHTML = WrongGuesses;
    document.getElementById("WordStatus").innerHTML = guessWordLetters;
    if (unGuessedLetters <= 0) {
        document.getElementById("WordStatus").innerHTML = gameOverWinMsg;
        winCount = winCount +1;
        TotalWins.innerHTML = winCount;
        //break;
    }

}
//}

document.onkeypress = function (keyPressed) {
    var tmp;
    charCode = keyPressed.keyCode
    lettersGuessed = lettersGuessed + ' ' + String.fromCharCode(charCode);
    LettersProcessed.innerHTML = lettersGuessed;

    guessLetter = String.fromCharCode(charCode)
    tmp = checkForGuessLimit();
    if((document.getElementById("WordStatus").innerHTML == gameOverWinMsg) || (tmp == "true"))
     {
         //person either won or the guess limit was exceeded
        resetGame();
        //gameReset=true;
        return;
    }
    //alert(checkForGuessLimit(lettersGuessed));
    if (gameReset == false && checkForGuessLimit() == "false") {
        XYZ(guessLetter);

}
}


function checkForGuessLimit() {
        var GuessLimit;
        GuessLimit = WrongGuesses;
        if (GuessLimit > 7){
            alert("Maximum Guesses Exceeded - Next Guess Word Coming Right Up");
            resetGame();
            return "true";

        }
            return "false";

    }
function resetWinCount() {

winCount = 0;
document.getElementById("TotalWins").innerHTML = winCount;
resetGame();

}
