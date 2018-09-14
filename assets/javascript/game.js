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

    var funfacts = ["Because of its proximity to the Sun and its lack of atmosphere, Mercury's surface experiences a temperature difference of over 500 degrees Celsius between its daytime and nighttime.",
                    "A Venus day, equivalent to 225 Earth days, is longer than a Venus year due to Venus' extremely slow rotation. Venus also has the hottest average surfact temperature, reaching over 450 degrees Celsius, partially due to a runaway greenhouse effect.",
                    "Recent advances in astronomy shows that Earth may not be as unique as we previous knew it as. The possibility of extraterrestrial life forms existing, even within our own solar system, seems to be every increasing.",
                    "The origin of the Moon is not fully understood, but a prevailing theory is that a planetary-sized object collided with Earth soon after the formation of the Solar System, ejecting a large chunk of rock into the orbit of Earth.",
                    "Mars, despite its mythological attributes, is colder than Earth is. It is speculated to have been Earth-like in the past and recent discoveries showed that it has surface water ice.",
                    "Ceres is the largest object and only dwarf planet in the asteroid belt, accounting for a third of its mass. Water vapor plumes occasionally shoot from Ceres' surface.",
                    "Jupiter is more than two and a half times more massive than the combined mass of all other Solar System planets. In fact, due to Jupiter's gravitational influence, the center of mass of the Solar System lies outside the Sun, around which the Sun rotates, so we technically orbit around a two-body system.",
                    "Ganymede is the largest satellite of Jupiter and of the Solar System, being larger than Mercury. It is the only satellite with a strong magnetic field.",
                    "Suffering from the gravitational stretch of Jupiter on one side and that of the other satellites on the other side, Io is the most volcanically active known world. Io may eventually be torn apart by the tidal forces and become part of Jupiter's rings.",
                    "One of the most fascinating and studied worlds, Europa is theorized to contain a reservoir of subterranean liquid water ocean. This discovery contributed to the developing idea that basic life forms may be potentially everywhere.",
                    "A rigid and inactive world, Callisto displays more visible scars from impacts than any other world in the Solar System.",
                    "Saturn has many mysteries, including its infamous ring system and its hexagonal polar storm. Despite that it being much larger than Earth, Saturn has a rotational period of less than eleven hours; it spins very fast on its axis, contributing to its relative flatness.",
                    "Surrounded by a thick layer of nitrogen, Titan is Saturn's largest satellite and the only satellite in the Solar System with a dense atmosphere. Its surface contains many liquid hydrocarbon lakes, a habitat candidate for primitive lifeforms.",
                    "Similarly to Europa, Enceladus likely has a subterranean liquid water ocean and is under heavy research. In fact, water geysers were observed erupting from its surface!",
                    "Whereas other planets' orbital plane lies nearly perpendicular to their axis of rotation, Uranus' case is parallel. Tilted nearly 90 degrees from a hypothesized large collision, Uranus rotates sideways.",
                    "Miranda is the most well-known satellite of Uranus despite being fairly small. It is one of the smallest round objects in the Solar System.",
                    "Neptune is a cold, distant world at about thirty times farther away than Earth is from the Sun. Due to its large orbit, a Neptunian year is about 165 Earth years.",
                    "Tidally locked to Neptune, Triton will eventually wander very close to Neptune and be torn apart, adding to Neptune's ring system. Is it the only large satellite to orbit retrograde - it orbits in the opposite direction of Neptune's rotation.",
                    "Once one of the glorious nine planets, Pluto has been rightfully demoted to a dwarf planet since the planet reclassification. Pluto's orbit would occasionally seep into Neptune's and its orbital plane is highly tilted compared to the planets'. The first clear photo of Pluto was taken in 2015.",
                    "Briefly considered as the tenth planet before planet classification, Eris is the most massive dwarf planet and is only slightly smaller than Pluto.",
                    "The dwarf planet Haumea has an extremely fast rotational velocity; a Haumean day would be approximately 3.9 Earth hours. The speed contributes to its elliptical flatness.",
                    "Pronounced ma-kay-ma-kay, Makemake is the third largest dwarf planet. Is it possibly the largest Kuiper belt object that is not heavily influenced by Neptune's gravity."];
    
    // computer chooses a random elements from the planets array
    var object = Math.floor(Math.random() * planetary_objects.length);
    var computerGuess = planetary_objects[object];

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

        // default text
        document.getElementById("announcement").style.color = "lightskyblue";
        document.getElementById("announcement").textContent = "Which space ball is it?";
        document.getElementById("funfact").textContent = "Correctly guess the solar system object to learn a fun fact!";

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
                document.getElementById("announcement").textContent = "You've already guessed this letter. Please choose a different one.";

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
                    document.getElementById("funfact").textContent = funfacts[0];
                    document.getElementById("announcement").style.color = "lightgreen";
                    document.getElementById("announcement").textContent = "Congratulations, You Win! Press a letter to continue.";
                    n_wins += 1;
                    document.getElementById("wins").textContent = n_wins;
                    guessed_letters = [];
                    document.getElementById("already_guessed").textContent = guessed_letters.join(" ");
                    create_divs(computerGuess);
                    document.getElementById("funfact").textContent = funfacts[object];
                    object = Math.floor(Math.random() * planetary_objects.length);
                    computerGuess = planetary_objects[object];
                    n_guesses = 2*computerGuess.length;
                    document.getElementById("guesses").textContent = n_guesses;
                    guessed_letters = [];
                    document.getElementById("already_guessed").textContent = guessed_letters.join(" ");
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
                        object = Math.floor(Math.random() * planetary_objects.length);
                        computerGuess = planetary_objects[object];
                        n_guesses = 2*computerGuess.length;
                        document.getElementById("guesses").textContent = n_guesses;
                        guessed_letters = [];
                        document.getElementById("already_guessed").textContent = guessed_letters.join(" ");
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
