const music = new Audio('img/music.mp3');
const button = document.getElementById('start');
button.addEventListener('click', () => {
  location.href = 'game/index.html';
})
function start() {

  music.play();
  setTimeout(start, 87000);

}


localStorage.setItem("First", 0);
localStorage.setItem("Second", 0);
localStorage.setItem("Third", 0);
localStorage.setItem("NICK1", "EMPTY");
localStorage.setItem("NICK2", "EMPTY");
localStorage.setItem("NICK3", "EMPTY");

let first
let second
let third
let NICK_ONE
let NICK_SECOND
let NICK_THIRD
let cur_nick

let jeden = document.getElementById("top1")
let dwa = document.getElementById("top2")
let trzy = document.getElementById("top3")



let nick1 = document.getElementById("top11")
let nick2 = document.getElementById("top22")
let nick3 = document.getElementById("top33")

let wyniki = [];
let nicki = [];

first = localStorage.getItem("First");
second = localStorage.getItem("Second");
third = localStorage.getItem("Third");

NICK_ONE = localStorage.getItem("NICK1");
NICK_SECOND = localStorage.getItem("NICK2");
NICK_THIRD = localStorage.getItem("NICK3");

function upLoad(score) {


  wyniki["FIRST"] = first
  wyniki["SECOND"] = second
  wyniki["THIRD"] = third

  nicki["NICK_F"] = NICK_ONE
  nicki["NICK_S"] = NICK_SECOND
  nicki["NICK_T"] = NICK_THIRD

  if (score > wyniki["FIRST"]) {
    wyniki["FIRST"] = score;
    nicki["NICK_F"] = prompt("Podaj nick")
    localStorage.setItem("First", score);
    localStorage.setItem("NICK1", nicki["NICK_F"])
  }
  else if (score > wyniki["SECOND"]) {
    wyniki["SECOND"] = score;
    nicki["NICK_S"] = prompt("Podaj nick")
    localStorage.setItem("Second", score);
    localStorage.setItem("NICK2", nicki["NICK_S"])
  }
  else if (score > wyniki["THIRD"]) {
    wyniki["THIRD"] = score;
    nicki["NICK_T"] = prompt("Podaj nick")
    localStorage.setItem("Third", score);
    localStorage.setItem("NICK3", nicki["NICK_T"])
  }

  first = localStorage.getItem("First");
  second = localStorage.getItem("Second");
  third = localStorage.getItem("Third");
  NICK_ONE = localStorage.getItem("NICK1");
  NICK_SECOND = localStorage.getItem("NICK2");
  NICK_THIRD = localStorage.getItem("NICK3");
  jeden.innerHTML = first
  dwa.innerHTML = second
  trzy.innerHTML = third
  nick1.innerHTML = NICK_ONE
  nick2.innerHTML = NICK_SECOND
  nick3.innerHTML = NICK_THIRD
}

upLoad(1500)