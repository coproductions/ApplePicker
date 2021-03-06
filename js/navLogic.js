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

  $(target).removeClass('inactive');
  $(target).off('click'); // remove alert message click event from li and a (both targets)

  //when the contact link is activated add click event to contact a tag to enable contact widget toggle
  if($(target).hasClass('contact')){
    $('#keyreply-container').show();
    $('a.contact').click(function(){ // allow contact button to toggle keyreply widget
      $('.keyreply-launcher').click();
    })
  }
};

// shows text for 3 seconds in specified element or .alert-text
My.displayText = function(text, selector){

  // validate string
  if(typeof(text) != 'string') {
    console.log('input not a string');
    return;
  }

  var element = selector || '.alert-text'; // default display element

  window.clearTimeout(My.alertTimeoutId); // clear previous fadeout

   //show success message and fade out after some 3 seconds
  $(element).html(text);
  $(element).show();
  My.alertTimeoutId = window.setTimeout(function(){
    $(element).fadeOut();
  },3000);

};



