class star{
  constructor(name,x,y,diameter,color,mass){
    this.name=name;
    this.x=x;
    this.y=y;
    this.vx=0;
    this.vy=0;
    this.generalX=x;
    this.generalY=y;
    this.generalVX=0;
    this.generalVY=0;
    this.diameter=diameter;
    this.color=color;
    this.mass=mass;
  }
  
  show_body(){
    noStroke()
    fill(this.color)
    circle(this.x,this.y,this.diameter)
  }
}