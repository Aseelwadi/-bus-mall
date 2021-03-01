'use strict';

// all of the objects 
Products.prototype.allProducts = [];


var productsSection = document.getElementById('imagesDiv');
var fisrtProductImage = document.getElementById('firstImage');
var secondProductImage = document.getElementById('secondImage');
var thirdProductImage = document.getElementById('thirdImage');
var showResults = document.getElementById('resultsList');
var showResultsButton = document.getElementById('showResults');
var roundsNum = document.getElementById('form');
var ctx = document.getElementById('myChart').getContext('2d');


var firstImageIndex;
var secondImageIndex;
var thirdImageIndex;

var maxAttempts = 25;
var userAttempts = 0;

var imagesNames = [];
 var imgVotes = [];
 var imgViews = [];

// constructor 
function Products(name, imgFilePath) {
    this.name = name;
    this.imgFilePath = imgFilePath;
    this.votes = 0;
    this.shown = 0;

    Products.prototype.allProducts.push(this);
    imagesNames.push(name);

}

// new objects 
new Products('bag', 'img/bag.jpg');
new Products('banana', 'img/banana.jpg');
new Products('bathroom', 'img/bathroom.jpg');
new Products('boots', 'img/boots.jpg');
new Products('breakfast', 'img/breakfast.jpg');
new Products('bubblegum', 'img/bubblegum.jpg');
new Products('chair', 'img/chair.jpg');
new Products('cthulhu', 'img/cthulhu.jpg');
new Products('dog-duck', 'img/dog-duck.jpg');
new Products('dragon', 'img/dragon.jpg');
new Products('pen', 'img/pen.jpg');
new Products('pet-sweep', 'img/pet-sweep.jpg');
new Products('scissors', 'img/scissors.jpg');
new Products('shark', 'img/shark.jpg');
new Products('sweep', 'img/sweep.png');
new Products('tauntaun', 'img/tauntaun.jpg');
new Products('unicorn', 'img/unicorn.jpg');
new Products('usb', 'img/usb.gif');
new Products('water-can', 'img/water-can.jpg');
new Products('wine-glass', 'img/wine-glass.jpg');

// event listener 
imagesDiv.addEventListener('click', userClick);
showResultsButton.addEventListener('click', showResult);
 form.addEventListener('submit', submitter);

renderThreeRandomImages();


//  finctions : 

function userClick(event) {

    if (userAttempts < maxAttempts) {

        if (event.target.id === 'firstImage') {
            userAttempts++;
            Products.prototype.allProducts[firstImageIndex].votes++;
            renderThreeRandomImages();

        } else if (event.target.id === 'secondImage') {
            userAttempts++;
            Products.prototype.allProducts[secondImageIndex].votes++;
            renderThreeRandomImages();

        } else if (event.target.id === 'thirdImage') {
            userAttempts++;
            Products.prototype.allProducts[thirdImageIndex].votes++;
            renderThreeRandomImages();
        }
       
    } else {
        localStorage.setItem ('productObjects' , JSON.stringify(Products.prototype.allProducts)) ; 
        // imagesDiv.removeEventListener('click', userClick);
        showResultsButton.disabled = false;
        showResultsButton.hidden =false;
       

    }
}

function generateRandomIndex() {
    return Math.floor(Math.random() * (Products.prototype.allProducts.length));
}

var pic1;
var pic2;
var pic3;


function renderThreeRandomImages() {

    pic1 = firstImageIndex;
    pic2 = secondImageIndex;
    pic3 = thirdImageIndex;

    firstImageIndex = generateRandomIndex();

    do {
        secondImageIndex = generateRandomIndex();
        thirdImageIndex = generateRandomIndex();
    } while (firstImageIndex === secondImageIndex || firstImageIndex === thirdImageIndex || secondImageIndex === thirdImageIndex)

    do {
        firstImageIndex = generateRandomIndex();
        secondImageIndex = generateRandomIndex();
        thirdImageIndex = generateRandomIndex();

    } while (firstImageIndex === secondImageIndex || firstImageIndex === thirdImageIndex || secondImageIndex === thirdImageIndex ||
    firstImageIndex === pic1 || firstImageIndex === pic2 || firstImageIndex === pic3 || secondImageIndex === pic1 || secondImageIndex === pic2 ||
    secondImageIndex === pic3 || thirdImageIndex === pic1 || thirdImageIndex === pic2 || thirdImageIndex === pic3)


    fisrtProductImage.src = Products.prototype.allProducts[firstImageIndex].imgFilePath;
    secondProductImage.src = Products.prototype.allProducts[secondImageIndex].imgFilePath;
    thirdProductImage.src = Products.prototype.allProducts[thirdImageIndex].imgFilePath;

    Products.prototype.allProducts[firstImageIndex].shown++;
    Products.prototype.allProducts[secondImageIndex].shown++;
    Products.prototype.allProducts[thirdImageIndex].shown++;

}


// choosing number 

function submitter(event) {
    event.preventDefault();
    maxAttempts = event.target.roundsNum.value;    
}

//  ShowResults 
function showResult() {
    showResults.innerHTML='';

    for (var i = 0; i < Products.prototype.allProducts.length; i++) {
        imgVotes.push(Products.prototype.allProducts[i].votes);
        imgViews.push(Products.prototype.allProducts[i].shown);
    }


    var productsResult;
    for (var i = 0; i < Products.prototype.allProducts.length; i++) {
        productsResult = document.createElement('li');
        productsResult.textContent = Products.prototype.allProducts[i].name + ' has ' + Products.prototype.allProducts[i].votes +
            ' votes, and was seen ' + Products.prototype.allProducts[i].shown ;
        showResults.appendChild(productsResult);
    }

    makeChart();
}



function makeChart() {
    var chart = new Chart(ctx, 
    {
        type: 'bar',
        data: 
        {
            labels: imagesNames,
            datasets: 
            [
                {
                    label: 'Votes',
                    backgroundColor: 'rgb(201, 10, 118)',
                    borderColor: 'rgb(255, 51, 153)',
                    data: imgVotes,
                    borderWidth:1,
            borderStyle:'dash'
                },
                {
                    label: 'Shown',
                    backgroundColor: 'rgb(6, 98, 27)',
                    borderColor: 'rgb(248, 220, 129)',
                    data: imgViews,
                }

            ]
        },
        options: 
        
        {
            labels: {
                fontColor: 'black'
                
            },
            
            scales: {
              xAxes: [{
                scaleFontSize: 20
            
              }]
             }
            
        }
    });
    document.getElementById("showResults").innerHTML="Reset";
    showResultsButton.addEventListener('click', reset);
}

function reset (){
    window.location.reload();
}


//if there is anything in the local storage, then get it and parse it

if (localStorage.getItem('productObjects')) {
         
    Products.prototype.allProducts = JSON.parse (localStorage.getItem('productObjects')) ;
 
} 




document.getElementById("showResults").value="Reset";
       

