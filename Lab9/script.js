var todoHolder = $('#todoList');

var add = function(){
    var todo = $('#userInput');
    if(todo.val() ==''){
        alert('please write something');
    }else{
        var listItem = $('<li><input type="checkbox">' + todo.val() + '<button class="btn btn-outline-secondary" id="claim">claim</button> </li>');
        todoHolder.append(listItem);
        todo.val('');
        var newtodo = todoHolder.find('li').last();
        newtodo.find('.')
        newtodo.find('input[type="checkbox"]').on('click',marktodo);
    }
};



$('#userInput').next().on('click', add);
