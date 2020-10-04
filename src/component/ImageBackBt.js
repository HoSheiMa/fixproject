import React from 'react';
import { TouchableHighlight, Image, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { create, PREDEF_RES } from 'react-native-pixel-perfect';

const perfectSize = create(PREDEF_RES.iphoneX.dp);

export default class BackButton extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} style={styles.btnContainer}>
        <FontAwesomeIcon icon={faArrowLeft} color={'black'} size={perfectSize(20)} />
      </TouchableHighlight>
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
      borderRadius: perfectSize(14),
      marginLeft: perfectSize(25),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },
  });