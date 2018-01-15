import React from 'react';
import { Text, View, Button, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import * as Examples from './src/examples';
import { ExamplesList } from './src/shell/ExamplesList';
import { BackButton } from './src/shell/BackButton';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      example: null,
      examples: Object.keys(Examples)
        .map(key => ({
          id: key,
          title: Examples[key].title,
        })),
    }
  }

  selectExample = (example) => {
    this.setState({ example })
  }

  back = () => {
    this.selectExample(null);
  }

  render() {
    const Component = Examples[this.state.example];

    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.header}>
          { Component ? <BackButton onPress={this.back} /> : null }
          <Text style={styles.headerText}>{ Component ? Component.title : 'Examples' }</Text>
        </View>

        <View style={styles.container}>
          { Component ?
            <Component /> :
            <ExamplesList
              examples={this.state.examples}
              onPress={this.selectExample}
            />
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'silver',
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#dedede',
  },
  headerText: {
    fontSize: 20,
  },
});
