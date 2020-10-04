
import React from 'react';
import { TouchableHighlight, StyleSheet, Image, Text, View } from 'react-native';
import { Images, Colors, Constants, Fonts, Layoutsd } from '@utils'

export default class IntroLogo extends React.Component {
    render() {
        return (
            <View style={styles.logo_container}>
                <Image source={Images.logo_white} style={styles.logoImage} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logo_container:{
        // backgroundColor:'red',
    },
    logoImage: {
        alignSelf: 'center',
        width: Constants.intro_logo_w,
        height: Constants.intro_logo_w,
        resizeMode : 'contain',//'stretch',
      },
});