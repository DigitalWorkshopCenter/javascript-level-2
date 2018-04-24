//map documentation
//https://docs.amcharts.com/3/javascriptmaps

//check if locations is defined
if (localStorage.locations != undefined) {
  var locations = JSON.parse(localStorage.locations);
} else {
  var locations = [];
}

//load the local storage values into the table
var trs = createTableRow(locations);

//add tr to table
var table = document.getElementById('table');

//check for any existing table rows
for(var i = 0; i < trs.length; i++) {
  table.appendChild(trs[i]);
}

//add new location to the map
var add = document.getElementById('add');
add.addEventListener('click', addLocation);

//load the map with default locations
var targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";
var images = [];
//loop through locations and add them to the map
for (var i = 0; i < locations.length; i++) {
  //console.log(locations[i]);
  var mapLocation = {
    "svgPath": targetSVG,
    "scale": 0.5,
    "title": locations[i].city,
    "latitude": locations[i].latitude,
    "longitude": locations[i].longitude
  };
  images.push(mapLocation);
}


var map = AmCharts.makeChart("map", {
  "type": "map",
  "dataProvider": {
    "map": "usa2Low",
    "getAreasFromMap": true,
    "images": images
  }
});






//add current location button
var addlocation = document.getElementById('addlocation');
addlocation.addEventListener('click',function(){
  //get the current location
  var coordinates = {};

 navigator.geolocation.getCurrentPosition(function(position){
   coordinates.latitude = position.coords.latitude;
   coordinates.longitude = position.coords.longitude;
   //add it to the table and map
   addLocation(coordinates);   
  });
});



function createTableRow(data) {
  var trs = [];
  //console.log(data);
  //loop through the data and create the tds
  for (var i = 0; i < data.length; i++) {
    //creating the table row
    var tr = document.createElement('tr');
    for (var value in data[i]) {
      var td = document.createElement('td');
      td.innerHTML = data[i][value];
      tr.appendChild(td);
    }

    //console.log(tr);
    trs.push(tr);
  }
  //console.log(trs);
  return trs;
}

///functions moved from add to map
//add validation 
//check that the fields arent empty
//check latitude and longitude are numbers
function validateCoordinates(city, state, latitude, longitude) {
  var errorMessage = '';
  //check for empty values
  if ((city === '') || (state === '')) {
    errorMessage = 'Please enter a value';
    //can exit here don't need to run the other validation
    return errorMessage;
  }

  //check if this location is already on the map
  var mapData = map.dataProvider.images;
  console.log(mapData);
  for (var i = 0; i < mapData.length; i++) {
    //loop through what is on the map
    //check that the latitude and longitude arent already there
    if ((mapData[i].latitude === latitude) && (mapData[i].longitude === longitude)) {
      errorMessage = 'No dupliate latitude and longitudes allowed';
      //break out of for loop
      return errorMessage;
    }
  }

  return errorMessage;
}


function addToLocalStorage(location) {
  locations.push(location);
  localStorage.locations = JSON.stringify(locations);
}

function addToMap(targetSVG, city, latitude, longitude) {
  //create marker object
  var marker = {
    "svgPath": targetSVG,
    "scale": 0.5,
    "title": city,
    "latitude": latitude,
    "longitude": longitude
  };
  //console.log(marker);
  //add the marker to the maps images array
  map.dataProvider.images.push(marker);
  map.validateData();
}


function displayError(errorMessage) {
  //display the error messages
  var error = document.getElementById('error');
  error.innerHTML = '';

  var message = document.createElement('p');
  message.innerHTML = errorMessage;
  message.className = 'error';
  error.appendChild(message);
} 

function addLocation(coordinates = '') {
  //need this to work for both geolocation and original use

  //check if coordinates are passed through
  if (coordinates.latitude !== undefined) {
    //if they are, don't need to run gelocation on the city and state, but backwards
    var latitude = coordinates.latitude;
    var longitude = coordinates.longitude;

    //reverse geocoding API
    var apiKey = "AIzaSyB9GYqbnSsZThqBHahtV4XIczm1JR-lXaA";    
    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude+'&key=' + apiKey;

    $.get(url, function (data) {
      console.log(data.results[0].address_components[2].long_name);
      //validation is checking for city and state, latitude and longitude
      //var city = data.
      var city = data.results[0].address_components[2].long_name;
      var state = data.results[0].address_components[4].long_name;

      var description = city+', '+state;

      var errorMessage = validateCoordinates(city, state, latitude, longitude);

      if (errorMessage === '') {
        //save the data
        var location = {
          "city": city,
          "state": state,
          "description": description,
          "latitude": latitude,
          "longitude": longitude
        };

        addToLocalStorage(location);

        var data = [location];
        var tr = createTableRow(data);
        //add tr to table
        var table = document.getElementById('table');
        table.appendChild(tr[0]);

        //add to map
        addToMap(targetSVG, city, latitude, longitude);
      } else {
        displayError(errorMessage);
      }
    });

  } else {
    //dont know the coordinates calcualte them
    //grab values from input
    var city = document.getElementById('city').value;
    var state = document.getElementById('state').value;
    var description = document.getElementById('description').value;

    var apiKey = "AIzaSyB9GYqbnSsZThqBHahtV4XIczm1JR-lXaA";
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + city + '+' + state + '&key=' + apiKey;

    $.get(url, function (data) {
      var latitude = data.results[0].geometry.location.lat;
      var longitude = data.results[0].geometry.location.lng;

      var errorMessage = validateCoordinates(city, state, latitude, longitude);
      if (errorMessage === '') {
        //save the data
        var location = {
          "city": city,
          "state": state,
          "description": description,
          "latitude": latitude,
          "longitude": longitude
        };

        addToLocalStorage(location);

        var data = [location];
        var tr = createTableRow(data);
        //add tr to table
        var table = document.getElementById('table');
        table.appendChild(tr[0]);

        //add to map
        addToMap(targetSVG, city, latitude, longitude);
      } else {
        displayError(errorMessage);
      }

      //end jquery get
    });
  }
}