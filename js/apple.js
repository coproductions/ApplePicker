My.gameObject = function(x, y, radius, ctx){
  var gravity = 0;
  var self = {
    x : x,
    y : y,
    radius : radius,
    landed : false,
    color : 'black',
    ctx : ctx,

// update the position, and check if landed
    move : function(){
      vector.vy += gravity; // increase gravity with time and add to velocity
      gravity += 0.1;
      self.x += vector.vx;    // adjust vector position
      self.y += vector.vy;

      //when object hits the ground, mask as landed
      if (self.y > canvas.height - 10){
        self.landed = true;
      }
    },
// method to draw object centered on it's position
    draw : function(){
      self.ctx.beginPath();
      self.ctx.arc(self.x, self.y, radius, 0, Math.PI * 2, true);
      self.ctx.fillStyle = self.color;
      self.ctx.fill();
      self.ctx.closePath();
    }
  };
  My.stillObjects.push(self);
  return self;
};

My.apple = function(x, y, radius, ctx, menuItem){
  var self = My.gameObject(x, y, radius, ctx);
  self.type = 'apple';
  self.color = menuItem.color;
  self.menuItem = menuItem;
  return self;

};

