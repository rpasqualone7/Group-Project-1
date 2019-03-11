// Initialize Firebase
var config = {
  apiKey: "AIzaSyApwHaj1nMO7N6J5iYk2FjLs5izzFxIjZM",
  authDomain: "bins-4ba2b.firebaseapp.com",
  databaseURL: "https://bins-4ba2b.firebaseio.com",
  projectId: "bins-4ba2b",
  storageBucket: "bins-4ba2b.appspot.com",
  messagingSenderId: "518275104475"
};
firebase.initializeApp(config);

var dataRef = firebase.database();

// function initMap() {
//   // The location of Uluru
//   var uluru = {lat: -25.344, lng: 131.036};
//   // The map, centered at Uluru
//   var map = new google.maps.Map(
//       document.getElementById('map'), {zoom: 4, center: uluru});
//   // The marker, positioned at Uluru
//   var marker = new google.maps.Marker({position: uluru, map: map});
// }
var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 6
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      infoWindow.setPosition(pos);
      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: 'Hello World!'
      });
      // if you want this, center the map.  Else remove next line
      map.setCenter(pos);          
    }, 
    function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
initMap();
//need to create a min. of 3 html pages (Login Page, Main page, Profile Page)

//Saturday
//Main Page - Jin, Tyler 
//Login Page - Ken (html/ provide the js code for storing each person)
//getting the API's by saturday (for functionality) 
//Tyler - Google Maps API 
//Rich - earth911 API --> can we come up with backup plan. 

//user needs to create a login. --> create user page will collect info specifically addresss.city.state.zipcode
//need to update the login effect (much more user friendly)
//after user creates a login account. login. then, u will be moved to the home page.

//Home page needs(mvp):
//specifically: need to generate a section where user can type in a location. (click submit)
//have a section where the google maps will generate the location entered. (and the closest group in town!)
//here we will have a group A (generate)
//user needs to join group A 
//generate image uploader for all memebers to append to a designated section for groupA
//should allow user's to add a description for the image


//generate trending articles for that area
//generate relevant statistics for that area


//Brainstorm: for utilizing data in a way to make use of any information we can find that may be useful.
// 1.) Area of intrest= Philadelphia
// the 4 of us live in a 10mile radius of each other. = group A 

// 2.) percent of change =  group A / Area of intrest.
// in a given city 1 million people live. how many people live per ft(squared).  




