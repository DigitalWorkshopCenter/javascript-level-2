//map documentation
//https://docs.amcharts.com/3/javascriptmaps

//check if locations is defined
if (localStorage.locations != undefined) {
    var locations = JSON.parse(localStorage.locations);
} else {
    var locations = [];
}


//load the local storage values into the table
var tr = createTableRow(locations);

//add tr to table
var table = document.getElementById('table');
table.appendChild(tr);



//add a listener
var add = document.getElementById('add');
add.addEventListener('click',function(){
	
	
	//grab values from input
	var city = document.getElementById('city').value;
	var state = document.getElementById('state').value;
	var description = document.getElementById('description').value;
	//var latitude = parseInt(document.getElementById('latitude').value);
	//var longitude = Number(document.getElementById('longitude').value);
	
	
	//calculate lat and lng
		//get the latitude and longitude from google api
		var apiKey = "AIzaSyB9GYqbnSsZThqBHahtV4XIczm1JR-lXaA";
	
	var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+city+'+'+state+'&key='+apiKey;
	
	$.get(url,function(data){
		var latitude = data.results[0].geometry.location.lat;
		var longitude = data.results[0].geometry.location.lng;
		
	//add validation 
	//check that the fields arent empty
	//check latitude and longitude are numbers
	var errorMessage  = '';
	//check for empty values
	if ((city === '') || (state === '')) {
		errorMessage = 'Please enter a value';
	}
		
		
			//check if its already there
	var mapData = map.dataProvider.images;
	for (var i=0; i < mapData.length; i++) {
		//loop through what is on the map
		//check that the latitude and longitude arent already there
		if ((mapData[i].latitude === latitude) && (mapData[i].longitude === longitude)) {
			errorMessage = 'No dupliate latitude and longitudes';
			//break out of for loop
			break;
		}
	}
		
		
			if (errorMessage === '') {
            //save the data
            var location = {
                "city": city,
                "state": state,
                "description": description,
                "latitude": latitude,
                "longitude": longitude
            };


            locations.push(location);

            localStorage.locations = JSON.stringify(locations);


			//var data = [city,state,description,latitude,longitude];
			var data = [{"city": city,
			"state": state,
			"description": description,
			"latitude": latitude,
			"longitude": longitude}];

			var tr = createTableRow(data);

			//add tr to table
			var table = document.getElementById('table');
			table.appendChild(tr);

			//create marker object
			var marker = {
				 "svgPath": targetSVG,
					"scale": 0.5,
					"title":city,
					"latitude": latitude,
					"longitude": longitude
            };
            console.log(marker);
			//add the marker to the maps images array
			map.dataProvider.images.push(marker);
			map.validateData();
	} else {
		//display the error messages
		var error = document.getElementById('error');
		error.innerHTML = '';
		
		var message = document.createElement('p');
		message.innerHTML = errorMessage;
		message.className = 'error';
		error.appendChild(message);
	}

	//end jquery get
	});
//end click listener
});






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

//console.log(images);

var map = AmCharts.makeChart( "map", {
  "type": "map",
  "dataProvider": {
    "map": "usa2Low",
    "getAreasFromMap": true,
		    "images": images
  }
} );




function createTableRow(data) {
	var trs;
	console.log(data);
	//loop through the data and create the tds
	for (var i = 0; i < data.length; i++) {
		//creating the table row
		var tr = document.createElement('tr');
		for (var value in data[i]) {
			var td = document.createElement('td');
			td.innerHTML = data[i][value];
			tr.appendChild(td);
		}

		console.log(tr);
		//trs = trs+tr;
	}
	console.log(trs);
	return tr;
}

