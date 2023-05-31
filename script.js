const music = new Audio('img/music.mp3');
const button=document.getElementById('start');
button.addEventListener('click',()=>{
  location.href='game/index.html';
})
function show_logo(){
  const zsl_logo=document.getElementById('logo_place');
  zsl_logo.style.animation="1.5s photo-zoom forwards";
  setTimeout(hide_logo,2000);
}
function hide_logo(){
  const zsl_logo=document.getElementById('logo_place');
  zsl_logo.style.animation="1.5s photo-hide forwards";
  zsl_logo.addEventListener('animationend',()=>{
    zsl_logo.style.display='none';
    const wtt_logo=document.getElementById('logo_place2');
    wtt_logo.style.animation="1.5s photo-zoom forwards";
    setTimeout(hide_wtt,2000);
  })
}
function hide_wtt(){
  const wtt_logo=document.getElementById('logo_place2');
    wtt_logo.style.animation="1.5s photo-hide forwards";
    wtt_logo.addEventListener('animationend',()=>{
      wtt_logo.style.display='none';
      const text_place=document.getElementById('text_place');
      text_place.style.animation="1.5s photo-zoom forwards";
      setTimeout(hide_text,2000);
    })
}
function hide_text(){
  const text_place=document.getElementById('text_place');
  text_place.style.animation="1.5s photo-hide forwards";
  text_place.addEventListener('animationend',()=>{
    text_place.display='none';
    setTimeout(show_all,700);
  })
 
}
function show_all(){
  location.href='lobby.html';
}
start_all();
// animation: 1.5s photo-zoom forwards;
function start_all(){
  setTimeout(show_logo,2000)
}
/*
function start() {

  music.play();
  setTimeout(start, 87000);

}
*/
