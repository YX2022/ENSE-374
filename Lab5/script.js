function add(){

  var li = document.createElement("li");
  var inputValue = document.getElementById("userInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("userInput").value = "";
}
function sort(){
  var list = document.getElementById("myUL");
  var switching = true;
  while (switching) {
    switching = false;
    var b = list.getElementsByTagName("LI");
    for (i = 0; i < (b.length - 1); i++) {
      var shouldSwitch = false;
      if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
        var shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }

}
}

