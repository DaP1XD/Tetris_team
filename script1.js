function how_to_play_show(){
    document.querySelector('.how_to_play_place').style.display='flex';
}
function hide_info(){
    document.querySelector('.how_to_play_place').style.display='none';
}
function show_scoreboard(){
    document.querySelector('#scoreboard_place').style.display='flex';
    getData();
}
function hide_scoreboard(){
    document.querySelector('#scoreboard_place').style.display='none';
}
function getData(){
    let index = parseInt(localStorage.getItem('index')) || 0;
  
  let tab_player = [];
  for (let i = 0; i < index; i++) {
    let player_nick = localStorage.getItem('player' + i);
    let player_points = localStorage.getItem('player_p' + i);
    let player = {
      player_nick,
      player_points
    };
    tab_player.push(player);
  }
  console.log(tab_player);
  
  tab_player.sort((a, b) => b.player_points - a.player_points);
  
  let top3 = tab_player.slice(0, 3); // Wybieranie top 3 graczy
  
  for (let i = 0; i < 3; i++) {
    document.getElementById("top" + i + "Nick").innerHTML = top3[i].player_nick;
    document.getElementById("top" + i).innerHTML = top3[i].player_points;
  
    console.log(i + ": " + top3[i].player_nick);
    console.log(i + ": " + top3[i].player_points);
  }
  console.log(top3);
  }
  