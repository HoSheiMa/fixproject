import React from 'react';
import { TouchableHighlight, StyleSheet, Image, Text, View,SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { create, PREDEF_RES } from 'react-native-pixel-perfect';
const perfectSize = create(PREDEF_RES.iphoneX.dp);

export default class BackButton extends React.Component {
  render() {
    return (
      <SafeAreaView style={{flexDirection:'row', justifyContent:"center", alignItems:'center'}}>
        <TouchableHighlight onPress={this.props.onPress} style={styles.btnContainer}>
          <FontAwesomeIcon icon={faAngleLeft} color={'white'} size={perfectSize(35)} />
        </TouchableHighlight>
        <Text style={{color:'#fff',fontSize:25, marginLeft:20}}>INNERWONDOERS</Text>
      </SafeAreaView>
    );
  }
}

BackButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string
};

const styles = StyleSheet.create({
  btnContainer: {
    width: perfectSize(27),
    height: perfectSize(27),
    alignItems: 'center',
    margin: perfectSize(25),
  },
});