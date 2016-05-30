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
    this.vector = vector || My.vector(0,0);
    this.moving = false;
};

My.Apple.prototype.gravity = 4;
My.Apple.prototype.type = 'apple';
My.Apple.prototype.draw = function(context){
  this.ctx = context || this.ctx;
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
  this.ctx.fillStyle = this.color;
  this.ctx.fill();
  this.ctx.closePath();

};
My.Apple.prototype.move = function(){
  // only move if the apple as been hit, and it's vector altered
  if(!this.vector.vx || !this.vector.vy) return false;
  this.vector.vy += this.gravity; // increase gravity with time and add to velocity
  this.gravity += 0.2;
  this.x += this.vector.vx;    // adjust vector position
  this.y += this.vector.vy;

  //when object hits the ground, mask as landed
  if (this.y > this.ctx.canvas.height *0.9){
    this.landed = true;
  }
  return true;
};

