var students;
$("#load").click(() => {
    $.ajax({
        url: "http://52.90.193.89/api/students",
        type: "GET"
    }).then((response) => {
        students = response;
        $.ajax({
            url: "http://52.90.193.89/api/memes",
            type: "GET"
        }).then((response2) => {
            loadCards(response2);
            flipCards();
        });
    });
});
function loadCards(res) {
    $("#root").html("");
    for(let i = 0; i < res.length; i++) {
        $("#root").append(displayCard(res[i]));
    }
}
function displayCard(content) {
    let card = $("<div>");
    card.addClass("card");
    let cardFront = $("<div>");
    cardFront.addClass("position-absolute card-front");
    let memeImg = $("<img>");
    memeImg.attr("src", content.meme_url);
    cardFront.html(memeImg);
    let cardBack = $("<div>");
    cardBack.text(game[count]);
    cardBackForm = $("<form>");
    cardBackLabel = $("<label>");
    cardBackLabel.attr("for", content._id);
    cardBackLabel.text("Select a student and submit the form to vote!");
    cardBackForm.html(cardBackLabel);
    let cardBackSelect = $("<select");
    for(let i = 0; i < students.length; i++) {
        let option = $("<option>");
        option.attr("value", students[i]._id);
        cardBackSelect.append(option);
    }
    cardBackForm.append(cardBackSelect);
    cardBackSubmit = $("<button>");
    cardBackSubmit.attr("id", content._id);
    cardBackForm.append(cardBackSubmit);
    cardBack.html(cardBackForm);
    cardBack.addClass("position-absolute card-back");
    card.append(cardBack);
    $(`#${content._id}`).click((event) => {
        event.preventDefault();
        let data = {
            student_id: $(this).parent().find("select"),
        }
        $.ajax({
            url: `http://52.90.193.89/api/memes/${$(this).attr("id")}`,
            data: data,
            type: "PUT"
        }).then((response) => {
            let success = $("<h1>");
            let check = $("<i>");
            check.addClass("fas fa-check");
            success.append(check);
            success.text("Thank you for submitting your answer");
            success.addClass("text-success")
            $(this).parent().parent().html(success);
            $(this).parent().parent().parent().removeClass("flipped");
        })
    })
    return card;
}
function flipCards() {
    let card = $(".card");
    // add flip card on click event
    card.click((event) => {
        if ($(this).hasClass("flipped")){
            $(this).removeClass("flipped");
        }
        else {
            $(this).addClass("flipped");
        }
    });
}