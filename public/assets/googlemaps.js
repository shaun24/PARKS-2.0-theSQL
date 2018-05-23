//var map, infoWindow;
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 35.2271, lng: -80.8431 },
        zoom: 12
    });

  

    
    // marker making functions
    //=======================================================

    //array of markers
    const markers = [
        {
         coords:  [35.227,-80.8373],
         content: `<h6>First Ward Park</h6>`,
         //map: map
        },
        {
        coords:  [35.2271, -80.8431],
        content: `Charlotte, North Carolina`,
        //map: map,
        },
        {
        coords:  [35.1505, -80.7415],
        content: `<h6>McAlpine Creek Park</h6>`,
        //map: map,
        }
        
    ];


    //call markerMaker Array
    makeMarkers(markers);



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
        })
    }


} // end of init map


            
// Geocoding Funcitons: example makes a list 
//=========================================================
//Call Geocode
//geocode();

//get location  form
var locationForm = document.getElementById('location-form');

//locationForm.addEventListener('submit', geocode)


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

