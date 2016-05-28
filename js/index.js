

var menuItems = [
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

var gameObjects = [];



// keeps track of the last apple placed on the tree, in order to spread apples
var lastApple = {x:0, y:0};

var gameObjects = {
  still : [],
  moving : []
};

$(document).ready(function(){


  // adjust canvas and branch size to current window
  var cSize = $(".treeWrapper").innerWidth();
  var canvas = $("#tree")[0];

  var ctx = canvas.getContext("2d");
  var x = cSize/2;
  var y = cSize - 10;
  var l = cSize/14;
  var w = cSize/60;

  console.log(ctx)

  canvas.width = cSize;
  canvas.height = cSize;

  var newCanon = canon(cSize * 0.1, cSize  * 0.93, ctx);
  gameObjects.moving.push(newCanon)
  newCanon.draw();

  drawBranch(ctx, x, y, l, -Math.PI/2, 11, w, menuItems, gameObjects);
})