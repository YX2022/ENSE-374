$(document).ready(function(){
    $("#add-button").click(function(){
        var inputValue = $("#userInput").val();
        $('ul').append(
            '<li>' + '<input type="checkbox">' + inputValue + '</li>' + '<button type="btn btn-outline-secondary" id="claim" >claim</button>'
        );
   });
});

$(document).ready(function(){
    $("#remove-button").click(function(){
        $("#").empty();

    });
});