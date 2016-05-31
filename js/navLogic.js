'use strict';

My.menuItems = [
  {
    title: 'contact',
    color: 'orange',
    target: '.contact'
  },
  {
    title: 'about',
    color : 'red',
    target: '.about'
  },
  {
    title : 'resume',
    color : 'blue',
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
  'To activate the link, shoot the right apple!',
  'You need to earn your access.',
  "Not so fast. First pick a fruit"
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
  $(target).removeClass('inactive');
  $(target).off('click'); // remove alert message click event from li and a (both targets)

  //show success message and fade out after some 3 seconds
  $('.alert-text').html(My.successText());
  $('.alert-text').show();
  My.alertTimeoutId = window.setTimeout(function(){
    $('.alert-text').fadeOut();
  },3000);

  //add click event to contact link to enable contact widget
  if($(target).hasClass('contact') && $(target).is('a')){
    $('#keyreply-container').show();
    $(target).click(function(){ // allow contact button to toggle keyreply widget
      $('.keyreply-launcher').click();
    })
  }
};



