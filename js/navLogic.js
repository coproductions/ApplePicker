'use strict';

My.menuItems = [
  {
    title: 'contact',
    color: 'blue',
    target: '.contact'
  },
  {
    title: 'about',
    color : 'orange',
    target: '.about'
  },
  {
    title : 'resume',
    color : 'red',
    target: '.resume'
  },
    {
    title : 'code',
    color : 'purple',
    target: '.code'
  }
];

//returns a random  text when user clicks on inactive link
My.inactiveText = function(){
  var opt = [
  'To activate the link, shoot the apple!',
  'You need to earn your way first.'
  ];
  return opt[Math.floor(Math.random() * opt.length)];
};

//returns a random success text
My.successText = function(){
  var opt = [
  'Nice Shot!',
  'Not Bad!',
  'Pretty Good!',
  'You got it!'
  ];
  return opt[Math.floor(Math.random() * opt.length)];
};

//activates the target link and removes attached click event
My.activateLink = function(target){
  $(target).removeClass('inactive').off('click');
  $('.alert-text').show()
  $('.alert-text').html(My.successText()).delay(2000).fadeOut(1000);
};

