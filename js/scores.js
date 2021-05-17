function printHighscores() {
  var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  highscores.forEach((score) => {
    var liList = document.createElement('li');
    liList.textContent = score.initials + ' - ' + score.score;
    // display on page
    var olList = document.getElementById('highscores');
    olList.appendChild(liList);
  });
}
document.getElementById('clear').onclick = clearHighscores;
function clearHighscores() {
  window.localStorage.removeItem('highscores');
  window.location.reload();
}
// run function when page loads

printHighscores();
