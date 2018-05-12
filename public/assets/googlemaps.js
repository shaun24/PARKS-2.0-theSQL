var mapCheck = document.getElementById("map-check");
console.log(mapCheck);
var form = docment.getElementById("pin-form");  
var input = document.getElementsByTagName('input');   
var basketball = document.getElementById("basketball");
var golf = document.getElementById("golf");
/*
var marker = [];
// var Bballmarkers = [];

    var map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(35.227087, -80.843127),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        zoomControl: false
    });

//where i am currently stuck-shaun
// function arrayInfo(place, arrayMarker){

// }

    //code for each checkbox


    // function setBballMap(map) {
    //     for (var i = 0; i < Bballmarkers.length; i++) {
    //       Bballmarkers[i].setMap(map);
    //     }
    //   }	
	
	// function toggleBball() {
	// var chkBballLayer = document.getElementById("basketball"); 
	// if (basketball.checked === true)
		
	// 	setBballMap(map);          
	// else
		
	// 	setBballMap(null);  
    // }
    /*
    
    */
   var activity = checkbox.click(function(){
        'grab addresses from parks with activities'

        return address});

   var map, infoWindow;
        function initMap() {
            map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: 35.2271, lng: 278.9331 },
                zoom: 10
            });
            infoWindow = new google.maps.InfoWindow;

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
            
            
        
            /*
// To add the marker to the map, call setMap();
           // marker.setMap(map);
    
   /*
    var marker = new google.maps.Marker({
        position: activity,
        map: map, 
        title:address
    });
    */


//      var mapMarker= markers.forEach(function(marker) {
//         console.log(marker);
//         var position = function (){
//             for (var i = 0; i <marker.length; i++) {
//             return AllPark.address
//         };
//         var googleMarker = new google.maps.Marker({
//           position: position(),
//           title: marker.name,
//           map: map
//         });
//         googleMarker.addListener('click', function() {
//             var infoWindow = new google.maps.InfoWindow({
//               content: '<h3>' + marker.name + '</h3>'
//             });
//             infoWindow.open(map, googleMarker);
//           });
//         };
//     });



// mapCheck.onclick = function(e){
//     e.preventDefault();
//     console.log(e);
//     var length = input.length;
//     console.log(length);

// };


// $("#basketball").submit(function(){
    // db.AllPark.findAll({
    //     where: {
    //         basketball : true
    //     },
    //     mapMarker()
    // });
// })

        
        // var position = new google.maps.address(marker.lat, marker.lng);
        // for (var i = 0; i <AllPark.length; i++) {
        //     return AllPark.address
        // }