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
    
    // Arrays to hold markers based on feature
    const bballParks = [],
        wheelChairParks = [],
        restroomParks = [],
        discGolfParks =[],
        horseshoeParks = [],
        picnicParks = [],
        playgroundParks =[],
        fieldParks = [],
        tennisParks = [],
        trackParks = [],
        trailParks = [],
        concessionParks = [],
        vballParks = [],
        waterParks =[];

    
 // Checkbox Variables
    //=====================================
    const wheelChairBox = document.getElementById("handiAccess"),
            restroomBox = document.getElementById("restrooms"),
            basketballBox = document.getElementById("basketball"),
            discGolfBox = document.getElementById("disc-golf"),
            playgroundBox = document.getElementById("playgrounds"),
            picnicBox = document.getElementById("picnic"),
            horseshoeBox = document.getElementById("horseshoes"),
            fieldBox = document.getElementById("fields"),
            tennisBox = document.getElementById("tennis"),
            trackBox = document.getElementById("tracks"),
            trailBox = document.getElementById("trails"),
            concessionBox = document.getElementById("concessions")
            volleyballBox = document.getElementById("volleyball"),
            waterBox = document.getElementById("water-activities");


    
    
    //handiAccess markers
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
        console.log(`Parks with restrooms`);
    });


    // Basketball Markers
    basketballBox.isChecked = false;
    basketballBox.addEventListener('click', function(){
        if(!basketballBox.isChecked){
            basketballBox.isChecked = true;
            removeMarkers(markers);
            makeMarkers(bballParks);
        } else {
            removeMarkers(markers);
            basketballBox.isChecked = false;
        }         
        console.log(`Parks with Basketball Courts`);
    });

    // Disc Golf Markers
    discGolfBox.isChecked = false;
    discGolfBox.addEventListener('click', function(){
        if(!discGolfBox.isChecked){
            discGolfBox.isChecked = true;
            removeMarkers(markers);
            makeMarkers(discGolfParks);
        } else {
            removeMarkers(markers);
            discGolfBox.isChecked = false;
        }               
        console.log(`Parks with Disc Golf`);
    });

    // Playground Markers
    picnicBox.isChecked = false;
    picnicBox.addEventListener('click', function(){
        if(!picnicBox.isChecked){
            picnicBox.isChecked = true;
            removeMarkers(markers);
            makeMarkers(picnicParks);
        } else {
            removeMarkers(markers);
            picnicBox.isChecked = false;
        }              
        console.log(`Parks with Picnic Areas`);
    });

    // Playground Markers
    playgroundBox.isChecked = false;
    playgroundBox.addEventListener('click', function(){
        if(!playgroundBox.isChecked){
            playgroundBox.isChecked = true;
            removeMarkers(markers);
            makeMarkers(playgroundParks);
        } else {
            removeMarkers(markers);
           // marker2.setMap(null);
            playgroundBox.isChecked = false;
        }              
        console.log(`Parks with playgrounds`);
    });

    // field Markers
    fieldBox.isChecked = false;
    fieldBox.addEventListener('click', function(){
        if(!fieldBox.isChecked){
            fieldBox.isChecked = true;
            removeMarkers(markers);
            makeMarkers(fieldParks);
        } else {
            removeMarkers(markers);
            fieldBox.isChecked = false;
        }            
        console.log(`Parks with field`);
    });

    // Horseshoe Markers
    horseshoeBox.isChecked = false;
    horseshoeBox.addEventListener('click', function(){
        if(!horseshoeBox.isChecked){
            horseshoeBox.isChecked = true;
            removeMarkers(markers);
            makeMarkers(horseshoeParks);
        } else {
            removeMarkers(markers);
            horseshoeBox.isChecked = false;
        }            
        console.log(`Parks with horseshoes`);
    });

    // Tennis Markers
    tennisBox.isChecked = false;
    tennisBox.addEventListener('click', function(){
        if(!tennisBox.isChecked){
            tennisBox.isChecked = true;
            removeMarkers(markers);
            makeMarkers(tennisParks);
        } else {
            removeMarkers(markers);
            tennisBox.isChecked = false;
        }               
        console.log(`Parks with tennis Courts`);
    });

    // Track Markers
    trackBox.isChecked = false;
    trackBox.addEventListener('click', function(){
        if(!trackBox.isChecked){
            trackBox.isChecked = true;
            removeMarkers(markers);
            makeMarkers(trackParks);
        } else {
            removeMarkers(markers);
            trackBox.isChecked = false;
        }               
        console.log(`Parks with tracks`);
    });

    // Trail Markers
    trailBox.isChecked = false;
    trailBox.addEventListener('click', function(){
        if(!trailBox.isChecked){
            trailBox.isChecked = true;
            removeMarkers(markers);
            makeMarkers(trailParks);
        } else {
            removeMarkers(markers);
            trailBox.isChecked = false;
        }             
        console.log(`Parks with trails`);
    });

    // Concessions Markers
    concessionBox.isChecked = false;
    concessionBox.addEventListener('click', function(){
        if(!concessionBox.isChecked){
            concessionBox.isChecked = true;
            removeMarkers(markers);
            makeMarkers(concessionParks);
        } else {
            removeMarkers(markers);
            concessionBox.isChecked = false;
        }                
        console.log(`Parks with concessions`);
    });

    // Volleyball Markers
    volleyballBox.isChecked = false;
    volleyballBox.addEventListener('click', function(){
        if(!volleyballBox.isChecked){
            volleyballBox.isChecked = true;
            removeMarkers(markers);
            makeMarkers(vballParks);
        } else {
            removeMarkers(markers);
            volleyballBox.isChecked = false;
        }        
           
        console.log(`Parks with volleyball Courts`);
    });

    // Water Activity Markers
    waterBox.isChecked = false;
    waterBox.addEventListener('click', function(){
        if(!waterBox.isChecked){
            waterBox.isChecked = true;
            removeMarkers(markers);
            makeMarkers(waterParks);
        } else {
            removeMarkers(markers);
            waterBox.isChecked = false;
        }        
        console.log(`Parks with Water Activities`);
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
            map.setZoom(9);
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
                let address = result[i].address;
                let size = result[i].size;
                let features = result[i].Features;

                if(result[i].handiAccess){
                    wheelChairParks.push({
                        coords: [parseFloat(result[i].lat), parseFloat(result[i].lng)],
                        content:`<h1><a href="/${parkName}"> ${parkName} Park</a></h1>
                              <h2>${address}</h2>
                              <h2>${size} acres </h2>`
                    });
                }
                
                if(result[i].restrooms){
                    restroomParks.push({
                        coords: [parseFloat(result[i].lat), parseFloat(result[i].lng)],
                        content:`<h1><a href="/${parkName}"> ${parkName} Park</a></h1>
                              <h2>${address}</h2>
                              <h2>${size} acres </h2>`
                    });
                }

                // check for features
                if(features.length > 0){
                    for(let j=0; j < features.length; j++){

                        let feature = features[j].name;

                        switch(feature){
                            case "Basketball":
                                bballParks.push({
                                    coords: [parseFloat(result[i].lat), parseFloat(result[i].lng)],
                                    content: `<h1><a href="/${parkName}"> ${parkName} Park</a></h1>
                              <h2>${address}</h2>
                              <h2>${size} acres </h2>`
                                });
                            break;
                            case "Concessions":
                            concessionParks.push({
                                coords: [parseFloat(result[i].lat), parseFloat(result[i].lng)],
                                content: `<h1><a href="/${parkName}"> ${parkName} Park</a></h1>
                              <h2>${address}</h2>
                              <h2>${size} acres </h2>`
                            });
                            break;
                            case "Disc Golf":
                            discGolfParks.push({
                                coords: [parseFloat(result[i].lat), parseFloat(result[i].lng)],
                                content: `<h1><a href="/${parkName}"> ${parkName} Park</a></h1>
                                          <h2>${address}</h2>
                                          <h2>${size} acres </h2>`
                            });
                            break;
                            case "Fields":
                            fieldParks.push({
                                coords: [parseFloat(result[i].lat), parseFloat(result[i].lng)],
                                content: `<h1><a href="/${parkName}"> ${parkName} Park</a></h1>
                                          <h2>${address}</h2>
                                          <h2>${size} acres </h2>`
                            });
                            break;
                            case "Horseshoes":
                            horseshoeParks.push({
                                coords: [parseFloat(result[i].lat), parseFloat(result[i].lng)],
                                content: `<h1><a href="/${parkName}"> ${parkName} Park</a></h1>
                                          <h2>${address}</h2>
                                          <h2>${size} acres </h2>`
                            });
                            break;
                            case "Picnic Area":
                            picnicParks.push({
                                coords: [parseFloat(result[i].lat), parseFloat(result[i].lng)],
                                content: `<h1><a href="/${parkName}"> ${parkName} Park</a></h1>
                                          <h2>${address}</h2>
                                          <h2>${size} acres </h2>`
                            });
                            break;
                            case "Playground":
                            playgroundParks.push({
                                coords: [parseFloat(result[i].lat), parseFloat(result[i].lng)],
                                content: `<h1><a href="/${parkName}"> ${parkName} Park</a></h1>
                                          <h2>${address}</h2>
                                          <h2>${size} acres </h2>`
                            });
                            break;
                            case "Tennis":
                            tennisParks.push({
                                coords: [parseFloat(result[i].lat), parseFloat(result[i].lng)],
                                content: `<h1><a href="/${parkName}"> ${parkName} Park</a></h1>
                                          <h2>${address}</h2>
                                          <h2>${size} acres </h2>`
                            });
                            break;
                            case "Track":
                            trackParks.push({
                                coords: [parseFloat(result[i].lat), parseFloat(result[i].lng)],
                                content: `<h1><a href="/${parkName}"> ${parkName} Park</a></h1>
                                          <h2>${address}</h2>
                                          <h2>${size} acres </h2>`
                            });
                            break;
                            case "Trails":
                            trailParks.push({
                                coords: [parseFloat(result[i].lat), parseFloat(result[i].lng)],
                                content: `<h1><a href="/${parkName}"> ${parkName} Park</a></h1>
                                          <h2>${address}</h2>
                                          <h2>${size} acres </h2>`
                            });
                            break;
                            case "Volleyball":
                            vballParks.push({
                                coords: [parseFloat(result[i].lat), parseFloat(result[i].lng)],
                                content: `<h1><a href="/${parkName}"> ${parkName} Park</a></h1>
                                          <h2>${address}</h2>
                                          <h2>${size} acres </h2>`
                            });
                            break;
                            case "Water Activities":
                            waterParks.push({
                                coords: [parseFloat(result[i].lat), parseFloat(result[i].lng)],
                                content: `<h1><a href="/${parkName}"> ${parkName} Park</a></h1>
                                          <h2>${address}</h2>
                                          <h2>${size} acres </h2>`
                            });
                            break;
                        } // end of switch statement

                                            
                    }  // end of features loop


                //console.log(result[i].Features);

                //this should take out the spaces ==> just realized the links use the space and capitalization, here if needed
                //let link = parkName.replace(/ /g, '').toLowercase;
                //console.log(link);
              
            }
            //console.log(parkArray);
            var marker = {
                    coords: [parseFloat(result[i].lat), parseFloat(result[i].lng)],
                    content: `<h1><a href="/${parkName}"> ${parkName} Park</a></h1>
                              <h2>${address}</h2>
                              <h2>${size} acres </h2>`
            };
                
            parkArray.push(marker);


            makeMarkers(parkArray);

        } // results loop

    }); // end of .then()
    

    } // end of getParks() 

} // end of initMap()
