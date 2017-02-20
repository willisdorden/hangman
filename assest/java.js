//pick random word from array of words
var words = [{ w: 'queen', h: "mercury" }, { w: 'yes', h: 'lonely heart' }, { w: 'rush', h: 'drums' }, { w: 'led zeppelin', h: 'heaven' }, { w: 'the who', h: 'townshend' }, { w: 'elvis costello', h: 'aim is true' }, { w: 'grateful dead', d: 'garcia' }];

var wins = 0
var letterCheck = /^[a-z]+$/;
var winAudio = new Audio("sound/champion.mp3");
var loseAudio = new Audio("sound/loser.mp3");

var hangman = [
        "assest/img/stage1.png",
        "assest/img/stage2.png",
        "assest/img/stage3.png",
        "assest/img/stage4.png",
        "assest/img/stage5.png ",
        "assest/img/stage7.png",
        "assest/img/stage8.png ",
        "assest/img/stage9.png"
    ],
    j;

function gameReady() {
    var playKey = 'Press any key to start playing!';
    document.querySelector('#playDisplay').innerHTML = playKey;
}

gameReady();

document.onkeyup = function gameSet(event) {
    document.querySelector('#playDisplay').innerHTML = '';

    var wordBlanks = [],
        i, k;
    var wordChoice = Math.floor(Math.random() * words.length);
    wordBlanks.push(words[wordChoice].w);
    for (k = 0; k < words[wordChoice].w.length; k++) {
        wordBlanks[k] = '_';
    }

    var wordBuild = wordBlanks.join('  ');
    document.querySelector('#wordDisplay').innerHTML = wordBuild;
    var hint = words[wordChoice].h;
    document.querySelector('#hint').innerHTML = hint;
    var wrongGuesses = 8;
    var stageFright = [],
        j;
    var show = "";
    var man = "";
    document.querySelector('.singer').innerHTML = man;
    var fright = stageFright.join('  ');
    var wrongGuesses = "You have " + wrongGuesses + " wrong guesses left";
    document.querySelector('#stageDisplay').innerHTML = fright;
    document.querySelector('#wrongGuess').innerHTML = wrongGuesses;


    console.log("word is " + words[wordChoice].w);
    console.log("hint is " + words[wordChoice].h);


    document.onkeyup = function gameGo(event) {
        document.querySelector('#playDisplay').innerHTML = '';
        var playerEntry = String.fromCharCode(event.keyCode).toLowerCase();
        console.log("letter guessed:  " + playerEntry);


        for (i = 0; i < words[wordChoice].w.length; i++) {
            if (words[wordChoice].w[i] === playerEntry) {
                wordBlanks[i] = words[wordChoice].w[i];
                //display letter in the correct blanks
                var wordBuild = wordBlanks.join('  ');
                document.querySelector('#wordDisplay').innerHTML = wordBuild;
                var blankCompare = wordBlanks.join('');
                if (blankCompare == words[wordChoice].w) {
                    wins++;
                    winAudio.play();
                    confirmWin = 'Amazing job!.';
                    document.querySelector('#playDisplay').innerHTML = confirmWin;
                    var wins = "You've won " + wins + " games!";
                    document.querySelector('#winsDisplay').innerHTML = wins;
                    setTimeout(gameSet, 3000);
                }
            }
        }

        if ((stageFright.includes(playerEntry)) || (!playerEntry.match(letterCheck))) {
            console.log("Not a valid guess.");
            var noValidKey = 'Not a valid guess.'
            document.querySelector('#playDisplay').innerHTML = noValidKey;
        } else if (!words[wordChoice].w.includes(playerEntry)) {
            stageFright.push(playerEntry);
            wrongGuesses--;
            console.log(wrongGuesses);


            for (j = 0; j < stageFright.length; j++) {
                j = stageFright.indexOf(playerEntry);
                if (stageFright.length > 0) {
                    var show = hangman[j];
                    var man = "<img src='" + show + "' alt='man gets hung as the player guesses wrong letters'>";
                    document.querySelector('.singer').innerHTML = man;
                    var fright = stageFright.join('  ');
                    var wrongGuesses = "You have " + wrongGuesses + " wrong guesses left";
                    document.querySelector('#stageDisplay').innerHTML = fright;
                    document.querySelector('#wrongGuess').innerHTML = wrongGuesses;
                }
            }

        }

        if (stageFright.length == 8) {
            loseAudio.play();
            var confirmLoss = ('Stage Fright has come.  The word is ' + words[wordChoice].w + '.');
            document.querySelector('#playDisplay').innerHTML = confirmLoss;
            setTimeout(gameSet, 3000);
        }
    }
}
