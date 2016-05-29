'use strict';

My.apple = function(x, y, radius, ctx, menuItem){
  var gravity = 4;
  var vector = My.vector(0,0);
  var self = {
    type: 'apple',
    menuItem: menuItem,
    color: menuItem.color,
    x : x,
    y : y,
    radius : radius,
    landed : false,
    vector: vector,
    moving: false,

// update the position, and check if landed
    move : function(){
      // only move if the apple as been hit, and it's vector altered
      if(!self.vector.vx || !self.vector.vy) return false;
      self.vector.vy += gravity; // increase gravity with time and add to velocity
      gravity += 0.2;
      self.x += self.vector.vx;    // adjust vector position
      self.y += self.vector.vy;

      //when object hits the ground, mask as landed
      if (self.y > ctx.canvas.height - 20){
        self.landed = true;
      }
      return true;
    },
// method to draw object centered on it's position
    draw : function(context){
      ctx = context || ctx;
      ctx.beginPath();
      ctx.arc(self.x, self.y, radius, 0, Math.PI * 2, true);
      ctx.fillStyle = self.color;
      ctx.fill();
      ctx.closePath();
    }
  };
  My.movingObjects.push(self);
  return self;
};

// My.apple = function(x, y, radius, ctx, menuItem){
//   var self = My.movingObject(x, y, radius, ctx);
//   self.type = 'apple';
//   self.color = menuItem.color;
//   self.menuItem = menuItem;
//   return self;

// };

