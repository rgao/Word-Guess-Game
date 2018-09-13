document.addEventListener("DOMContentLoaded", function(){

    // declare and initialize pool of inputs and computer options
    var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var planets = ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune", "ceres", "pluto", "eris", 
        "ganymede", "io", "europa", "enceladus", "titan"];

    // computer chooses a random elements from the planets array
    var computerGuess = planets[Math.floor(Math.random() * planets.length)];
    console.log(computerGuess);

    // declare and initialize counters
    var n_wins = 0;
    var n_guesses = 2*computerGuess.length;
    var correct_guesses = [];
    var guessed_letters = [];

    // show variable values on html webpage
    document.getElementById("wins").textContent = n_wins;
    document.getElementById("guesses").textContent = n_guesses;

    // function that takes dynamically alters the html element <bar>, which is the number of underlines equal to length 
    // of the inputed word argument
    function bar_length(word) {
        for (var l = 0; l < word.length; l++) {
            correct_guesses.push("_");
            document.getElementById("bar").textContent = correct_guesses.join(" ");
        };
    };   

    // set the number of underlines equal to the length of the computer chosen word
    bar_length(computerGuess);

    document.onkeyup = function(event) {
        // default annoucement
        document.getElementById("announcement").textContent = "Which space ball is it?";

        // checks for valid user input (letter)
        var letter = false;
        for (var i = 0; i < alphabet.length; i++) {
            if (event.key == alphabet[i]) {
                letter = true;
            };
        };

        // alert if input not a letter
        if (letter === false) {
            document.getElementById("announcement").textContent = "Please input an alphabetical letter.";

        } else {
            // correct guessing a letter: replaces the appropriate underline with the correct guess
            var correct = false;
            for (j = 0; j < computerGuess.length; j++) { 
                if (event.key === computerGuess[j]) {
                    correct_guesses[j] = event.key;
                    document.getElementById("bar").textContent = correct_guesses.join(" ");
                    correct = true;
                    console.log(correct_guesses.toString());
                };
            };

            // win condition and game reset
            if (correct_guesses.join("").toString() === computerGuess) {
                document.getElementById("announcement").textContent = "Congratulations, You Win! Press a letter to play again";
                n_wins += 1;
                document.getElementById("wins").textContent = n_wins;
                guessed_letters = [];
                document.getElementById("already_guessed").textContent = guessed_letters.join(" ");
                computerGuess = planets[Math.floor(Math.random() * planets.length)];
                n_guesses = 2*computerGuess.length;
                document.getElementById("guesses").textContent = n_guesses;
                correct_guesses = [];
                bar_length(computerGuess);
            };

            // incorrect guesses
            if (correct === false) {
                n_guesses -= 1;
                document.getElementById("guesses").textContent = n_guesses;
                if (n_guesses === 0) {

                    // losing and game resetting
                    document.getElementById("announcement").textContent = "You lose! Press a letter to play again.";
                    guessed_letters = [];
                    document.getElementById("already_guessed").textContent = guessed_letters.join(" ");
                    computerGuess = planets[Math.floor(Math.random() * planets.length)];
                    n_guesses = 2*computerGuess.length;
                    document.getElementById("guesses").textContent = n_guesses;
                    correct_guesses = [];
                    bar_length(computerGuess);

                } else {
                    // standard incorrect guess; adds to guessed letters list
                    guessed_letters.push(event.key);
                    document.getElementById("already_guessed").textContent = guessed_letters.join(" ");
                };
            };
        };
    };
})
