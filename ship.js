class ship{
  constructor(parent,x,y,vx,vy){
    this.parent=parent;
    this.x=x;
    this.y=y;
    this.vx=vx;
    this.vy=vy;
    this.direction=0;
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
  
  show(){
    noStroke();
    fill(255);
    triangle(this.parent.generalX+this.x+17*cos(this.direction), 
             this.parent.generalY+this.y+17*sin(this.direction),
             this.parent.generalX+this.x+10*cos(this.direction+2*PI/3), 
             this.parent.generalY+this.y+10*sin(this.direction+2*PI/3),
             this.parent.generalX+this.x+10*cos(this.direction+4*PI/3), 
             this.parent.generalY+this.y+10*sin(this.direction+4*PI/3));
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
    
    //console.log('v: '+this.v)
    
    if(this.e<=1){ //elliptical orbit
    
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
      
    }else{ //hyperbolic orbit
        
      let guess = 0
      let max_it = 100
      for(let i=0; i<max_it; i++){
        let y_value = tan(this.v/2)-sqrt((this.e+1)/(this.e-1))*((exp(guess/2)-exp(-guess/2))/(exp(guess/2)+exp(-guess/2)))
        if(abs(y_value)<0.00000001){break;}
        let slope = (tan(this.v/2)-sqrt((this.e+1)/(this.e-1))*((exp((guess+0.0001)/2)-exp((-guess-0.0001)/2))/(exp((guess+0.0001)/2)+exp((-guess-0.0001)/2)))-y_value)/0.0001
        let step = y_value/slope
        guess = guess-step
      }
      this.E=guess
      //console.log(this.E)
    
      // let test = (exp(this.E/2)-exp(-this.E/2))/(exp(this.E/2)+exp(-this.E/2))-sqrt((this.e-1)/(this.e+1))*tan(this.v/2)
      // console.log('test='+test)
      this.a = 1/(2/dist(0,0,this.x,this.y)- 
                 dist(0,0,this.vx,this.vy)*dist(0,0,this.vx,this.vy)/(G*this.parent.mass))
      this.c = this.a*this.e
      this.b = sqrt(this.c*this.c-this.a*this.a)
      if(this.x>0){
        this.p_angle = atan(this.y/this.x)-this.v
        //console.log(atan(this.y/this.x))
      }else{
        this.p_angle = PI+atan(this.y/this.x)-this.v
        //console.log(PI+atan(this.y/this.x))
      }
    
      //console.log('p_angle: '+this.p_angle)
    
      this.period = 2*PI*sqrt(-this.a*this.a*this.a/(G*this.parent.mass))
      //console.log(this.period)
      this.M=this.e*(exp(this.E)-exp(-this.E))/2-this.E
      //console.log(this.M)
      this.periapsis=this.c-this.a
      this.apoapsis=undefined
      
    }
    
  }
  
  show_orbit(){
    if(this.e<=1){
      translate(this.parent.generalX,this.parent.generalY)
      rotate(this.p_angle)
      translate(-this.parent.generalX,-this.parent.generalY)
      noFill()
      stroke(0,0,200)
      strokeWeight(1)
      //line(this.parent.x-this.c,this.parent.y,this.parent.x-this.c+200,this.parent.y,)
      ellipse(this.parent.generalX-this.c,this.parent.generalY,2*this.a,2*this.b)
      translate(this.parent.generalX,this.parent.generalY)
      rotate(-this.p_angle)
      translate(-this.parent.generalX,-this.parent.generalY)
    }else{
      translate(this.parent.generalX,this.parent.generalY)
      rotate(this.p_angle)
      translate(-this.parent.generalX,-this.parent.generalY)
      noFill()
      stroke(0,0,200)
      strokeWeight(1)
      //line(this.parent.x,this.parent.y,this.parent.x+200,this.parent.y)
      //ellipse(this.parent.generalX-this.c,this.parent.generalY,2*this.a,2*this.b)
      translate(this.parent.generalX,this.parent.generalY)
      rotate(-this.p_angle)
      translate(-this.parent.generalX,-this.parent.generalY)
    }
  }
  
  move(){
    
    if(this.e<=1){//elliptical orbit
      
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
      
      // console.log('M: '+this.M)
      // console.log(this.E)
    
      this.v = 2*atan((tan(this.E/2))*sqrt((1+this.e)/(1-this.e)))
      //console.log('v: '+this.v)
      
    }else{ //hyperbolic orbit
      
      if(this.h>0){
        this.M=this.M+2*PI*warp_velocity/this.period
      }else{
        this.M=this.M-2*PI*warp_velocity/this.period
      }
      //console.log('T: '+this.period)
      //console.log('M: '+this.M)
      //console.log('E antes: '+this.E)
      let guess = this.E
      let max_it = 100
      for(let i=0; i<max_it; i++){
        let y_value = this.M+guess-this.e*(exp(guess)-exp(-guess))/2
        if(abs(y_value)<0.00000001){break;}
        let slope = ((this.M+guess+0.0001-this.e*(exp(guess+0.0001)-exp(-guess-0.0001))/2)-y_value)/0.0001
        let step = y_value/slope
        guess = guess-step
      }
      
      this.E=guess
      //console.log('E depois: '+this.E)
      
      // let test = this.M+this.E-this.e*(exp(this.E)-exp(-this.E))/2
      // console.log('test='+test)
    
      this.v = 2*atan(sqrt((1+this.e)/(this.e-1))*((exp(this.E/2)-exp(-this.E/2))/(exp(this.E/2)+exp(-this.E/2))))
      //console.log('v: '+this.v)
    }
    
    
    let v_w = this.h/dist(0,0,this.x,this.y)
    let v_r=0
    if(this.h*sin(this.v)<0){
      v_r = -sqrt(G*this.parent.mass*((2/dist(0,0,this.x,this.y))-1/this.a)-v_w*v_w)
    }else{
      v_r = sqrt(G*this.parent.mass*((2/dist(0,0,this.x,this.y))-1/this.a)-v_w*v_w)
    }
    this.vx = cos(this.p_angle+this.v)*v_r-sin(this.p_angle+this.v)*v_w
    this.vy = sin(this.p_angle+this.v)*v_r+cos(this.p_angle+this.v)*v_w
    //console.log(this.p_angle+this.v)
     //console.log('vx: '+this.vx)
     //console.log('vy: '+this.vy)
    
    if(this.e<=1){//elliptical orbit
      this.x = cos(this.p_angle)*(this.a*cos(this.E)-this.c)-sin(this.p_angle)*this.b*sin(this.E)
      this.y = sin(this.p_angle)*(this.a*cos(this.E)-this.c)+cos(this.p_angle)*this.b*sin(this.E)
    }else{
      let temp_r = -this.a*(this.e*this.e-1)/(1+this.e*cos(this.v))
      this.x = cos(this.p_angle+this.v)*temp_r
      this.y = sin(this.p_angle+this.v)*temp_r
    }
    
    this.generalX=this.parent.generalX+this.x;
    this.generalY=this.parent.generalY+this.y;
    this.generalVX=this.parent.generalVX+this.vx;
    this.generalVY=this.parent.generalVY+this.vy;
    
    if (keyIsDown(LEFT_ARROW)) { 
      this.direction=this.direction-0.02; 
    }
    if (keyIsDown(RIGHT_ARROW)) { 
      this.direction=this.direction+0.02; 
    }
    
  }
  
  boost(){
    if (keyIsDown(UP_ARROW)){ 
      this.vx=this.vx+0.005*cos(this.direction); 
      this.vy=this.vy+0.005*sin(this.direction); 
      this.calculate_orbit()
      noStroke();
      fill(225, 102, 0);
      triangle(this.parent.generalX+this.x-17*cos(this.direction), 
               this.parent.generalY+this.y-17*sin(this.direction),
               this.parent.generalX+this.x+10*cos(this.direction+2*PI/3)+3*sin(this.direction), 
               this.parent.generalY+this.y+10*sin(this.direction+2*PI/3)-3*cos(this.direction),
               this.parent.generalX+this.x+10*cos(this.direction+4*PI/3)-3*sin(this.direction),
               this.parent.generalY+this.y+10*sin(this.direction+4*PI/3)+3*cos(this.direction));
    }
  }
  
  update_parent(){
    let previous_soi_level;
    
    if(this.parent==Sun){
      previous_soi_level=0;
    }else if(this.parent.parent==Sun){
      previous_soi_level=1;
    }else{
      previous_soi_level=2;
    }
    
    let temp = [];
    for(let p of Planets){
      if(dist(this.generalX,this.generalY,p.generalX,p.generalY)<p.r_soi){
        temp.push(p)
        //console.log(p)
      }
      //console.log(dist(this.generalX,this.generalY,p.generalX,p.generalY)<p.r_soi)
    }
    let soi_level=temp.length
    //console.log(temp.length)
    if(temp.length==0){
      this.parent=Sun;
      //console.log('Sun')
    }else if(temp.length==1){
      this.parent=temp[0]
      //console.log(temp[0].name)
    }else{
      if(temp[0].parent==Sun){
        this.parent=temp[1]
        //console.log(temp[1].name)
      }else{
        this.parent=temp[0]
        //console.log(temp[0].name)
      }
    }
    if(soi_level-previous_soi_level==1){
      this.x=this.generalX-this.parent.generalX;
      this.y=this.generalY-this.parent.generalY;
      this.vx=this.generalVX-this.parent.generalVX;
      this.vy=this.generalVY-this.parent.generalVY;
      this.calculate_orbit();
    }else if(soi_level-previous_soi_level==-1){
      this.x=this.generalX-this.parent.generalX;
      this.y=this.generalY-this.parent.generalY;
      this.vx=this.generalVX-this.parent.generalVX;
      this.vy=this.generalVY-this.parent.generalVY;
      this.calculate_orbit();
    }
  }
}