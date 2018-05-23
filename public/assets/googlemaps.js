
   var map, infoWindow;
        function initMap() {
            map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: 35.2271, lng:  -80.8431 },
                zoom: 10
            });
            infoWindow = new google.maps.InfoWindow;
           \
           
            var myMarker = new google.maps.LatLng( 35.2271, -80.8431);
            var marker = new google.maps.Marker({position: myMarker});

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    infoWindow.setPosition(pos);
                    infoWindow.setContent('Location found.');
                    infoWindow.open(map);
                    map.setCenter(pos);
                }, function () {
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


// marker making functions
//=======================================================

 //array of markers -- array of objects
 const markers = [ {lat:  35.2271, lng: -80.8431}];

 //loop through markers in mrkers array and 
  for(let i = 0; i < markers.length; i++){
      addMarker(markers[i]);
  }
 
 
 // { lat: 35.2271, lng: 278.9331 }
 addMarker({
     coords: {lat:  35.2271, lng: -80.8431},
     iconImage: '',
     content: ''
 });



function makeMarkers(array){
     for(let i = 0; i < array.length; i++){
         addMarker(array[i]);
     }
 
 } 
 
function addMarker(props) {
     let marker = new google.maps.Marker({
         position: props.coords,
         //iconImage: url.xxx
         map: map
     });
     //check for custom ico
     if(props.iconImage){
         //set icon image
         marker.setIcon(props.iconImage)
     }
     //check for content for info windows on markers
     if(props.content) {
         let infoWindow = new google.maps.InfoWindow({
             content: props.content
         });
     }
 
     marker.addListener('click', function(){
         infoWindow.open(map, marker);
     })
}
             
 // Geocoding Funcitons: example makes a list 
 //=========================================================
 //Call Geocode
 //geocode();
 
 //get location  form
 //var locationForm = document.getElementById('location-form');
 
 //locationForm.addEventListener('submit', geocode)
 
 
 function geocode(event, address){
     //change address to be dynamic based on db info
     let address = document.getElementById('input-id').value;
     event.pereventDefault();
 
     //var loaction = address;
     axios.get('https:maps.googleapis.com/api/geocode/json', {
         params: {
             address: address,
             key: 'AIzaSyDsEOguZ2RAIJCCleKYvookS0Vcv9ptUU4'
         }
     })
     .then(function(response){
         //log full response
         console.log(response);
 
         //Formatted Address
         var formattedAddress = response.data.results[0].formatted_address;
         var fromattedAddressOutput = `
         <ul>
             <li> ${formattedAddress}</li>
         </ul>
         `;
        
 
 
         //Address Components
         var addressComponents = response.data.results[0].address_componets;
         var addressComponentsOutput = ` <ul> `;
         for(let i = 0; i < addressComponents.length; i++){
             addressComponentsOutput += `
             <li><strong>${addressComponents[i].types[0]}</strong>: ${addressComponents[i].long_name}</li>
             `;
         }
 
         addressComponentsOutput += `</ul>`;
 
         //Geometry
         var lat = response.data.results[0].geometry.location.lat;
         var lng = response.data.results[0].geometry.location.lng;
 
         var geometryOutput = `
         <ul>
             <li> <strong>Latitude</strong>${lat}</li>
             <li> <strong>Longitude</strong>${lng}</li>
         </ul>
         `;
 
 
         //output to app
         document.getElementById('formatted-address').innerHTML = formattedAddressOutput;
         document.getElementById('address-components').innerHTML = addressComponentsOutput;
         document.getElementById('geometry').innerHTML = geometryOutput;
     })
     .catch(function(error){
         console.log(error);
     });
 }

