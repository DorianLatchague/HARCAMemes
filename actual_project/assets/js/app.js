var game = [];
var count = 0;
$("#start").click(() => {
    $.ajax({
        url: "...",
        method: "GET"
    }, (response) => {
        if (response.length) {
            game = response
            startDisplay();
        }
        else {
            errorDisplay();
        }
    })
})
$("#next").click(() => {
    nextCard();
})
$("#prev").click(() => {
    prevCard();
});
function errorDisplay() {
    var error = $("<h1>");
    error.text("Something went wrong... try again soon!");
    $("#root").append(error);
}
function startDisplay() {
    // creating flex div
    var div = $("<div>");
    div.addClass("d-flex justify-content-around");
    // creating left arrow
    let leftArrow = $("<i>");
    leftArrow.addClass("fas fa-arrow-left fa-3x rounded-circle")
    leftArrow.attr("id", "prev");
    // creating card
    let card = $("<div>");
    card.attr("id", "card");
    // creating right arrow
    let rightArrow = $("<i>");
    rightArrow.addClass("fas fa-arrow-right fa-3x rounded-circle")
    rightArrow.attr("id", "next");
    div.html(leftArrow);
    div.append(card);
    div.append(rightArrow);
    $("#root").html(div);
    displayCard();
    flipCard();
}
function displayCard() {
    $("#card").addClass("position-relative")
    let cardFront = $("<div>");
    cardFront.addClass("position-absolute card-front");
    let memeImg = $("<img>");
    // memeImg.attr("src", game[count].meme_url);
    cardFront.html(memeImg);
    let cardBack = $("<div>");
    cardBack.text(game[count]);
    cardBackText = $("<h1>")
    // cardBackText.text(`${game[count].firstName} ${game[count].lastName}`);
    cardBack.html(cardBackText);
    cardBack.addClass("position-absolute card-back");
    $("#card").html(cardFront);
    $("#card").append(cardBack);
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
    if (count !== game.length) {
        count ++;
        displayCard();
    }
}
function prevCard() {
    if (count) {
        count --;
        displayCard();
    }
}