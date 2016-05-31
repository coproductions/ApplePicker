'use strict';
//prototypical inheritance version of Apple object
My.Apple = function(x, y, radius, ctx, menuItem, vector){
    this.ctx = ctx;
    this.menuItem = menuItem;
    this.color = menuItem.color;
    this.x  = x;
    this.y  = y;
    this.radius  = radius;
    this.landed  = false;
    this.vector = vector || new My.Vector(0,0);

    this.moving = false;
};

My.Apple.prototype.gravity = 4;
My.Apple.prototype.type = 'apple';
My.Apple.prototype.draw = function(context){
  this.ctx = context || this.ctx;
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  this.ctx.fillStyle = this.color;
  this.ctx.fill();
  this.ctx.closePath();

};
My.Apple.prototype.move = function(){
  // only move if the apple as been hit, and it's vector altered
  if(!this.vector.vx || !this.vector.vy) return false; // return false as apple is not moving, and cannot actively collide
  this.vector.vy += this.gravity; // increase gravity with time and add to velocity
  this.gravity += 0.2;
  this.x += this.vector.vx;    // adjust vector position
  this.y += this.vector.vy;

  //when object hits the ground, bounce
  if (this.y > this.ctx.canvas.height *0.9){
    this.bounce();
  }
  return true;
};
//if  bounce function is called continously until apple comes to rest
My.Apple.prototype.bounce = function(){
  // base case, if apple is rebounding ignore
  if(this.vector.vy < 0){
    return;
  //bascase if downward ball has slowed down sufficiently, mark as landed
  } else if(this.vector.vy < 1){
    this.vector.vy = 0;
    if(this.vector.vx < 0.1){
      this.landed = true;
      return;
    }
  }
  // otherwise reverse the vertical movement, decrease horizontal, and decrease gravity and continue moving
  this.gravity *= 0.7;
  this.vector.vy *= -0.5;
  this.vector.vx *= 0.5;

};

