import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions
  
} from 'react-native';

import BaiduMap from './map/baidumapDemo';
import InfoPanel from './compnent/infoPanel';

import {
  StackNavigator,
} from 'react-navigation';

const BasicApp = StackNavigator({
  Main: {screen: BaiduMap},
  Profile: {screen: InfoPanel},
}, {
  headerMode:'screen'

});

export default class App extends Component{
    constructor(){
        super()
    }

    render(){
        return(
            <View style={styles.container}>
              {/*
                <StatusBar hidden={false} 
                animated={true}
                style = {{flex:1}}
                ></StatusBar>

                <View style={styles.status}/>
                */
              }
                

                
                <BasicApp></BasicApp>
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