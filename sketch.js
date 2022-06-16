//https://www.aanda.org/articles/aa/full_html/2018/11/aa33563-18/aa33563-18.html
let G = 1;
let warp = 1;
let warp_velocity = [0.1, 1, 5, 10, 50, 100, 1000];
let Sun = new star('Sun',400,400,50,[255,255,0],100,10000);
let start=0;
let Planets = [];
let Ship = new ship(Sun,-200,0,0,0.8)
Planets[0] = new body('Venus',Sun,-100,0,0,0.98,12,[100,50,10],70,15);
Planets[1] = new body('Earth',Sun,-300,0,0,0.6,16,[200,80,0],100,80);
//Planets[2] = new body('Moon',Planets[1],-40,0,0,1.4,10,[0,150,100],5,20);
let interplanetary = 1;


function setup() {
  createCanvas(800, 800);
  for(let p of Planets){
    p.calculate_orbit();
  }
  Ship.calculate_orbit()
}

function draw() {
  background(55);
  angleMode(RADIANS);
  
  if(interplanetary){
    
    //console.log(Ship.x)
    Sun.show_body();
    for(let p of Planets){
      p.show_orbit();
      p.show_body();
      p.move();
    }
    Ship.show_orbit();
    Ship.show();
    Ship.move();
    Ship.boost();
    Ship.update_parent();
    textSize(15)
    fill(0,180,0)
    noStroke()
    text('In orbit of: '+Ship.parent.name,10,720)
    text('Periapsis: '+Ship.periapsis.toFixed(4),10,700)
  }else{
    
  }
  
  stroke(0,255,0)
  for(let i=0;i<7;i++){
    if(i<warp){
      fill(0,255,0)
      triangle(20+28*i, 20,
               20+28*i, 36,
               36+28*i, 28)
    }else{
      noFill()
      triangle(20+28*i, 20,
               20+28*i, 36,
               36+28*i, 28)
    }
  }
}

function mousePressed(){
  if(mouseX>20 && mouseX<36 && mouseY>20 && mouseY<36){
    warp=1;
  }else if(mouseX>48 && mouseX<64 && mouseY>20 && mouseY<36){
    warp=2;
  }else if(mouseX>76 && mouseX<92 && mouseY>20 && mouseY<36){
    warp=3;
  }else if(mouseX>104 && mouseX<120 && mouseY>20 && mouseY<36){
    warp=4;
  }else if(mouseX>132 && mouseX<148 && mouseY>20 && mouseY<36){
    warp=5;
  }else if(mouseX>160 && mouseX<176 && mouseY>20 && mouseY<36){
    warp=6;
  }else if(mouseX>188 && mouseX<204 && mouseY>20 && mouseY<36){
    warp=7;
  }
  
}