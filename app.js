'use strict';

var images = ['Bag', 'Banana', 'Bathroom', 'Boots', 'Breakfast', 'Bubblegum', 'Chair', 'Cthulhu', 'Dog-duck', 'Dragon', 'Pen', 'Pet-sweep', 'Scissors', 'Shark', 'Sweep', 'Tauntaun', 'Unicorn', 'Usb', 'Water-can', 'Wine-glass'];
var imagesArray = [];
var imageGenerated1;
var imageGenerated2;
var imageGenerated3;

if (localStorage.imagesVotes) {
  alert('Welcome Back');
  var storedVotes = localStorage.imagesVotes.split(',');
  for ( var i = 0; i < storedVotes.length; i++ ) {
    storedVotes[i] = parseInt(storedVotes[i]);
  }
  imagesVotes = storedVotes;
  // displayChart will call the function that wraps the chart
  displayChart();
}

// We create a global array with 0's to tally the votes
var imagesVotes = [];
for (i = 0; i < images.length; i++) { // Check how we use images.lenght property
  imagesVotes.push(0); // Add 1 zero per each image in images array
}
// Now images votes has only 0's

//this will be a constructor function
function Images(name) {
  this.name = name;
  this.path = 'assets/' + name + '.jpg';
  this.generated = 0;
  this.selected = 0;
}

//this is the constructor for new images
for (var i = 0; i < images.length; i++){
  imagesArray.push(new Images(images[i]));
}
//console.log(imagesArray);

//this is for the random generator. Will choose different number each time
function randGen(){
  var rndG =  Math.floor(Math.random() * imagesArray.length);
  //console.log('random #', rndG);

  return rndG;
}

function numbGenerator () {
  imageGenerated1 = randGen();
  imageGenerated2 = randGen();
  imageGenerated3 = randGen();
  // console.log('number1', imageGenerated1);
  // console.log('number2', imageGenerated2);
  // console.log('number3', imageGenerated3);

  while (imageGenerated1 === imageGenerated2) {
    console.log('re-rolling number2:' , imageGenerated2);
    imageGenerated2 = randGen();
    console.log('re-rolled number2 to', imageGenerated2);
  }
  while (imageGenerated1 === imageGenerated3 || imageGenerated2 === imageGenerated3) {
    console.log('re-rolling number3:' , imageGenerated3);
    imageGenerated3 = randGen();
    console.log('re-rolled number3 to', imageGenerated3);
  }
}
numbGenerator();
// Create a random number that is different of previous image indexes
function newRandom () {
  // Initialize variables
  var isValid = false;
  var candidate = 0;
  // While candidate is not valid, create a new candidate and compare
  // the value against other images
  while (!isValid) {
    candidate = randGen();
    isValid = candidate != imageGenerated1 &&
        candidate != imageGenerated2 &&
        candidate != imageGenerated3;
  }
  return candidate;
}

var counter = 0;

var image1 = document.getElementById('image1');
var image2 = document.getElementById('image2');
var image3 = document.getElementById('image3');
// We already created 3 different index for each image
// Now only load the image is left :)
image1.src = 'assets/' + images[imageGenerated1] + '.jpg';
image2.src = 'assets/' + images[imageGenerated2] + '.jpg';
image3.src = 'assets/' + images[imageGenerated3] + '.jpg';

function Tracker(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.totalClicks = 0;
}
//this will keep a counter for each image for every click



image1.addEventListener('click', function() {
  if(counter === 25) {
    alert('Thanks for your participation');
    // displayChart will call the function that wraps the chart
    displayChart();
    return;
  }

  counter++;
  var src = this.getAttribute('src');
  // Here the add 1 to the image account vote
  imagesVotes[imageGenerated1] = imagesVotes[imageGenerated1] + 1;
  saveToPage ();
  //console.log('Image ' + images[imageGenerated1] + ' has ' + imagesVotes[imageGenerated1] + ' votes');
  // We generate a number and update the src of the respective image object
  imageGenerated1 = newRandom();
  document.getElementById('image1').src = 'assets/' + images[imageGenerated1] + '.jpg';
  //console.log('image src:', src);
  //console.log('total image1 clicks:', counter);
  imageGenerated2 = newRandom();
  document.getElementById('image2').src = 'assets/' + images[imageGenerated2] + '.jpg';
  imageGenerated3 = newRandom();
  document.getElementById('image3').src = 'assets/' + images[imageGenerated3] + '.jpg';
});

