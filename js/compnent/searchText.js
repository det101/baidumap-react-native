import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  PixelRatio
} from 'react-native';
 
 import HttpLoader from '../net/HttpLoader';

//输入框组件
export default class SearchInput extends Component {
  //构造函数
  constructor(props) {
    super(props);
    this.state = {text: '', show: false, textList: []};
  }
 
  //组件渲染
  render() {
    return (
      <View style={styles.flex}>
          <View style={[styles.flexDirection, styles.inputHeight]}>
            <View style={styles.flex}>
              <TextInput
                style={styles.input}
                returnKeyType="search"
                placeholder="输入目的地"
                value={this.state.text}
                onChangeText={this.textChange.bind(this)}/>
            </View>
            <View style={styles.btn}>
              <Text style={styles.search} onPress={this.search.bind(this)}>搜索</Text>
            </View>
          </View>
          {this.state.show?
            <View style={styles.list}>
              {
                 this.state.textList.map(
                   (itemData,i) => (
                     <Text onPress={this.hideList.bind(this, itemData)}
                           key={i}
                           style={styles.item} numberOfLines={1}>{itemData.name}</Text>
                   )
                 )
              }
            </View>
            : null
          }
      </View>
    );
  }
 
  //输入框文字改变
  textChange(text){
    this.setState({text: text});
    if(text == ''){
       this.setState({
        show: false,
        textList: []
    })
      return;
    }
    let url = 'https://api.map.baidu.com/place/v2/search?query=' + text +'&page_size=10&page_num=0&scope=1&region=上海&output=json&ak=G2RfzVTGAhRSKirroplcNEbH0nw5GlGs&mcode=com.lux.OldDriver';
    HttpLoader.load(url, this._searchText.bind(this));
  }

  _searchText(data){
      if(data.status == 0){
        let arr = data.results;
        this.setState({
        show: arr.length > 0,
        textList: arr
    });
      }
  }
 
  //隐藏自动提示列表
  hideList(item){
    this.setState({
      show: false,
      text: item.name
    });
  }
 
  //搜索按钮点击
  search(){

    this.props.searchFun && this.props.searchFun(this.state.text);
  }
}

//样式定义
const styles = StyleSheet.create({
  flex:{
    flex: 1,
  },
  flexDirection:{
    flexDirection:'row'
  },
  topStatus:{
    marginTop:25,
  },
  inputHeight:{
    height:40,
  },
  input:{
    height:40,
    borderWidth:1,
    marginLeft: 5,
    paddingLeft:5,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor:'#fff'
  },
  btn:{
    width:55,
    marginLeft:-5,
    marginRight:5,
    backgroundColor:'#23BEFF',
    height:40,
    justifyContent:'center',
    alignItems: 'center'
  },
  search:{
    color:'#fff',
    fontSize:15,
    fontWeight:'bold'
  },
  list:{
    marginTop: 1/PixelRatio.get(),
    marginLeft:5,
    marginRight:5,
    height:200,
    borderColor:'#ccc',
    borderTopWidth: 1/PixelRatio.get(),
  },
  item:{
    fontSize:16,
    padding:5,
    paddingTop:10,
    paddingBottom:10,
    borderWidth: 1/PixelRatio.get(),
    borderColor:'#ddd',
    borderTopWidth:0,
  }
});