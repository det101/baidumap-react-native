import React, {
  Component,
  PropTypes
} from 'react';

import {
  MapView,
  MapTypes,
  Geolocation,
  Icon,
  NavigationItem
} from 'react-native-baidu-map';

import {
  Button,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  TouchableOpacity
} from 'react-native';

import SearchInput from '../compnent/searchText';
import Dimensions from 'Dimensions';
import HttpLoader from '../net/HttpLoader';

class NavBar extends Component{
  render(){
    return(
      <View>
        <Text>Test</Text>
      </View>
    )
  }
}

export default class BaiduMapDemo extends Component {

  static navigationOptions = ({ navigation }) => (
      {
        headerTitle: 'wei',
        headerTintColor: "#fff",   
        headerStyle: { backgroundColor: '#ccc', height:  64},
         headerLeft:(
           <Text style={{left:10, color:'#0000ff'}}
            onPress={() =>{
              // navigation.state.params.navigatePress(navigation)
              navigation.navigate('Profile', { name: 'Profile' })
            }
          }
          >
          登陆
          </Text>
        )   
      }
    );

  constructor() {
    super();

    this.state = {
      mayType: MapTypes.NORMAL,
      zoom: 15,
      center: {
        longitude: 113.981718,
        latitude: 22.542449
      },
      trafficEnabled: false,
      baiduHeatMapEnabled: false,
      markers: [{
        longitude: 113.981718,
        latitude: 22.542449,
        title: "Window of the world"
      },{
        longitude: 113.995516,
        latitude: 22.537642,
        title: ""
      }]
    };

    this.clickFinishButton = this.clickFinishButton.bind(this);
  }

  componentDidMount() {
    this._getCurrentPosition();
    // this.props.navigation.setParams({navigatePress:this.clickFinishButton})
  }

  clickFinishButton(navigation) {
      navigation.navigate('Profile', { name: 'Profile' });
  }
  
  _search(txt){
              var url = 'https://api.map.baidu.com/place/v2/suggestion?query='+ txt +'&region=上海市&city_limit=true&output=json&ak=G2RfzVTGAhRSKirroplcNEbH0nw5GlGs&mcode=com.lux.OldDriver';
              HttpLoader.load(url
                ,(data)=>{

                  if(data.status != 0){
                      console.warn('status error', data );
                      return;
                  }
                  let mapInfo = {}, markers = [], marker, center;

                  data.result.forEach(function(element, index) {
                    if(element.location && element.location.lat){  
                      marker = {title: element.name, latitude: element.location.lat, longitude: element.location.lng};
                      markers.push(marker);
                      if(!center)
                        center = {rand: Math.random(), latitude: element.location.lat, longitude: element.location.lng}
                    }
                    
                  }, this);
                  mapInfo.markers = markers;
                  mapInfo.center = center;
                  console.warn(markers.length,data.result.length);
                  this.setState(mapInfo); 


                });
  }

  _getCurrentPosition(){
    Geolocation.getCurrentPosition()
              .then(data => {
                console.warn(JSON.stringify(data));
                this.setState({
                  marker: {
                    latitude: data.latitude,
                    longitude: data.longitude,
                    title: 'Your location'
                  },
                  center: {
                    latitude: data.latitude,
                    longitude: data.longitude,
                    rand: Math.random()
                  }
                });
              })
              .catch(e =>{
                console.warn(e, 'error');
              })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>

         
        <View style={{zIndex:100}}>
           <SearchInput searchFun = {(t)=> {this._search(t)}}/>
        </View>
        
        
        <View>
          <MapView 
                  trafficEnabled={this.state.trafficEnabled}
                  baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                  zoom={this.state.zoom}
                  mapType={this.state.mapType}
                  center={this.state.center}
                  marker={this.state.marker}
                  markers={this.state.markers}
                  style={styles.map}
                  onMarkerClick={(e) => {
                    console.warn(JSON.stringify(e));
                  }}
                  onMapClick={(e) => {
              }}>
          </MapView>
        </View>
        
      
        
        
      
        <View style={styles.row}>
          <Button title="Normal" onPress={() => {
            this.setState({
              mapType: MapTypes.NORMAL
            });
          }} />
          <Button style={styles.btn} title="Satellite" onPress={() => {
            this.setState({
              mapType: MapTypes.SATELLITE
            });
          }} />

          <Button style={styles.btn} title="Locate" onPress={() => {
            
            this._getCurrentPosition();
            
          }} />
        </View>

        <View style={styles.row}>
          <Button title="Zoom+" onPress={() => {
            this.setState({
              zoom: this.state.zoom + 1
            });
          }} />
          <Button title="Zoom-" onPress={() => {
            if(this.state.zoom > 0) {
              this.setState({
                zoom: this.state.zoom - 1
              });
            }
            
          }} />
        </View>

        <View style={styles.row}>
          <Button title="Traffic" onPress={() => {
            this.setState({
              trafficEnabled: !this.state.trafficEnabled
            });
          }} />

          <Button title="Baidu HeatMap" onPress={() => {
            this.setState({
              baiduHeatMapEnabled: !this.state.baiduHeatMapEnabled
            });
          }} />
        </View> 
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    height: 40,
  },
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height-200,
  },
  textInput:{
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    flex:4,
  } ,
   btn: {
        width: 100,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor:'#ff0000',
        borderRadius:10,
        flex:1
    },

    btnText: {
        fontSize: 18
    }
});