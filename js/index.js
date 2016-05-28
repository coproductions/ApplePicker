

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

// keeps track of the last apple placed on the tree, in order to spread apples
var lastApple = {x:0, y:0};


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

  var menuItems = ['contact', 'about', 'github'];

  drawBranch(ctx, x, y, l, -Math.PI/2, 11, w, menuItems, {x:0,y:0});
})