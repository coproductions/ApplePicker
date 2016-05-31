'use strict';
//Vector class

My.Vector = function( x, y){
  this.vx = x;
  this.vy = y;
};

//scale method multiplies both x and y values, to proportionally scale the vector
My.Vector.prototype.scale = function(scale){
  this.vx *= scale;
  this.vy *= scale;
  return this;
};

 // add  and subtract methods addd or sub two vector with/from each other
My.Vector.prototype.add = function(vector2){
  this.vx += vector2.vx;
  this.vy += vector2.vy;
};
My.Vector.prototype.subtract = function(vector2){
  this.vx -= vector2.vx;
  this.vy -= vector2.vx;
};

//length calculates the length of the vector using Pythagoras
My.Vector.prototype.length = function(){
  return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
};

My.Vector.prototype.angle = function(){
  return Math.atan2(this.vy, this.vx);
};

//rotate the vector , angle is in radians
My.Vector.prototype.rotate  = function(angle){
  this.vx = this.vx * Math.cos(angle) - this.vy * Math.sin(angle);
  this.vy = this.vx * Math.sin(angle) + this.vy * Math.cos(angle);
};

//creates a uniform vector length (and returns the original length) independant of the distance of the mouseclick, to allow for bullet speed control
My.Vector.prototype.normalize = function(){
  var length = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
  if(length){
    this.vx /= length;
    this.vy /= length;
  }
  return length;
};
