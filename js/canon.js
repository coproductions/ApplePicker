var canon = function(x, y, ctx){
  var mx = 0;
  var my = 0;
  var angle = 0;
  var self = {
    x : x,
    y : y,
    angle : 0,
    radius : (ctx.canvas.height / 500 ) * 15,

    //move method points the angle of the canon toward the cursor using arctangent (trigonometry)
    move : function(){
      angle = Math.atan2(my - self.y, mx - self.x);
    },

    draw: function(){
      ctx.save();
      ctx.lineWidth = 2;
      ctx.translate(self.x, self.y);

      //use the angle we already calculated in the move method
      ctx.rotate(angle);

      //draw the barrel
      ctx.strokeRect(0, -5, (self.radius * 2.5 )+ 10, self.radius*0.7);

      //rest canon in a base
      ctx.moveTo (0,0);
      ctx.beginPath();
      ctx.arc(0, 0, self.radius, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }
  };

  return self;
};

