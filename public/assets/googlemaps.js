function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 35.2271, lng: -80.8431 },
        rotateControl: true,
        zoom: 9
    });

    //function to pull in data and make pins for ALL parks in db
    getParks();
    
    
    
    // marker making functions
    //=======================================================
    var markers = [] // array to hold google marker objects
    var parkArray =[]; //array to hold objects for markers with info boxes and links

    const bballParks = [],
        wheelChairParks = [],
        restroomParks = [];

    // Handicap Access and Restrooms
    //=====================================
    // Handicap Access Markers
    var wheelChairBox = document.getElementById("handiAccess");
    wheelChairBox.isChecked = false;
    wheelChairBox.addEventListener('click', function(){
        if(!wheelChairBox.isChecked){
            wheelChairBox.isChecked = true;
            removeMarkers(markers);
            makeMarkers(wheelChairParks);
        } else {
            removeMarkers(markers);
            wheelChairBox.isChecked = false;
        }        
        //console.log(parkArray);
        console.log(wheelChairBox.isChecked);
        //removeMarkers(parkArray);        
        console.log(`Parks with wheelChair ramps`);
    });


    // Restroom Markers
    var restroomBox = document.getElementById("restrooms");
    restroomBox.isChecked = false;
    restroomBox.addEventListener('click', function(){
        if(!restroomBox.isChecked){
            restroomBox.isChecked = true;
            removeMarkers(markers);
            makeMarkers(restroomParks);
        } else {
            removeMarkers(markers);
            restroomBox.isChecked = false;
        }        
        //console.log(parkArray);
        console.log(restroomBox.isChecked);
        //removeMarkers(parkArray);        
        console.log(`Parks with restrooms`);
    });


    // Basketball Markers
    var basketballBox = document.getElementById("basketball");
    basketballBox.isChecked = false;
    basketballBox.addEventListener('click', function(){
        if(!basketballBox.isChecked){
            basketballBox.isChecked = true;
            removeMarkers(markers);
            makeMarkers(bballParks);
        } else {
            removeMarkers(markers);
           // marker2.setMap(null);
            basketballBox.isChecked = false;
        }        
        //console.log(parkArray);
        console.log(basketballBox.isChecked);
        //removeMarkers(parkArray);        
        console.log(`Parks with Basketball Courts`);
    });


    //call markerMaker Array

    function makeMarkers(array){
        for(let i = 0; i < array.length; i++){
            //add logic here to filter array based on features
            addMarker(array[i]);

        }
    }

    function removeMarkers(array){
        for(let i = 0; i < array.length; i++){
            array[i].setMap(null);
        }
        console.log(`Removed!`);
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

        markers.push(marker2);
    }

    
    function getParks(){
        $.ajax({
            method: "GET",
            url: '/api/parks'
        }).then(function(result){ 

            console.log(result);
                        
            //loop throught result
            for(let i=0; i < result.length; i++){
                let parkName = result[i].name;
                let features = result[i].Features;

                if(result[i].handiAccess){
                    wheelChairParks.push({
                        coords: [parseFloat(result[i].lat), parseFloat(result[i].lng)],
                        content: `<h5><a href="/${parkName}"> ${parkName} Park</a></h5>`
                    });
                }
                
                if(result[i].restrooms){
                    restroomParks.push({
                        coords: [parseFloat(result[i].lat), parseFloat(result[i].lng)],
                        content: `<h5><a href="/${parkName}"> ${parkName} Park</a></h5>`
                    });
                }


                // check for features
                if(features.length > 0){
                    //console.log(`we got features`);
                    for(let j=0; j < features.length; j++){

                        // check for parks with basketball courts
                        if(features[j].name === "Basketball"){
                            bballParks.push({
                                coords: [parseFloat(result[i].lat), parseFloat(result[i].lng)],
                                content: `<h5><a href="/${parkName}"> ${parkName} Park</a></h5>`
                            });
                        }
                    
                        // check for parks with basketball courts
                        if(features[j].name === "Basketball"){
                            bballParks.push({
                                coords: [parseFloat(result[i].lat), parseFloat(result[i].lng)],
                                content: `<h5><a href="/${parkName}"> ${parkName} Park</a></h5>`
                            });
                        }
                    
                    }


                //console.log(result[i].Features);

                //this should take out the spaces ==> just realized the links use the space and capitalization, here if needed
                //let link = parkName.replace(/ /g, '').toLowercase;
                //console.log(link);
              
            }
            //console.log(parkArray);
        var marker = {
                    coords: [parseFloat(result[i].lat), parseFloat(result[i].lng)],
                    content: `<h5><a href="/${parkName}"> ${parkName} Park</a></h5>`
                };
                parkArray.push(marker);


            //return parkArray
            makeMarkers(parkArray)
            console.log(markers);
        }
    });
    

} 

}// end of init map