//this will keep a counter for each image for every click
image2.addEventListener('click', function() {
  if(counter === 25) {
    alert('Thanks for your participation');
    displayChart();

    return;
  }
  counter++;
  var src = this.getAttribute('src');
  imagesVotes[imageGenerated2] = imagesVotes[imageGenerated2] + 1;
  saveToPage();
  //console.log('Image ' + images[imageGenerated2] + ' has ' + imagesVotes[imageGenerated2] + ' votes');
  imageGenerated2 = newRandom();
  document.getElementById('image2').src = 'assets/' + images[imageGenerated2] + '.jpg';
  //console.log('image src:', src);
  //console.log('total image2 clicks:', counter);
  imageGenerated1 = newRandom();
  document.getElementById('image1').src = 'assets/' + images[imageGenerated1] + '.jpg';
  imageGenerated3 = newRandom();
  document.getElementById('image3').src = 'assets/' + images[imageGenerated3] + '.jpg';

});

//this will keep a counter for each image for every click
image3.addEventListener('click', function() {
  if(counter === 25) {
    alert('Thanks for your participation');
    displayChart();

    return;
  }
  counter++;
  var src = this.getAttribute('src');
  imagesVotes[imageGenerated3] = imagesVotes[imageGenerated3] + 1;
  saveToPage();
  //console.log('Image ' + images[imageGenerated3] + ' has ' + imagesVotes[imageGenerated3] + ' votes');
  imageGenerated3 = newRandom();
  document.getElementById('image3').src = 'assets/' + images[imageGenerated3] + '.jpg';
  //console.log('image src:', src);
  //console.log('total image3 clicks:', counter);
  imageGenerated2 = newRandom();
  document.getElementById('image2').src = 'assets/' + images[imageGenerated2] + '.jpg';
  imageGenerated1 = newRandom();
  document.getElementById('image1').src = 'assets/' + images[imageGenerated1] + '.jpg';
});

//created a function that wraps the chart called displayChart that will be called after
//the alert is displayed and that will generate the chart to appear in the front page
function displayChart() {
  console.log(imagesVotes);
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: images,
      datasets: [{
        label: 'Number of votes per image',
        data: imagesVotes,
        backgroundColor: [
          '#d3376f',
          '#ecf0ae',
          '#14df4a',
          '#e5e4e4',
          '#cae7e7',
          '#ffe39f',
          '#ff9362',
          '#935428',
          '#23a0a4',
          '#dc4e7e',
          '#fec449',
          '#89cccf',
          '#7f7f7f',
          '#eeba30',
          '#eff295',
          '#2a9873',
          '#2cc8cc',
          '#5122c5',
          '#89cccf',
          '#dc4e7e',
        ],
        borderColor: [
          '#2a9873',
          '#2cc8cc',
          '#5122c5',
          '#7f7f7f',
          '#89cccf',
          '#eeba30',
          '#eff295',
          '#ebde4c',
          '#ee4233',
          '#fec449',
          '#dc4e7e',
          '#cae7e7',
          '#ffe39f',
          '#935428',
          '#ff9362',
          '#d3376f',
          '#ecf0ae',
          '#14df4a',
          '#e5e4e4',
          '#cae7e7',
        ],
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        yAxes: [{
          position: 'left',
          scaleLabel: {
            display: true,
          },
          ticks: {
            fixedStepSize: 1
          },
        }],
      }
    }
  });
}
//this function is to make an array with the votes per images
// function onLoadPage () {
//   if (!localStorage.imagesVotes) return;
//   var storedVotes = localStorage.imagesVotes.split(',');
//   for ( var i = 0; i < storedVotes.length; i++ ) {
//     storedVotes[i] = parseInt(storedVotes[i]);
//   }
//   imagesVotes = storedVotes;
//   console.log('PREPOP', localStorage)
// }
// onLoadPage();
//this will load the info when the page loads
// window.addEventListener('onload', onLoadPage);

// this function will save the imagesVotes to the local Storage
function saveToPage () {
  localStorage.imagesVotes = imagesVotes;
}
