var colors = ["blue", "orange", "red", "yellow"];
var currentColor = 0;

function changeColor() {
  var cells = document.getElementsByClassName('box');
  for (var i = 0; i < cells.length; i++) {
    cells[i].style.backgroundColor = colors[currentColor];
  }
  currentColor = (currentColor + 1) % colors.length;
}
