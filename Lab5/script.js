$(document).ready(function(){
    $("#add-button").click(function(){
        var inputValue = $("input[id=userInput]").val();
        $("ul").append('<li>' + inputValue + '</li>');
   });
});

$(document).ready(function(){
    $("#remove-button").click(function(){
        $("#").empty();

    })
})


