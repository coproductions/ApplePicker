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
