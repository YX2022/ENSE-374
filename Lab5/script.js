$(document).ready(function(){
    $("#add-button").click(function(){
        var toAdd = $("input[id=userInput]").val();
        $('ul').append('<li>' + toAdd + '</li>');
   });
});

$(document).ready(function(){
    $("#remove-button").click(function(){
        $("#").empty();
        
    })
})


