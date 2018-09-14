// *****ATTENTION TAs/Grader*****

// ***NOTE: audio is supposed to play when web page loads. if it doesn't work in chrome, go to chrome://flags/#autoplay-policy and 
// change user settings to not require gesture to autoplay audio

// ***NOTE: this code uses the element.remove() method, which is supported by Chrome but may not be supported by some other browsers

// Game is most visually appealing at full browser width

document.addEventListener("DOMContentLoaded", function(){

    // plays background audio on page load
    var audio = document.getElementById("audio");
    audio.play();

    // checks to see if it's first time playing
    played = false;

    // declare and initialize arrays
    var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var planetary_objects = ["mercury", "venus", "earth", "moon", "mars", "ceres", "jupiter", "ganymede", "io", "europa", "callisto", 
    "saturn", "titan", "enceladus", "uranus", "miranda", "neptune", "triton", "pluto", "eris", "haumea", "makemake"];
    
    // computer chooses a random elements from the planets array

    var rand_index = Math.floor(Math.random() * planetary_objects.length)
    var computerGuess = planetary_objects[rand_index];

    // creates an image with the name of the object when winning/losing
    function create_divs(obj) {

        // creates an image div with the appropriate image 
        newimg = document.createElement("img");
        newimg.setAttribute("id", "picture");
        newimg.src = "assets/images/" + obj + ".png";
        newimg.style.width = "100%";
        document.getElementById("pic").appendChild(newimg);

        // name of chosen object
        newname = document.createElement("namediv");
        newimg.setAttribute("id", "picname");
        newname.textContent = obj;
        newname.style.fontSize = "32px";
        newname.style.fontFamily = "Impact"
        newname.style.color = "lightgreen"
        newname.style.textTransform = "capitalize";
        document.getElementById("pic").appendChild(newname);
    };

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

        // remove picture/text from previous win/loss
        if (played === true) {
        newimg.remove();
        newname.remove();
        };

        // default annoucement
        document.getElementById("announcement").style.color = "lightskyblue";
        document.getElementById("announcement").textContent = "Which space ball is it?";

        // remove picture/text from previous win/loss

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
            // checks if input is a duplicate (already guessed)
            var duplicate = false
            for (var d = 0; d < guessed_letters.length; d++) {
                if (event.key == guessed_letters[d]) {
                duplicate = true;
                };
            };
            
            // alert if letter already guessed
            if (duplicate === true) {
                document.getElementById("announcement").textContent = "You've already guessed this letter. Please choose a different letter.";
            
            } else {
                // correct guessing a letter: replaces the appropriate underline with the correct guess
                var correct = false;
                for (var j = 0; j < computerGuess.length; j++) { 
                    if (event.key === computerGuess[j]) {
                        correct = true;
                        correct_guesses[j] = event.key;
                        document.getElementById("bar").textContent = correct_guesses.join(" ");

                        // checks each correctly guessed letter for multiple appearances
                        multiple_letter = false
                        for (var g in guessed_letters) {
                            if (event.key === guessed_letters[g]) {
                                multiple_letter = true
                            };
                        };

                        // adds correctly guessed letter to guessed letters array only if it's not already there
                        if (multiple_letter === false) {
                            guessed_letters.push(event.key);
                        };
                        document.getElementById("already_guessed").textContent = guessed_letters.join(" ");
                    };
                };

                // win condition and game reset
                if (correct_guesses.join("").toString() === computerGuess) {
                    played = true
                    document.getElementById("announcement").style.color = "lightgreen";
                    document.getElementById("announcement").textContent = "Congratulations, You Win! Press a letter to continue.";
                    n_wins += 1;
                    document.getElementById("wins").textContent = n_wins;
                    guessed_letters = [];
                    document.getElementById("already_guessed").textContent = guessed_letters.join(" ");
                    create_divs(computerGuess);
                    computerGuess = planetary_objects[Math.floor(Math.random() * planetary_objects.length)];
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
                        played = true
                        document.getElementById("announcement").style.color = "orangered";
                        document.getElementById("announcement").textContent = "You lose! Press a letter to continue.";
                        guessed_letters = [];
                        document.getElementById("already_guessed").textContent = guessed_letters.join(" ");
                        create_divs(computerGuess);
                        computerGuess = planetary_objects[Math.floor(Math.random() * planetary_objects.length)];
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
    };
})
