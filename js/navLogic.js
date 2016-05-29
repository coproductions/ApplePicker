'use strict';

My.menuItems = [
  {
    title: 'contact',
    url: '/contact',
    color: 'blue',
    target: '.contact'
  },
  {
    title: 'about',
    url : '/about',
    color : 'orange',
    target: '.about'
  },
  {
    title : 'resume',
    url : '/resume',
    color : 'red',
    target: '.resume'
  }
];

My.activateLink = function(target){
  $(target).removeClass('inactive');
};