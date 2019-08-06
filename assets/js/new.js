
$("#submit").click(function(event) {
    event.preventDefault();
    let data = {
        meme_url: $("#meme_url").val(),
    }
    $.ajax({
        url: `http://52.90.193.89/api/memes`,
        data: data,
        type: "POST"
    }).then((response) => {

        $("#meme_url").val("");
    })
})