var game = [];
var count ;
function startButton() {
    $(document).off();
    $("#start").click(() => {
        count = 0;
        $.ajax({
            url: "http://52.90.193.89/api/students",
            type: "GET"
        }).then((response) => {
            if (response.length) {
                game = response;
                game = shuffle(game);
                startDisplay();
                $("#next").click(() => {
                    console.log("hello");
                    nextCard();
                })
                $("#prev").click(() => {
                    prevCard();
                });
            }
            else {
                errorDisplay();
            }
        })
    })
}
// Fisher-Yates (aka Knuth) Shuffle
// Taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/25984542
function shuffle(array) {
    var currentIndex = array.length - 1, temporaryValue, randomIndex;
    randomIndex = Math.floor(Math.random() * currentIndex);
    while (currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        currentIndex --;
    }
    return array;
}
function errorDisplay() {
    var error = $("<h1>");
    error.text("Something went wrong... try again soon!");
    $("#root").append(error);
}
function startDisplay() {
    // creating flex div
    var div = $("<div>");
    div.addClass("d-flex game-container justify-content-around align-items-center");
    // creating left arrow
    let leftArrow = $("<i>");
    leftArrow.addClass("far fa-arrow-alt-circle-left fa-3x")
    leftArrow.attr("id", "prev");
    // creating card
    let card = $("<div>");
    card.attr("id", "card");
    // creating right arrow
    let rightArrow = $("<i>");
    rightArrow.addClass("far fa-arrow-alt-circle-right fa-3x")
    rightArrow.attr("id", "next");
    div.html(leftArrow);
    div.append(card);
    div.append(rightArrow);
    $("#root").html(div);
    displayCard();
    flipCard();
}
function displayCard() {
    if (count === game.length) {
        var restart = $("<button>")
        restart.html("<i class='fas fa-play'></i>&nbsp;Restart");
        restart.attr("id","start");
        $("#root").html(restart);
        startButton();
    }
    else {
        $("#card").addClass("position-relative")
        let cardFront = $("<div>");
        cardFront.addClass("position-absolute card-front");
        let memeImg = $("<img>");
        memeImg.attr("src", game[count].meme_url);
        cardFront.html(memeImg);
        let cardBack = $("<div>");
        cardBack.text(game[count]);
        cardBackText = $("<h1>")
        cardBackText.text(`${game[count].firstName} ${game[count].lastName}`);
        cardBack.html(cardBackText);
        cardBack.addClass("position-absolute card-back");
        $("#card").html(cardFront);
        $("#card").append(cardBack);
    }
}
function flipCard() {
    let card = $("#card");
    // add flip card on click event
    card.click(() => {
        if (card.hasClass("flipped")){
            $("#card").removeClass("flipped");
        }
        else {
            $("#card").addClass("flipped");
        }
    });
}
function nextCard() {
    let card = $("#card");
    if (card.hasClass("flipped")) {
        card.removeClass("flipped");
        setTimeout(() => {
            count ++;
            displayCard();
        }, 750);
    }
    else {
        count ++;
        displayCard();
    }
}
function prevCard() {
    if (count) {
        let card = $("#card");
        if (card.hasClass("flipped")) {
            card.removeClass("flipped");
            setTimeout(() => {
                count --;
                displayCard();
            }, 750);
        }
        else {
            count --;
            displayCard();
        }
    }
}
startButton();