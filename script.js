const music = new Audio('img/music.mp3');
const button=document.getElementById('start');
button.addEventListener('click',()=>{
  location.href='game/index.html';
})
function start() {

  music.play();
  setTimeout(start, 87000);

}


localStorage.setItem("First", 600);
localStorage.setItem("Second", 500);
localStorage.setItem("Third", 300);

let first
let second
let third

let jeden = document.getElementById("top1")
let dwa = document.getElementById("top2")
let trzy = document.getElementById("top3")
let nick1 = document.getElementById("top11")
let nick2 = document.getElementById("top22")
let nick3 = document.getElementById("top33")

let wyniki = [];
first = localStorage.getItem("First");
second = localStorage.getItem("Second");
third = localStorage.getItem("Third");

function upLoad(score, nick) {


  wyniki["FIRST"] = first
  wyniki["SECOND"] = second
  wyniki["THIRD"] = third

  if (score > wyniki["FIRST"]) {
    wyniki["FIRST"] = score;
    localStorage.setItem("First", score);
  }
  else if (score > wyniki["SECOND"]) {
    wyniki["SECOND"] = score;
    localStorage.setItem("Second", score);
  }
  else if (score > wyniki["THIRD"]) {
    wyniki["THIRD"] = score;
    localStorage.setItem("Third", score);
  }

  first = localStorage.getItem("First");
  second = localStorage.getItem("Second");
  third = localStorage.getItem("Third");
  jeden.innerHTML = first
  dwa.innerHTML = second
  trzy.innerHTML = third
}

upLoad(1500)