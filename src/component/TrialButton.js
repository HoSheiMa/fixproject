import React from 'react';
import { TouchableHighlight, Image, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Images, Colors, Constants, Fonts, Layoutsd } from '@utils'
import { create, PREDEF_RES } from 'react-native-pixel-perfect';

const perfectSize = create(PREDEF_RES.iphoneX.dp);

export default class TrialButton extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.descriptionText}>Unleash your inner wonders</Text>
        <TouchableHighlight onPress={this.props.onPress} style={styles.button}>
          {/* <Image source={require('../../../assets/icons/backArrow.png')} style={styles.btnIcon} /> */}
          <Text style={styles.buttonTxt}>Try For Free</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

TrialButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: perfectSize(10),
  },
  descriptionText: {
    fontFamily: Fonts.semibolditalic,
    fontSize: Constants.normal_font,
    letterSpacing: 2.5,
    color: Colors.trial_part,
  },
  button: {
    width: Constants.button_w,
    height: Constants.button_h,
    marginTop: perfectSize(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.trial_part,
    borderWidth: 1,
    borderRadius: Constants.button_radius,
  },
  buttonTxt: {
    fontFamily: Fonts.bolditalic,
    fontSize: Constants.normal_font,
    color: Colors.trial_part,
  },
});