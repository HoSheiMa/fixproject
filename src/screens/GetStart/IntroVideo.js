// import React, { Component } from 'react';
// import { TouchableOpacity, View, Text, StyleSheet, Image, SafeAreaView, Dimensions } from 'react-native';
// import { Images, Constants, Fonts } from '@utils'
// import { create, PREDEF_RES } from 'react-native-pixel-perfect'
// import Video from 'react-native-video';
// import IntroLogo from '../../component/IntroLogo'
// import { Colors } from 'react-native/Libraries/NewAppScreen';

// const perfectSize = create(PREDEF_RES.iphoneX.dp)
// const { width, height } = Dimensions.get('window');

// export default class IntroVideo extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             size: { width, height },
//         };
//     }


//     goToLogin = () => this.props.navigation.navigate('SignIn');
//     goToCreate =()=> this.props.navigation.navigate('SignUp')

//     render() {
//         const { navigate } = this.props.navigation;
//         return (
//             <View style={styles.container}>
//                 {/* <Video
//                     source={require('../../../Intro.mp4')}
//                     rate={1.0}
//                     volume={1.0}
//                     muted={false}
//                     resizeMode={"cover"}
//                     repeat
//                     style={styles.video}
//                 /> */}

//                 <View style={styles.content}>
//                     <View style={styles.top_view}>
//                         <IntroLogo />
//                         <Text style={styles.appname_txt}>INNERWONDERS</Text>
//                     </View>
//                     <View style={styles.center_view}>
//                         <Text style={styles.tittle_txt}>JOIN MEDITATION CLASSES</Text>
//                         <Text style={styles.description_txt}>WITH WORLD-CLASS INSTRUCTIONS</Text>
//                         <Text style={styles.description_txt}>RIGHT HERE, RIGHT NOW</Text>
//                     </View>
//                     <View style={styles.bottom_view}>
//                         <TouchableOpacity style={styles.createBt} onPress={() => this.goToCreate()}>
//                             <Text style={styles.createBt_txt}>CREATE ACCOUNT</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.loginBt} onPress={() => this.goToLogin()}>
//                             <Text style={styles.loginBt_txt}>LOGIN</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//             </View>

//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//     },

//     video: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         bottom: 0,
//         right: 0,
//     },
//     content: {
//         flex: 1,
//         justifyContent: 'space-between',
//     },
//     top_view:{
//         alignItems: 'center',
//         paddingTop: perfectSize(30),        
//     },
//     appname_txt: {
//         marginTop: perfectSize(5),
//         fontFamily: Fonts.regular,
//         fontSize: Constants.small_font,
//         letterSpacing: 2,
//         color: 'white',
//     },
//     center_view:{
//         alignItems: 'center',
//         paddingHorizontal: perfectSize(20),
//     },
//     tittle_txt:{
//         marginBottom: perfectSize(10),
//         fontFamily: Fonts.bold,
//         fontSize: Constants.subtittle_font,
//         textAlign: 'center',
//         letterSpacing: 2,
//         color: 'white',
//     },
//     description_txt: {
//         marginTop: perfectSize(5),
//         fontFamily: Fonts.regular,
//         fontSize: Constants.normal_font,
//         textAlign: 'center',
//         letterSpacing: 2,
//         color: 'white',
//     },
//     bottom_view:{
//         alignItems: 'center',
//         paddingBottom: perfectSize(50),
//     },
//     createBt: {
//         marginBottom: perfectSize(30),
//         height: Constants.button_h * 1.1,
//         width: Constants.button_w * 0.9,
//         backgroundColor: 'white',
//         justifyContent: 'center',
//         alignItems: 'center',
//         // marginTop: perfectSize(150),
//         borderRadius: Constants.button_radius,
//     },
//     createBt_txt: {
//         fontFamily: Fonts.bold,
//         fontSize: Constants.normal_font,
//         letterSpacing: 1.5,
//         color: Colors.dark,
//     },
//     loginBt: {
//         marginBottom: perfectSize(30),
//         height: Constants.button_h * 1.1,
//         width: Constants.button_w * 0.9,
//         borderColor: 'white',
//         borderWidth: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: Constants.button_radius,
//     },
//     loginBt_txt: {
//         fontFamily: Fonts.bold,
//         fontSize: Constants.normal_font,
//         letterSpacing: 1.5,
//         color: 'white',
//     }
// })



