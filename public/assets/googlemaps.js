//var map, infoWindow;
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 35.2271, lng: -80.8431 },
        zoom: 11
    });



    let myCenter = map.center;
    let marker = new google.maps.Marker({
        position: myCenter,
        map: map,
        animation: google.maps.Animation.BOUNCE
    });
    //marker.setMap(map);

    let infoWindow2 = new google.maps.InfoWindow({
        content: `<h4> Charlotte, North Carolina </h4>`
    });
    infoWindow2.open(map, marker);
    let infoWindow = new google.maps.InfoWindow;

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

    // addMarker({        
    //     coords: [35.227,-80.8373],
    //     content: `First Ward Park`,
    //     map: map
    // });


   

    
    // marker making functions
    //=======================================================

    //array of markers -- array of objects
    const markers = [
        {
         coords:  [35.227,-80.8373],
         content: `First Ward Park`,
         map: map
        }
        
    ];

    makeMarkers(markers);

    //loop through markers in mrkers array and 
    // for(let i = 0; i < markers.length; i++){
    //     addMarker(markers[i]);
    // }


    function makeMarkers(array){
        for(let i = 0; i < array.length; i++){
            addMarker(array[i]);
        }

    }

    function addMarker(props) {
        let infoWindow3;
        //alert(`add marker function`);
        let marker2 = new google.maps.Marker({
            position: new google.maps.LatLng(props.coords[0], props.coords[1]),
            map: map
        });
        //check for custom icon
        if(props.iconImage){
            //set icon image
            marker2.setIcon(props.iconImage)
        }
        //check for content for info windows on markers
        if(props.content) {
             infoWindow3 = new google.maps.InfoWindow({
                content: props.content
            });
        }
        //marker2.setMap(map);
        marker2.addListener('click', function(){
            infoWindow3.open(map, marker2);
        })
    }




}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}




// addMarker({
//     coords: {lat: x, lng: x},
//     iconImage: '',
//     content: ''
// });



            
// Geocoding Funcitons: example makes a list 
//=========================================================
//Call Geocode
//geocode();

//get location  form
var locationForm = document.getElementById('location-form');

locationForm.addEventListener('submit', geocode)


function geocode(event, address){
    let address = document.getElementById('input-id').value;
    event.pereventDefault();

    //var loaction = address;
    axios.get('https:maps.googleapis.com/api/geocode/json', {
        params: {
            address: address,
            key: 'API KEY'
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

