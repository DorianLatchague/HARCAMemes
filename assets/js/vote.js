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
    res.sort((x,y) => {
        let count_x = 0, count_y = 0;
        for (let i = 0; i < x.length; i++) {
            count_x += x.votes[i].count;
            count_y += y.votes[i].count;
        }
        return count_x > count_y ? -1 : count_x < count_y ? 1 : 0;
    })
    $("#root").html("");
    for(let i = 0; i < res.length; i++) {
        $("#root").append(displayCard(res[i]));
    }
    $(".submit").click(function(event) {
        event.preventDefault();
        let data = {
            student_id: $(this).parent().find("select").val(),
        }
        console.log(data);
        $.ajax({
            url: `http://52.90.193.89/api/memes/${$(this).val()}`,
            data: data,
            type: "PUT"
        }).then((response) => {
            console.log(response);
            let success = $("<h1>");
            let check = $("<i>");
            check.addClass("fas fa-check");
            success.append(check);
            success.text("Thank you for submitting your vote");
            success.addClass("text-success")
            $(this).parent().parent().html(success);
            $(this).parent().parent().parent().removeClass("flipped");
        })
    })
}
function totalCount(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        total += arr[i].count;
    }
    return total;
}
function displayCard(content) {
    let card = $("<div>");
    card.addClass("cards mt-2");
    let cardFront = $("<div>");
    cardFront.addClass("position-absolute flex-column card-front text-center");
    let memeImg = $("<img>");
    memeImg.attr("src", content.meme_url);
    cardFront.html(memeImg);
    card.html(cardFront);
    let totalVotes = $("<p>");
    totalVotes.text(`${totalCount(content.votes)} Total Votes`)
    cardFront.append(totalVotes);
    let cardBack = $("<div>");
    cardBackForm = $("<form>");
    cardBackForm.addClass("")
    cardBackLabel = $("<label>");
    cardBackLabel.attr("for",`select_${content._id}`);
    cardBackLabel.text("Select a participant and submit the form to vote!");
    cardBackForm.html(cardBackLabel);
    let cardBackSelect = $("<select>");
    cardBackSelect.addClass("form-control");
    cardBackSelect.attr("id",`select_${content._id}`)
    cardBackSelect.attr("name",content._id)
    content.votes = content.votes.sort((x, y) => {
       return parseInt(x.count) > parseInt(y.count) ? -1 : parseInt(x.count) < parseInt(y.count) ? 1 : 0;
    });
    for(let i = 0; i < content.votes.length; i++) {
        let option = $("<option>");
        option.text(`${content.votes[i].student.firstName} ${content.votes[i].student.lastName} : ${content.votes[i].count} Votes`);
        option.val(content.votes[i].student._id);
        cardBackSelect.append(option);
    }
    cardBackForm.append(cardBackSelect);
    cardBackSubmit = $("<button>");
    cardBackSubmit.text("Vote");
    cardBackSubmit.addClass("submit");
    cardBackSubmit.val(content._id);
    cardBackForm.append(cardBackSubmit);
    cardBackForm.click(function(event) {
        event.stopPropagation();
    })
    cardBack.html(cardBackForm);
    cardBack.addClass("position-absolute card-back");
    card.append(cardBack);
    return card;
}
function flipCards() {
    let card = $(".cards");
    // add flip card on click event
    card.on("click", function() {
        console.log(card);
        console.log($(this));
        if ($(this).hasClass("flipped")){
            $(this).removeClass("flipped");
        }
        else {
            $(this).addClass("flipped");
        }
    });
}