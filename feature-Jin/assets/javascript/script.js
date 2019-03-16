
//on click after, entering info to form. This info will get pushed to user info section in firebase. displayed on the main html page. 
$(document).ready(function(){
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
  // A variable to reference the database.
  var dataRef = firebase.database();
  var name;
  var location;
  var activity;
  var email ;
  
  $("#add-user").on("click", function() {
      event.preventDefault();
      // Storing and retreiving new user data
      name = $("#user-name").val().trim();
      location = $("#location").val().trim();
      activity = $("#activity").val().trim();
      email = $("#email").val().trim();

      // Pushing to database
      dataRef.ref().push({
          name: name,
          location: location,
          activity: activity,
          email: email,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
      $("form")[0].reset();
      getGeo();
  });


    dataRef.ref().on("child_added", function(childSnapshot) {
 
    $("#add-row").append("<tr><td>" + childSnapshot.val().name +
    "</td><td>" + childSnapshot.val().location +
    "</td><td>" + childSnapshot.val().activity +
    "</td><td>" + childSnapshot.val().email + "</td></tr>");


}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
    });

    dataRef.ref().orderByChild("userAdded").limitToLast(1).on("child_added", function(snapshot) {
      
        $("#name-display").html(snapshot.val().name);
        $("#email-display").html(snapshot.val().email);
        $("#activity-display").html(snapshot.val().activity);
        $("#location-display").html(snapshot.val().location);
    });
});


//map js-ken
var map = new google.maps.Map(document.getElementById('map'), {
  center: { lat: -33.8688, lng: 151.2195 },
  zoom: 13,
  mapTypeId: 'roadmap',
  styles: [
      {
          "featureType": "administrative.country",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#ffeb3b"
              }
          ]
      },
      {
          "featureType": "poi.government",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi.medical",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi.place_of_worship",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi.school",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.local",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      }
  ]
});

function initAutocomplete() {
  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function () {
      searchBox.setBounds(map.getBounds());
  });
  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function () {
      var places = searchBox.getPlaces();
      if (places.length == 0) {
          return;
      }
      // Clear out the old markers.
      markers.forEach(function (marker) {
          marker.setMap(null);
      });
      markers = [];
      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function (place) {
          if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
          }
          var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
          };
          // Create a marker for each place.
          markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
          }));

          if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
          } else {
              bounds.extend(place.geometry.location);
          }
      });
      map.fitBounds(bounds);
  });
}
function getGeo() {
  var infoWindow;
  infoWindow = new google.maps.InfoWindow;
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
          var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
          };
          infoWindow.open(map);
          map.setCenter(pos);
          var marker = new google.maps.Marker({
              position: pos,
              map: map,
              title: 'Hello!'
          });
      }, function () {
          handleLocationError(true, infoWindow, map.getCenter());
      });
  } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
  }
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
          'Error: The Geolocation service failed.' :
          'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
  }
};
google.maps.event.addDomListener(window, "load", initAutocomplete);

$(document).ready(function(){
    $("#getWeatherForcast").click(function(){
        var city = $("#city").val();
        var key = "f08b7ad219b2e1f12fdb28db902fa0fe";
 
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather",
            dataType: "json",
            type: "GET",
            data: {q:city, appid: key, units: "imperial"},
 
            success: function(data){
                var wf = "";
                $.each(data.weather, function(index, val){
                    wf += "<p><b>" + data.name + "</b><img src=" + val.icon + ".png></p>" +
                    data.main.temp + "&deg;F " + " | " + val.main + ", " + val.description
 
                });
                $("#showWeatherForcast").html(wf)
                console.log(data)
                console.log(wf)
            }
 
        });
    });
 });


 function myFunction2() {
  location.assign("main.html");
}