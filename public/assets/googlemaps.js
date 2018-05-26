//var db = require("../models");
//var axios= require("axios");




function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 35.2271, lng: -80.8431 },
        rotateControl: true,
        zoom: 11
    });

  
    getParks();
    
    // marker making functions
    //=======================================================
    
    //pull in database info to make arrays

    //array of markers
    const bballParks = [{
        coords:  [35.1945, -80.8420],
        content: `<h6><a href="/all-features">Freedom Park</a></h6>`,
        }];

    const markers = [
        {
         coords:  [35.227,-80.8373],
         content: `<h6><a href="/">First Ward Park</a></h6>`,
        },
        {
        coords:  [35.2271, -80.8431],
        content: `<h6>Charlotte, North Carolina</h6>`,
        },
        {
        coords:  [35.1505, -80.7415],
        content: `<h6>McAlpine Creek Park</h6>`,
        },
        {
        coords:  [35.1945, -80.8420],
        content: `<h6>Freedom Park</h6>`,
        }
        
    ];


   
    var basketballBox = document.getElementById("basketball");
    basketballBox.addEventListener('click', function(){
        
        makeMarkers(bballParks);
        console.log(`console log`)
    });

    //call markerMaker Array
    //makeMarkers(markers);



    function makeMarkers(array){
        for(let i = 0; i < array.length; i++){
            //add logic here to filter array based on features
            addMarker(array[i]);
        }

    }

    function addMarker(props) {
        let infoWindow3;
        let marker2 = new google.maps.Marker({
            position: new google.maps.LatLng(props.coords[0], props.coords[1]),
            animation: google.maps.Animation.DROP,
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
      
        marker2.addListener('click', function(){
            infoWindow3.open(map, marker2);
            map.setZoom(14);
            map.setCenter(marker2.getPosition());
        });
        infoWindow3.addListener('closeclick', function(){
            map.setZoom(11);
            map.setCenter({ lat: 35.2271, lng: -80.8431 });
        })
    }


} // end of init map

function getParks(){
    $.ajax({
        method: "GET",
        url: '/api/parks'
    }).then(function(result){
        console.log(result);
    });
}
            
// Geocoding Funcitons: example makes a list 
//=========================================================
//Call Geocode
//geocode();

//get location  form
var locationForm = document.getElementById('pin-form');

//locationForm.addEventListener('submit', geocode)


function geocode(event, address){
    //change this to checkbox value to find address based on activity selected
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

