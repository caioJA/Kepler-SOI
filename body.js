class body{
  constructor(name,parent,x,y,vx,vy,diameter,color,mass,r_soi){
    this.name=name;
    this.parent=parent;
    this.x=x;
    this.y=y;
    this.vx=vx;
    this.vy=vy;
    this.diameter=diameter;
    this.color=color;
    this.mass=mass;
    this.r_soi=r_soi;
    this.generalX=0;
    this.generalY=0;
    this.generalVX=0;
    this.generalVY=0;
    this.periapsis=0;
    this.apoapsis=0;
    this.p_angle=0;
    this.h=0;
    this.ex=0;
    this.ey=0;
    this.e=0;
    this.v=0;
    this.E=0;
    this.M=0;
    this.a=0;
    this.b=0;
    this.c=0;
    this.period=0;
  }
  
  
  show_body(){
    // stroke(200)
    // strokeWeight(2)
    // line(this.parent.x,this.parent.y,this.parent.x+200,this.parent.y)
    // line(this.parent.x,this.parent.y,this.parent.x+this.x,this.parent.y+this.y)
    noStroke()
    fill(100,100,100,50)
    circle(this.x+this.parent.generalX,this.y+this.parent.generalY,2*this.r_soi)
    fill(this.color)
    circle(this.x+this.parent.generalX,this.y+this.parent.generalY,this.diameter)
  }
  
  calculate_orbit(){
    this.h = this.x*this.vy-this.y*this.vx
    //console.log(this.h)
    this.ex = this.vy*this.h/(G*this.parent.mass)-this.x/dist(0,0,this.x,this.y)
    //console.log(this.ex)
    this.ey = -this.h*this.vx/(G*this.parent.mass)-this.y/dist(0,0,this.x,this.y)
    this.e = sqrt(this.ex*this.ex+this.ey*this.ey)
    //console.log(this.e)
    if(this.x*this.vx+this.y*this.vy>=0){
      this.v = acos((this.ex*this.x+this.ey*this.y)/(this.e*dist(0,0,this.x,this.y)))
    }else{
      this.v = 2*PI-acos((this.ex*this.x+this.ey*this.y)/(this.e*dist(0,0,this.x,this.y)))
    }
    if(this.h<0){
      this.v=-this.v
    }
    
    //console.log(this.v)
    
    this.E = 2*atan((tan(this.v/2))/sqrt((1+this.e)/(1-this.e)))
    //console.log(this.E)
    this.a = 1/(2/dist(0,0,this.x,this.y)- 
               dist(0,0,this.vx,this.vy)*dist(0,0,this.vx,this.vy)/(G*this.parent.mass))
    this.c = this.a*this.e
    this.b = sqrt(this.a*this.a-this.c*this.c)
    if(this.x>0){
      this.p_angle = atan(this.y/this.x)-this.v
      //console.log(atan(this.y/this.x))
    }else{
      this.p_angle = PI+atan(this.y/this.x)-this.v
      //console.log(PI+atan(this.y/this.x))
    }
    
    //console.log(this.p_angle)
    
    this.period = 2*PI*sqrt(this.a*this.a*this.a/(G*this.parent.mass))
    //console.log(this.period)
    this.M=this.E-this.e*sin(this.E)
    //console.log(this.M)
    this.periapsis=this.a-this.c
    this.apoapsis=this.a+this.c
  }
  
  show_orbit(){
    //noFill()
    //stroke(0,200,0)
    //strokeWeight(1)
    //ellipse(this.parent.x-this.c,this.parent.y,2*this.a,2*this.b)
    
    translate(this.parent.generalX,this.parent.generalY)
    rotate(this.p_angle)
    translate(-this.parent.generalX,-this.parent.generalY)
    noFill()
    stroke(150)
    strokeWeight(1)
    //line(this.parent.x-this.c,this.parent.y,this.parent.x-this.c+200,this.parent.y,)
    ellipse(this.parent.generalX-this.c,this.parent.generalY,2*this.a,2*this.b)
    translate(this.parent.generalX,this.parent.generalY)
    rotate(-this.p_angle)
    translate(-this.parent.generalX,-this.parent.generalY)
  }
  
  move(){
    
    if(this.h>0){
      this.M=this.M+2*PI*warp_velocity[warp-1]/this.period
    }else{
      this.M=this.M-2*PI*warp_velocity[warp-1]/this.period
    }
    //console.log(this.E)
    let guess = this.E
    let max_it = 100
    for(let i=0; i<max_it; i++){
      let y_value = this.M-guess+this.e*sin(guess)
      if(abs(y_value)<0.00000001){break;}
      let slope = ((this.M-guess-0.0001+this.e*sin(guess+0.0001))-y_value)/0.0001
      let step = y_value/slope
      guess = guess-step
    }
    this.E=guess
    //console.log(this.E)
    
    this.v = 2*atan((tan(this.E/2))*sqrt((1+this.e)/(1-this.e)))
    // console.log('v: '+this.v)
    
    let v_w = this.h/dist(0,0,this.x,this.y)
    let v_r=0
    if(this.h*sin(this.v)<0){
      v_r = -sqrt(G*this.parent.mass*((2/dist(0,0,this.x,this.y))-1/this.a)-v_w*v_w)
    }else{
      v_r = sqrt(G*this.parent.mass*((2/dist(0,0,this.x,this.y))-1/this.a)-v_w*v_w)
    }
    
    //console.log('v_w: '+v_w)
    //console.log('v_r: '+v_r)
    // stroke(0,0,255)
    // strokeWeight(2)
    // line(this.parent.x+this.x,this.parent.y+this.y,
    //      this.parent.x+this.x+100*v_r*cos(this.p_angle+this.v),
    //      this.parent.y+this.y+100*v_r*sin(this.p_angle+this.v));
    // stroke(255,0,0);
    // line(this.parent.x+this.x,this.parent.y+this.y,
    //      this.parent.x+this.x+100*v_w*cos(this.p_angle+this.v+PI/2),
    //      this.parent.y+this.y+100*v_w*sin(this.p_angle+this.v+PI/2));
    
    // console.log('velocity: '+sqrt(G*this.parent.mass*((2/dist(0,0,this.x,this.y))-1/this.a)))
    this.vx = cos(this.p_angle+this.v)*v_r-sin(this.p_angle+this.v)*v_w
    this.vy = sin(this.p_angle+this.v)*v_r+cos(this.p_angle+this.v)*v_w
    //console.log(this.p_angle+this.v)
//     console.log('vx: '+this.vx)
//     console.log('vy: '+this.vy)
    
    this.x = cos(this.p_angle)*(this.a*cos(this.E)-this.c)-sin(this.p_angle)*this.b*sin(this.E)
    this.y = sin(this.p_angle)*(this.a*cos(this.E)-this.c)+cos(this.p_angle)*this.b*sin(this.E)
    
    this.generalX=this.parent.generalX+this.x;
    this.generalY=this.parent.generalY+this.y;
    this.generalVX=this.parent.generalVX+this.vx;
    this.generalVY=this.parent.generalVY+this.vy;
    
  }
}