'use strict';

My.canon = function(x, y, ctx){
  var mx = 0;
  var my = 0;
  var angle = 0;

  var self = {
    type: 'canon',
    x : x,
    y : y,
    angle : 0,
    radius : (ctx.canvas.height / 500 ) * 15,
    color: 'black',

      //move method points the angle of the canon toward the cursor using arctangent (trigonometry)
    move : function(){
        angle = Math.atan2(my - self.y, mx - self.x);
        return false;
      },

    draw : function(){
        ctx.save();
        ctx.lineWidth = 2;
        ctx.translate(self.x, self.y);
        //use the angle we already calculated in the move method
        ctx.rotate(angle);

        //draw the barrel
        ctx.strokeRect(0, -5, (self.radius * 2.5 )+ 10, self.radius*0.7);
        ctx.fill();

        //rest canon in a base
        ctx.moveTo (0,0);
        ctx.beginPath();
        ctx.arc(0, 0, self.radius, 0, Math.PI * 2, true);
        ctx.fillStyle = self.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      }
    };

    //start an event listener that records the current mouse position and saves it to the canon object
    ctx.canvas.onmousemove = function(event){
      //get the boundary difference of the canvas to the viewport
      var diff = ctx.canvas.getBoundingClientRect();
      mx = event.x - diff.left;
      my = event.y - diff.top;
    };

    // create event listener for firing a canonball when mouse is clicked
    ctx.canvas.onclick = function(evt){

      //create a vector from the click event
      var vector = My.vector(mx - self.x, my - self.y);
      var length = vector.normalize();

      // increase speed proportional to the log of the canvas size of the click from the canont
      var speed = (2 * Math.log2(length)) + (ctx.canvas.width/70);
      vector.scale(speed);

      //create a new bullet and add it to the movingObjects array
      My.movingObjects.push(new My.Bullet(self.x, self.y, vector, ctx));
    };
    return self;
};

//Bullet class
My.Bullet = function ( x, y, vector, ctx){
  this.gravity = 0;
  this.x  = x;
  this.y  = y;
  this.landed  = false;
  this.moving = true;
  this.color = 'black';
  this.radius = (ctx.canvas.height/500) * 4;
  this.vector = vector;
  this.ctx = ctx;
  this.startAngle = 0;
  this.endAngle = Math.PI * 2;
};

My.Bullet.prototype.type = 'bullet';

//move() changes the position with velocity and check is the bullet has landed
My.Bullet.prototype.move = function(){
  this.vector.vy += this.gravity; // add gravity to the movement
  this.gravity += 0.1;  //increase gravity over time, would need a maximum to emulate real life
  this.x += this.vector.vx; //update bullet position
  this.y += this.vector.vy;

  //as bullet hits the ground
  if(this.y > this.ctx.canvas.height * 0.91){
    console.log(this.vector)
  //if bullet hits the ground sideways, let it roll
    if(this.vector.vy < 30 && this.vector.vx > 5){
      this.roll();
      return;
    }
    //otherwise mark it as landed and run impact method.
    this.landed = true;
    this.impact();
  }
  return true;
};

My.Bullet.prototype.draw = function(context){
  this.ctx = context || this.ctx;
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, false);
  this.ctx.fillStyle = this.color;
  this.ctx.fill();
  this.ctx.closePath();
  this.ctx.restore();
};
// impact buries the bullet in the ground relative to it's downward velocity, by adjusting the arcs start and end angles
My.Bullet.prototype.impact = function(){
  var downWardV = this.vector.vy;
  if(downWardV <= 0) return; //validate y vector is not negative or 0, in which case impact would not apply;
  var bottom = Math.PI/2;
  this.startAngle = bottom + downWardV/90 ;
  this.endAngle = bottom - downWardV/90;
};

//roll bounces the the bullet upward slightly by a constant value, and decreases the x velocity by half
My.Bullet.prototype.roll = function(){
  this.vector.vy = -5;
  this.vector.vx *= 0.5;
};