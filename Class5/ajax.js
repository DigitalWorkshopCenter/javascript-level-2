//have the city data
// [

//   { 'city': 'Abbeville', 'state': 'Louisiana' },
//   { 'city': 'Aberdeen', 'state': 'Maryland' },
//   { 'city': 'Aberdeen', 'state': 'Mississippi' },
//   { 'city': 'Aberdeen', 'state': 'South Dakota' },
//   { 'city': 'Aberdeen', 'state': 'Washington' },
//   { 'city': 'Abilene', 'state': 'Texas' },
//   { 'city': 'Abilene', 'state': 'Kansas' },
//   { 'city': 'Abingdon', 'state': 'Virginia' }]


//AJAX
var ajax = new XMLHttpRequest;
//access across domains - bad
ajax.onreadystatechange = function() {
  if ((this.readyState == 4) && (this.status == 200) {
    console.log(this.responseText);
  }
};
ajax.open("GET","cities.json",true);
ajax.send();  
