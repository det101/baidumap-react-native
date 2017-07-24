import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  PixelRatio,
  Button
} from 'react-native';

export default class InfoPanel extends Component{

    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.name,
    });

    constructor(){
        super();
    }

    
  render() {
    const { goBack, navigate } = this.props.navigation;
    return (
      <Button
        title="Go back"
        onPress={() =>  
            // navigate('Main', { name: 'Jane' })
            goBack()
        }
      />
    );
  }

  

}

const styles = StyleSheet.create({
    container:{flex: 1}
});