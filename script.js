const music = new Audio('img/music.mp3');

function start() {

  music.play();
  setTimeout(start, 87000);

}