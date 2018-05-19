import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


const Map = withScriptjs(withGoogleMap((props) =>
    
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat: 35.227, lng: -80.843 }}
      >
    
    {props.markers.map((item) => {
            return(
            <Marker key={item.id} position={{ lat: item.lat, lng: item.lng }} />
            )
        })}

  </GoogleMap>
))

const MapForm = props => {
    return (
          <form onChange={props.handleChange}>
            <label>
              Option 1
              <input type="checkbox" id={3} />
            </label>
            <label>
                Option 2
            <input type="checkbox" id={4} />
            </label>
            <label>
                Option 3
            <input type="checkbox" value="option3" />
            </label>
            <label>
                Option 4
            <input type="checkbox" value="option4" />
            </label>
            <label>
                Option 5
            <input type="checkbox" value="option5" />
            </label>
          </form>
        );
    }



class MapContainer extends Component {
    constructor(props){
        super(props);
        this.state={ 
            markers:[{ id: 1, lat: 35.227, lng: -80.843},{ id:2, lat: 35.151, lng: -80.742}]
          }
        }

    // toggleMark(newMark){
    //     this.setState()
    // }

    mark( newMark) {
        //works for adding pins
        let markers = [...this.state.markers];
        this.setState({
          markers: [...markers, newMark]
        })
        console.log(this.state.markers.length);
        markers = [...this.state.markers];
        //this.setState({markers: [...markers, newMark ]});
        return;

    }

    unMark(markers){
        //let markers = [...this.state.markers];
        this.setState({
            markers: [...markers]
        })
        console.log(`spliced!!!!`);
        //this.setState({markers: markers});
        return;
             
          }
    
      
    handleChange(event){
        console.log(`
=====================================================================================================        
        `);

        //make new array copy of state.markers
        let markers = [...this.state.markers];
        console.log(markers.length)
        let newid = event.target.id;
        //console.log(`newid: ${newid}  marker length: ${markers.length}`)
       // loop not looping
       for(let i = 0; i < markers.length; i++){
        
           console.log(i);
            //console.log(`HERE: ${markers[i].id}`)
            if(markers[i].id === parseFloat(newid)){
                console.log(`i: ${i}`)
                //let index = markers.indexOf();
                //console.log(index);            
                markers.splice(i, 1);   
                this.unMark(markers);
                console.log(`UNMARKED------`) 

            } else {
                //otherwise, add a new pin to the map based on selection               
                let newMark;
                
               switch(newid) {
                case '3':    
                    newMark = {id: parseFloat(newid), lat: 35.123, lng: -80.654};                   
                break;
                case '4':
                    newMark = {id: parseFloat(newid), lat: 35.234, lng: -80.765};                   
                break;    
                default:
                    console.log(`falling through`)
                    
                }
                this.mark(newMark);
               
                
                
            }
              
        }
        
    }  
        
       
      
    
    
    render(){
        return(
            <div>
                <Map
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}   
                markers={this.state.markers}             
                />
                
                <MapForm 
                handleChange={this.handleChange.bind(this)}
                />
            </div>

        )
    }
}

export default MapContainer;