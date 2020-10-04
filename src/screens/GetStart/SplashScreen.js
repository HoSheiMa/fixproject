import React, { Component } from 'react';
import { TouchableOpacity, View, Text, ScrollView, ImageBackground, Image, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { Images, Colors, Constants, Fonts, Layoutsd } from '@utils'

export default class GetStart extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('App')
        }, 3000)
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground source={require('../../Images/splash.png')} resizeMode='stretch' style={styles.Background}>
                    {/* <View style={styles.top_part}>
                        <Image source={Images.cat_logo} style={styles.logoImage} />
                    </View> */}
                    <View style={styles.bottom_part}>
                        <Text style={styles.txt}>INNERWONDERS</Text>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    Background:{
        width:'100%',
        height:'100%',
        alignItems:"center"
    },
    top_part: {
        flex: 7,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',
    },
    logoImage: {
        alignSelf: 'center',
        width: Constants.logo_w,
        resizeMode: 'contain',//'stretch',
    },
    bottom_part: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt: {
        fontSize: Constants.description_font,
        fontFamily: Fonts.semibold,
        letterSpacing: 1.5,
        fontSize:35,
        color: '#FFF',

    }

})

