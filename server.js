

var map;
function initMap() {
  console.log("bye")
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });

  // var request = {
  //   query: 'Starbucks',
  //   fields: ['name', 'geometry'],
  // };

  var input = document.getElementById('pac-input')
  console.log("testing")
  console.log(input.value)
  var request = {
    location: {
      lat: 34.0223563,
      lng: -118.2873057

    },
    radius: 10000,
    keyword: "hotel",
    key: "AIzaSyDQE1OpIbeAAYrxnXAAZCBfL1z5o3WV8Ys"
  }

  service = new google.maps.places.PlacesService(map);
  console.log("service1")
  // service.findPlaceFromQuery(request, function(results, status) {
  //   console.log("servic2e")
  //   if (status === google.maps.places.PlacesServiceStatus.OK) {
  //     for (var i = 0; i < results.length; i++) {
  //       createMarker(results[i]);
  //     }

  //     map.setCenter(results[0].geometry.location);
  //   }
  //   console.log("service")

  // });
  service.nearbySearch(request, function(results, status) {
    console.log("servic2e")
    console.log(results)
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }

      map.setCenter(results[0].geometry.location);
    }
    console.log("service")

  });
}

function createMarker(place) {
  console.log(place)
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });





 
  










}

function searchMap() {
  
    service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, function(results, status) {
      console.log("searchMap")
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }

      map.setCenter(results[0].geometry.location);
    }
  });
}

function initAutocomplete() {
    console.log("hi")
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 34.0236724, lng: -118.2848381},
      zoom: 13,
      mapTypeId: 'roadmap'
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
  
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();
      console.log(places)

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        console.log(place.name)
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

  


        //result box
        // var bounds = new google.maps.LatLngBounds();
        // var placesList = document.getElementById('places');
        // var li = document.createElement('li');
        // li.textContent = "hello";
        // placesList.appendChild(li);

        // if (place.geometry.viewport) {
        //   // Only geocodes have viewport.
        //   bounds.union(place.geometry.viewport);
        // } else {
        //   bounds.extend(place.geometry.location);
        // }
      });
      

      //RESULT TABLE
      //in nested div
      var tableLabel = document.getElementById('table-label')
      var input_Label = document.getElementsByClassName('pac-container pac-logo hdpi')[0].getElementsByClassName('pac-item')[1].getElementsByClassName('pac-item-query')[0].getElementsByClassName('pac-matched')[0].textContent;
      console.log("hi")
      tableLabel.textContent = input_Label + " Results"
      var bounds = new google.maps.LatLngBounds();
      var placesList = document.getElementById('places');
    
      for (var i = 0, place; place = places[i]; i++) {
        var image = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };
  
    
        var li = document.createElement('li');
        li.textContent = place.name;
        placesList.appendChild(li);
    
        bounds.extend(place.geometry.location);
      }
      map.fitBounds(bounds);
    });

  }



