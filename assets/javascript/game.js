document.addEventListener("DOMContentLoaded", function(){

    // declare and initialize pool of inputs and computer options
    var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var planets = ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"];

    // computer chooses a random elements from the planets array
    var computerGuess = planets[Math.floor(Math.random() * planets.length)];

    // declare and initialize counters
    var n_wins = 0;
    var n_guesses = 2*computerGuess.length;
    var correct_guesses = [];
    var guessed_letters = [];

    // length of underlines representing number of letters in chosen word
    for (l = 0; l < computerGuess.length; l++) {
        correct_guesses.push("_")
        document.getElementById("bar").textContent = correct_guesses;
    }

    document.onkeyup = function(event) {
        // resets announcement message
        // document.getElementById("announcement").textContent = "";
        // checks for valid user input (letter)
        var letter = false;
        for (i = 0; i < alphabet.length; i++) {
            if (event.key === alphabet[i]) {
                letter = true;
            };
        };
        if (letter === false) {
            document.getElementById("announcement").textcontent = "Please input an alphabetical letter.";
        } else {
        // win condition and game reset
            if (document.getElementById("bar") === computerGuess) {
                document.getElementById("bar").textContent = computerGuess;
                document.getElementById("announcement").textcontent = "Congratulations, You Win! Press a letter to play again";
                n_wins += 1;
                document.getElementById("wins").textContent = n_wins;
                guessed_letters = [];
                document.getElementById("already_guessed").textContent = guessed_letters;
                computerGuess = planets[Math.floor(Math.random() * planets.length)];
                n_guesses = 2*computerGuess.length;
                document.getElementById("guesses").textContent = n_guesses;
            } else {
                // correct guessing a letter
                if (event.key in computerGuess) {
                    correct_guesses.push(event.key + " ");
                    document.getElementById("bar").textContent = correct_guesses;
                } else {
                    // incorrect guess
                    n_guesses -= 1;
                    document.getElementById("guesses").textContent = n_guesses;
                    if (n_guesses === 0) {
                        // losing and game resetting
                        document.getElementById("announcement").textcontent = "You lose! Press a letter to play again.";
                        guessed_letters = [];
                        document.getElementById("already_guessed").textContent = guessed_letters;
                        computerGuess = planets[Math.floor(Math.random() * planets.length)];
                        n_guesses = 2*computerGuess.length;
                        document.getElementById("guesses").textContent = n_guesses;
                        for (l = 0; l < computerGuess.length; l++) {
                            document.getElementById("bar").push("_");
                        }
                    } else {
                        // standard incorrect guess; adds to guessed letters list
                        guessed_letters.push(event.key);
                        document.getElementById("already_guessed").textContent = guessed_letters;
                    };
                };
            };
        };
    };
})
