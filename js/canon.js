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

      // increase speed proportional to the log of the distance of the click from the canont
      vector.scale(3 * Math.log2(length));
      //scale

      //create a new bullet and add it to the movingObjects array
      My.movingObjects.push(My.bullet(self.x, self.y, vector, ctx));
    };
    return self;
};

My.bullet = function ( x, y, vector, ctx){
  var gravity = 0;
  var self = {
    type: 'bullet',
    x : x,
    y : y,
    landed : false,
    moving: true,
    color: 'black',
    radius: (ctx.canvas.height/500) * 5,
    vector: vector,

    //move() changes the position with velocity and check is the bullet has landed
    move: function(){
      vector.vy += gravity; // add gravity to the movement
      gravity += 0.1;  //increase gravity over time, would need a maximum to emulate real life
      self.x += vector.vx; //update bullet position
      self.y += vector.vy;
      //as cannonbal hits the ground, mark it as landed.
      if(self.y > ctx.canvas.height * 0.93){
        self.landed = true;
      }
      return true;
    },

    draw: function(context){
      ctx = context || ctx;
      ctx.beginPath();
      ctx.arc(self.x, self.y, self.radius, 0, Math.PI * 2, true);
      ctx.fillStyle = self.color;
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }
  }

  return self;
}