
console.log('hello')
var My = {};

My.menuItems = [
  {
    title: 'contact',
    url: '/contact',
    color: 'blue',
    target: 'html/contact.html'
  },
  {
    title: 'about',
    url : '/about',
    color : 'orange',
    target: 'html/about.html'
  },
  {
    title : 'resume',
    url : '/resume',
    color : 'red',
    target: 'html/resume.html'
  }
];

My.gameObjects = [];



// keeps track of the last apple placed on the tree, in order to spread apples
My.lastApple = {x:0, y:0};

My.stillObjects = [];
My.movingObjects = [];

// run when all files and DOM are fully loaded
$(document).ready(function(){

  // adjust canvas and branch size to current window
  var cSize = $(".treeWrapper").innerWidth();
  var canvas = $("#tree")[0];

  var ctx = canvas.getContext("2d");
  var x = cSize/2;
  var y = cSize - 10;
  var l = cSize/14;
  var w = cSize/60;

  canvas.width = cSize;
  canvas.height = cSize;

  var newCanon = My.canon(cSize * 0.1, cSize  * 0.93, ctx);
  My.movingObjects.push(newCanon)
  newCanon.draw();

  // draw the tree and apples
  My.drawBranch(ctx, x, y, l, -Math.PI/2, 11, w, My.menuItems);

  //loop through all elements of the movingObjects array and update their position, or move to still objects if it has landed
  var action = setInterval(function(){
    for (var i = 0; i < My.movingObjects.length; i++) {
      My.movingObjects[i].move();
      My.movingObjects[i].draw();
      if(My.movingObjects[i].landed){
        My.stillObjects.push(My.movingObjects.splice(i,1)[0]);
      }
    }
  },30);
})