import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showRealApp: false,
            //To show the main page of the app
        };
    }
    _renderNextButton = () => {
        return (
            // <View style={styles.buttonCircle}>
            //     <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>Get Started</Text>
            // </View>
            <View style={{ height: 0 }}></View>
        );
    };
    _renderDoneButton = () => {
        return (
            <View style={styles.buttonCircle1}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff', position: 'absolute', bottom: 10, }}>Existing User? Login</Text>
            </View>
        );
    };
    _onDone = () => {
        // this.setState({ showRealApp: true });
        this.props.navigation.navigate("SignUp");
    };
    _onSkip = () => {
        // this.setState({ showRealApp: true });
        this.props.navigation.navigate("SignUp");
    };
    _renderItem = ({ item }) => {
        return (
            <ImageBackground source={require('../../Images/Background1.png')} resizeMode='stretch' style={styles.Background}
            // style={{
            //   flex: 1,
            //   backgroundColor: item.backgroundColor,
            //   alignItems: 'center',
            //   justifyContent: 'space-around',
            //   paddingBottom: 100
            // }}
            >
                <View style={{ width: '90%', flex: 1 }}>
                    <Image style={styles.image} resizeMode="stretch" source={item.image} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Image style={{ width: 30, height: 30, borderRadius: 13.5 }} resizeMode="stretch" source={item.PreviousImage} />
                        <Text style={styles.title}>{item.title}</Text>
                        <Image style={{ width: 30, height: 30, borderRadius: 13.5 }} resizeMode="stretch" source={item.NextImage} />
                    </View>
                    <Text style={styles.text}>{item.text}</Text>
                    <View style={styles.buttonCircle}>
                        <TouchableOpacity style={{width:'200%', }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff', width:'100%' }}>Get Started</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    };
    render() {
        //If false show the Intro Slides
        if (this.state.showRealApp) {
            //Real Application
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 50,
                    }}>
                    <Text>
                        This will be your screen when you click Skip from any slide or Done
                        button at last
                    </Text>
                </View>
            );
        } else {
            //Intro slides
            return (
                <AppIntroSlider
                    data={slides}
                    renderItem={this._renderItem}
                    onDone={this._onDone}
                    onSkip={this._onSkip}
                    showSkipButton={true}
                    skipLabel="Existing User? Login"
                    renderDoneButton={this._renderDoneButton}
                    renderNextButton={this._renderNextButton}
                    bottomButton
                    dotStyle={{ backgroundColor: '#707070', }}
                />
            );
        }
    }
}
const styles = StyleSheet.create({
    image: {
        marginTop: 80,
        width: 324,
        height: 233,
    },
    Background: {
        width: '100%',
        height: '100%',
        alignItems: "center"
    },
    text: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
        paddingVertical: 16,
        lineHeight: 23,
        width: "95%"
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 16,
        marginTop: 10
    },
    buttonCircle: {
        marginLeft: "7.5%",
        width: "85%",
        height: 46,
        backgroundColor: '#73219F',
        borderRadius: 23,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        position: 'absolute',
        bottom: 100
    },
    buttonCircle1: {
        marginLeft: "7.5%",
        width: "85%",
        height: 46,
        borderRadius: 23,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50
    },
});

const slides = [
    {
        key: 's1',
        text: 'We use crystal singing bowls to create the sounds on eery meditation, Notes of the crystal bowls are tuned to specific frequencies found within the human body. This puts us in harmony with the sound wave',
        title: 'Crystal Singing Bowls',
        image: require('../../Images/Mask2.png'),
        backgroundColor: '#20d2bb',
        NextImage: require('../../Images/NextIcon.png'),
        PreviousImage: require('../../Images/Non_NextIcon.png')
    },
    {
        key: 's2',
        title: 'Guided Meditation',
        text: 'Let us guide you on this journey through your emotions on this sound experience. Listen to the meditation that resonate with your feelings and emotions on that day.',
        image: require('../../Images/Mask2.png'),
        backgroundColor: '#febe29',
        NextImage: require('../../Images/NextIcon.png'),
        PreviousImage: require('../../Images/PreviousIcon.png')
    },
    {
        key: 's3',
        title: 'Binaural Beats',
        text: 'The pure notes of the crystals can create binaural beats technology that take you to the theta or delta brain state to help get to a relaxing state faster.',
        image: require('../../Images/Mask2.png'),
        backgroundColor: '#22bcb5',
        NextImage: require('../../Images/Non_NextIcon.png'),
        PreviousImage: require('../../Images/PreviousIcon.png')
    }
];