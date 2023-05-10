const main=document.querySelector('.main');
let tab = [];
let counter = 0;
let block;
let colorus=["green","blue","red","yellow","purple"];
create();
function create(){
  block=document.createElement('div'); 
  block.classList.add('block1');
  let posX=240;
  let posY=580;
  let los=Math.floor(Math.random()*colorus.length);
  tab[counter]={
    posX,posY,colour: colorus[los]
  }
  block.style.backgroundColor=tab[counter].colour;
  posX=block.style.left=250+'px';
  posY=block.style.bottom=580+'px';
  
  drawBlock(block);
}
function drawBlock(block){
  block.style.left=tab[counter].posX+'px';
  block.style.bottom=tab[counter].posY+'px';
  block.style.backgroundColor=tab[counter].colour;
  main.append(block);
}
function moveBlock(){
  let currentPositionX=tab[counter].posX;
  currentPositionX=parseInt(currentPositionX);
  let currentPositionY=tab[counter].posY;
  currentPositionY=parseInt(currentPositionY);
  document.addEventListener('keydown',function(event){
    switch(event.key){
      case 'a':
        if(currentPositionX-20>=0){
          currentPositionX-=20;
        }
        break;
      case 'd':
        if(currentPositionX+20<500)
        {
          currentPositionX+=20;
        }
        break;
    }
    tab[counter].posX = currentPositionX;
  })
  let czy=true;
  for(let i=0;i<tab.length;i++){
    if(currentPositionY-20==tab[i].posY && currentPositionX==tab[i].posX){
      czy=false;
    }
  }
  if(currentPositionY!=0 && czy==true){
    currentPositionY -= 10;
    tab[counter].posY = currentPositionY;
  }
  else{
    counter++;
    create();
  }
  drawBlock(block); 
  console.log(tab[counter]);
  setTimeout(moveBlock,200);
}
moveBlock();
console.log(tab[counter]);