'use strict';


//*** changes the: welcome to quiz fellows depending on the time of the day ***
function displayTime() {
  var today =  new Date ();
  var hourNow = today.getHours();
  var greeting;

  if (hourNow > 18) {
    greeting = 'Good Evening, welcome to Bus Mall!';
  } else if (hourNow > 12) {
    greeting = 'Good Afternoon, Welcome to Bus Mall!';
  } else if (hourNow > 0) {
    greeting = 'Good Morning, Welcome to Bus Mall!';
  } else {
    greeting = 'Welcome!';
  }
  document.write('<h1>' + greeting + '</h1>');
}

displayTime(); //calls the date function