'use strict';
My.vector = function(x, y){

  var self = {

    vx : x,
    vy : y,

    //scale method multiplies both x and y values, to proportionally scale the vector
    scale : function(scale){
      self.vx *= scale;
      self.vy *= scale;
      return self;
    },

    // add  and subtract methods addd or sub two vector with/from each other
    add : function(vector2){
      self.vx += vector2.vx;
      self.vy += vector2.vy;
    },
    subtract : function(vector2){
      self.vx -= vector2.vx;
      self.vy -= vector2.vx;
    },

    //length calculates the length of the vector using Pythagoras
    length : function(){
      return Math.sqrt(self.vx * self.vx + self.vy * self.vy);
    },

    //lengthSqured returns the sqare of the length, which is faster and sufficint for comparisons
    lengthSquared : function(){
      return self.vx * self.vx + self.vy * self.vy;
    },

    //rotate the vector , angle is in radians
    rotate : function(angle){
      self.vx = self.vx * Math.cos(angle) - self.vy * Math.sin(angle);
      self.vy = self.vx * Math.sin(angle) + self.vy * Math.cos(angle);
    },

    //creates a uniform vector length (and returns the original length) independant of the distance of the mouseclick, to allow for bullet speed control
    normalize: function(){
      var length = Math.sqrt(self.vx * self.vx + self.vy * self.vy);
      if(length){
        self.vx /= length;
        self.vy /= length;
      }
      return length;
    }
  };

  return self;

};

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
      vector.scale(4 * Math.log(length));
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
      if(self.y > ctx.canvas.height - 30){
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