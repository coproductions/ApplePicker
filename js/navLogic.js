'use strict';

My.menuItems = [
  {
    title: 'contact',
    color: 'blue',
    target: '.contact'
  },
  {
    title: 'about',
    color : 'red',
    target: '.about'
  },
  {
    title : 'resume',
    color : 'orange',
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
  var remaining = $('a.inactive').length;
  if(remaining ==1){
    opt = [
      'Almost there!',
      'Last One!',
      'Only one to go!'
    ];
  }
  if(!remaining){
    opt = [
      'Well done, you have full access!',
      'Too Good!'
    ];
  }
  return opt[Math.floor(Math.random() * opt.length)];
};

//activates the target link and removes attached click event, also displays a fading congrats text
My.activateLink = function(target){
   window.clearTimeout(My.alertTimeoutId);
  $(target).removeClass('inactive').off('click');
  $('.alert-text').html(My.successText());
  $('.alert-text').show();
  My.alertTimeoutId = window.setTimeout(function(){
    $('.alert-text').fadeOut();
  },3000);

  //add click event to contact link to enable contact widget
  $('.contact').click(function(){
    if(!$('.contact').hasClass('inactive')){
      $('#keyreply-container').show();
    }
  })
};

