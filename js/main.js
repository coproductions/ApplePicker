'use strict';
var My = {};

// keeps track of the last apple placed on the tree, in order to spread apples
My.lastApple = {x:0, y:0};

My.stillObjects = [];
My.movingObjects = [];

// run when all files and DOM are fully loaded
$(document).ready(function(){

  // adjust canvas and branch sizes to current window
  var cSize = $(".tree-wrapper").innerWidth();
  $(".tree-wrapper").css({'height':cSize +'px'})
  var canvasStill = $("#tree")[0];
  var canvasDynamic = $("#dynamic")[0];

  var contexts = {};

  contexts.still = canvasStill.getContext("2d");
  contexts.dynamic = canvasDynamic.getContext("2d");

  canvasStill.width = cSize;
  canvasStill.height = cSize;
  canvasDynamic.width = cSize;
  canvasDynamic.height = cSize;

  //determine the start coordinates and sizes for the tree
  var x = cSize/2;
  var y = cSize * 0.9;
  var l = cSize/14;
  var w = cSize/60;


  // draw the tree and apples
  My.drawBranch(contexts, x, y, l, -Math.PI/2, 11, w, My.menuItems);

  //draw a cannon and add it to movingObjects
  var newCanon = My.canon(cSize * 0.1, cSize  * 0.9, contexts.dynamic);
  My.movingObjects.push(newCanon)
  newCanon.draw();

  //loop through all elements of the movingObjects array and update their position, or move to still objects if it has landed
  var action = setInterval(function(){
    contexts.dynamic.clearRect(0,0,canvasDynamic.height,canvasDynamic.width)

    // loop throuqh each moving object and redraw it with updated position
    for (var i = 0; i < My.movingObjects.length; i++) {
      var o = My.movingObjects[i];
      var isMoving = o.move();
      o.draw();

      // if the object has landed, remove it from the moving object list and draw it to the still canvas
      if(o.landed){
        My.stillObjects.push(My.movingObjects.splice(i,1)[0]);
        o.draw(contexts.still);
      }

      //if the object is moving, loop through array again and see if it is colliding with any of the other objects except for the canon
      if(isMoving){
        for (var j = 0; j < My.movingObjects.length; j++) {
          if(j != i && My.movingObjects[j].type != 'canon'){
            var t = My.movingObjects[j];
            if(Math.abs(o.x - t.x) < t.radius && Math.abs(o.y - t.y) < t.radius){
              t.vector.add(o.vector.scale(0.5));
              if(t.menuItem){
                My.activateLink(t.menuItem.target);
              }
              break;
            }
          }
        }
      }
    }
  },30);

  //show alert message when user clicks on inactive link, fade after 2 seconds
  $('.inactive').click(function(){
    window.clearTimeout(My.alertTimeoutId);
    $('.alert-text').clearQueue();
    $('.alert-text').html(My.inactiveText());
    $('.alert-text').show();
    My.alertTimeoutId = window.setTimeout(function(){
      $('.alert-text').fadeOut();
    },2000);
  });

});