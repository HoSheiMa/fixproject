import React, { Component } from 'react';
import { StatusBar, SafeAreaView, View, StyleSheet } from 'react-native'

import RootNavigator from './src/navigations/RootNavigation';
const theme = {}
const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

export default class App extends Component {
    render() {
        return (
            <>
                {/* <MyStatusBar backgroundColor="#000000" barStyle="light-content" /> */}
                <StatusBar hidden={true} />
                <RootNavigator />
            </>
        );
    }
}


const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 50 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 0 : 30;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor:'#79B45D',
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
});
