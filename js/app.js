import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions
  
} from 'react-native';

import BaiduMap from './map/baidumapDemo'

export default class App extends Component{
    constructor(){
        super()
    }

    render(){
        return(
            <View style={styles.container}>
                <StatusBar hidden={false} 
                animated={true}
                style = {{flex:1}}
                ></StatusBar>

                <View style={styles.status}/>

                
                <BaiduMap></BaiduMap>
            </View>
            );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  status:{
    height:21,
    width:Dimensions.get('window').width,
  }
});