import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, FlatList, TextInput } from 'react-native';

const endpoint = 'https://api.hgbrasil.com/finance';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      load: false,
      res: null
    };

    fetch(endpoint)
      .then(r => r.json())
      .then(json => {
        let s = this.state;
        s.currencies = json.results.currencies;
        s.load = true;
        this.setState(s);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.load &&

          <View style={styles.content}>
            <Text style={styles.title}>USD para BRL</Text>
            <TextInput placeholder='$' style={styles.input} keyboardType='numeric' onChangeText={(num) => {
              let s = this.state;
              s.res = (num * s.currencies.USD.buy);
              this.setState(s);
            }} />
            <Text style={styles.txt}>Valor convertido: R${this.state.res}</Text>
          </View>

        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd'
  },
  content: {
    backgroundColor: '#ccc',
    width: '80%',
    height: '40%',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10
  },
  input: {
    borderWidth: 1,
    width: '80%',
    height: 40,
    borderRadius: 5
  },
  title: {
    fontSize: 20
  },
  txt: {
    fontSize: 18
  }
});
