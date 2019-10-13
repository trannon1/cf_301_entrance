var player1 = 'X';
var player2 = 'O';

var player = 1;
var movesMade = 1;

var message = $('.messageBox');
var reset = $('.reset');

var sqr = $('.square');
var score = $('.scoreBox');

// Stores username of player for local session

function storeName() {
    sessionStorage.name = document.getElementById("name").value;
    document.getElementById("showName").innerHTML = sessionStorage.name;
    sessionStorage.score = 0;
}

// Defaults username to Guest

function displayName(){
    if(sessionStorage.name == undefined){
      sessionStorage.name = "Guest";
      document.getElementById("showName").innerHTML = sessionStorage.name;
    }
    else{
      document.getElementById("showName").innerHTML = sessionStorage.name;
    }
}

// Switchs from welcome screen to game screen

function displaygame(){
    var all = document.getElementsByClassName("welcome");
    for (var i = 0; i < all.length; i++){
      all[i].style.display = "none";
    }
    var all = document.getElementsByClassName("board-container");
    for (var i = 0; i < all.length; i++){
      all[i].style.display = "flex";
    }
    var all = document.getElementsByClassName("flex-container");
    for (var i = 0; i < all.length; i++){
      all[i].style.display = "flex";
    }
    if(sessionStorage.score == undefined){
        sessionStorage.score = 0;
    }
    score.css('display', "block");
    score.html("Number of wins: " + sessionStorage.score);
}

sqr.on('click', (e) => {
    //this is keeping track of whose turn it is
    //if it's odd then it's player one's turn else player two's
    if (player === 1 && event.target.innerHTML !== player1 && event.target.innerHTML !== player2) {
        message.css('display', "block");
        message.html("Moves made: " + movesMade);
        event.target.innerHTML = player1;
        event.target.style.color = "red";
        player++;
        movesMade++;
    } else if (player === 2 && event.target.innerHTML !== player1 && event.target.innerHTML !== player2){
        message.css('display', "block");
        message.html("Moves made: " + movesMade);
        event.target.innerHTML = player2;
        event.target.style.color = "green";
        player--;
        movesMade++;
    }

    if (checkForWinner()) {
        theWinner = player == 1 ? player2 : player1;
        declareWinner(theWinner);
    }

    
    if (movesMade > 9){
        endGame();
    }
});

reset.on('click', (e) => {
    var moves = Array.prototype.slice.call($(".square"));
    moves.map((m) => {
        m.innerHTML = "";
    });
    message.html('');
    message.css('display', "none");
    player = 1;
    movesMade = 1;
    sqr.on('click', (e) => {
        //this is keeping track of whose turn it is
        //if it's odd then it's player one's turn else player two's
        if (player === 1 && event.target.innerHTML !== player1 && event.target.innerHTML !== player2) {
            message.css('display', "block");
            message.html("Moves made: " + movesMade);
            event.target.innerHTML = player1;
            event.target.style.color = "red";
            player++;
            movesMade++;
        } else if (player === 2 && event.target.innerHTML !== player1 && event.target.innerHTML !== player2){
            message.css('display', "block");
            message.html("Moves made: " + movesMade);
            event.target.innerHTML = player2;
            event.target.style.color = "green";
            player--;
            movesMade++;
        }
    
        if (checkForWinner()) {
            theWinner = player == 1 ? player2 : player1;
            declareWinner(theWinner);
        }
    
        
        if (movesMade > 9){
            endGame();
        }
    });
});

function declareWinner(winner) {
    message.css('display', "block");
    winner = winner === player1 ? 'Player1' : 'Player2';
    message.html("Congrats on beating yourself");
    $('.square').off('click');
    sessionStorage.score++;
    score.html("Number of wins: " + sessionStorage.score)
}

function endGame(){
    message.css('display', "block");
    reset.css('display', 'block');
    message.html("Can you not defeat yourself?");
    $('.square').off('click');
}

function checkForWinner() {
    //need at least four moves to check for a winner
    if (movesMade > 5) {
        var sqr = $('.square');
        //research why we need call here!
        var moves = Array.prototype.slice.call($(".square"));
        var results = moves.map(function(square) { return square.innerHTML; });
        var winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return winningCombos.find(function(combo) {
            if (results[combo[0]] !== "" && results[combo[1]] !== "" && results[combo[2]] !== "" && results[combo[0]] === results[combo[1]] && results[combo[1]] === results[combo[2]]) {
                return true;
            } else {
                return false;
            }
        });
    }
}