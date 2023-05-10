const music = new Audio('img/music.mp3');

function start() {

  music.play();
  setTimeout(start, 87000);

}


//TABLICA REKORDOW
let tablica = '{ "zawodnicy" : [' +
  '{ "nick":"John"  },' +
  '{ "nick":"Anna" },' +
  '{ "nick":"Peter" } ]}';
const obj = JSON.parse(tablica);
let top1 = document.getElementById("top1")
top1.innerHTML = tablica.zawodnicy[1].nick + " ";