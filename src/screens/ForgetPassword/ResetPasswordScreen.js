import React, { Component } from 'react';
import { TouchableOpacity, View, Text, TextInput, ImageBackground, Image, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { Images, Colors, Constants, Fonts, Layoutsd } from '@utils'
import { create, PREDEF_RES } from 'react-native-pixel-perfect'
import LinearGradient from 'react-native-linear-gradient'
import BackButton from '../../component/SignUpBackBt';

const perfectSize = create(PREDEF_RES.iphoneX.dp)

export default class EmailInputScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: ``,
            headerTransparent: 'true',
            headerLeft: () => <BackButton onPress={() => { navigation.goBack(); }} />
        };
    };

    ResetPassword = () => {
        // this.props.navigation.navigate('ConfirmCodeScreen');
    };

    get gradient() {
        return (
            <LinearGradient
                colors={['#fffd', '#77fd']}
                startPoint={{ x: 1, y: 0 }}
                endPoint={{ x: 0, y: 1 }}
                style={styles.gradient}
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={Images.signup_background} style={styles.backgroundImage} >
                    {this.gradient}
                    <View style={styles.centerContainer}>
                        <View style={styles.top_view}>
                            <Text style={styles.tittle_txt}>Reset Password</Text>
                        </View>
                        <View style={styles.center_view}>
                            <TextInput style={styles.txt_input}
                                underlineColorAndroid="#11111155"
                                placeholder="New Password"
                                placeholderTextColor="#898F97"
                                autoCapitalize="none"
                                onChangeText={text => this.setstate({ email: text })}
                            />
                            <TextInput style={styles.txt_input}
                                underlineColorAndroid="#11111155"
                                placeholder="Comfirm New Password"
                                secureTextEntry
                                placeholderTextColor="#898F97"
                                autoCapitalize="none"
                                onChangeText={text => this.setstate({ password: text })}
                            />
                        </View>
                        <View style={styles.bottom_view}>
                            <TouchableOpacity style={styles.resetBt} onPress={() => this.ResetPassword()}>
                                <Text style={styles.resetBt_txt}>Reset</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        width: Constants.screen_w,
        height: Constants.screen_h,
        // resizeMode : 'cover',//'contain',//'stretch',
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    centerContainer: {
        alignSelf: 'center',
        width: Constants.forgot_w,
        height: Constants.forgot_h,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: Constants.forgot_radius,
        borderBottomRightRadius: Constants.forgot_radius,
        // shadowColor: 'black',
        // shadowOffset: { width: perfectSize(-20), height: perfectSize(20) },
        // shadowOpacity: 1,
        // shadowRadius: Constants.Spanel_redius,
        // elevation: 3,
    },
    tittle_txt: {
        fontFamily: Fonts.bold,
        fontSize: Constants.subtittle_font,
    },
    center_view: {
        marginTop: perfectSize(100),
        marginBottom: perfectSize(50),
        justifyContent: 'center',
        // backgroundColor: 'blue',
    },
    txt_input: {
        width: Constants.input_w,
        fontSize: Constants.normal_font,
        marginTop: perfectSize(10),
    },
    resetBt: {
        marginTop: perfectSize(100),
        height: Constants.button_h,
        width: Constants.button_w,
        backgroundColor: Colors.blue_bt,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Constants.button_radius,
    },
    resetBt_txt: {
        fontFamily: Fonts.bold,
        fontSize: Constants.normal_font,
        color: Colors.bt_txt,
        letterSpacing: 2,
    },

})

















// import React, { Component } from 'react';
// import { TextInput, TouchableOpacity, View, Text, ScrollView, ImageBackground, Image, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
// import { Images, Colors, Constants, Fonts, Layoutsd } from '@utils'
// import { create, PREDEF_RES } from 'react-native-pixel-perfect'

// const perfectSize = create(PREDEF_RES.iphoneX.dp)

// const { width, height } = Dimensions.get('window');
// const SCREEN_WIDTH = width < height ? width : height;
// const SCREEN_HEIGHT = width < height ? height : width;

// export default class ResetPasswordScreen extends Component {
//     static navigationOptions = ({ navigation }) => {
//         return {
//             title: ``,
//             headerTransparent: 'true',
//         };
//     };
//     constructor(props) {
//         super(props);
//         this.state = {
//             email: '',
//             password: '',
//         };
//     }

//     goToLogin = () => {
//         this.props.navigation.navigate('FirstPage');
//     };

//     goToSignUp = () => {
//         this.props.navigation.navigate('SignUpStepScreen');
//     };

//     goToForgotPassword = () => {
//         this.props.navigation.navigate('ForgotPassword');
//     };


//     render() {
//         const { navigate } = this.props.navigation;
//         return (
//             <SafeAreaView style={styles.container}>
//                 <View style={styles.top_view}>
//                     <Text style={styles.tittle_txt}>Reset Password</Text>
//                 </View>
//                 <View style={styles.center_view}>
//                     <TextInput style={styles.txt_input}
//                         underlineColorAndroid="#11111155"
//                         placeholder="New Password"
//                         placeholderTextColor="#898F97"
//                         autoCapitalize="none"
//                         onChangeText={text => this.setstate({ email: text })}
//                     />
//                     <TextInput style={styles.txt_input}
//                         underlineColorAndroid="#11111155"
//                         placeholder="Comfirm New Password"
//                         secureTextEntry
//                         placeholderTextColor="#898F97"
//                         autoCapitalize="none"
//                         onChangeText={text => this.setstate({ password: text })}
//                     />
//                 </View>
//                 <View style={styles.bottom_view}>
//                     <TouchableOpacity style={styles.loginBt} onPress={() => this.goToLogin()}>
//                         <Text style={styles.loginBt_txt}>Reset</Text>
//                     </TouchableOpacity>
//                 </View>
//             </SafeAreaView>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     top_view: {
//         justifyContent: 'center',
//         // backgroundColor: 'red',
//     },
//     tittle_txt: {
//         fontFamily: Fonts.bold,
//         fontSize: perfectSize(40),
//     },
//     center_view: {
//         marginTop: perfectSize(100),
//         marginBottom: perfectSize(100),
//         justifyContent: 'center',
//         // backgroundColor: 'blue',
//     },
//     txt_input: {
//         width: SCREEN_WIDTH - perfectSize(60),
//     },
//     bottom_view: {
//         justifyContent: 'center',
//         // backgroundColor:'yellow',
//     },
//     loginBt: {
//         height: perfectSize(60),
//         width: SCREEN_WIDTH - perfectSize(60),
//         backgroundColor: '#43C311',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: perfectSize(8),
//     },
//     loginBt_txt: {
//         fontFamily: Fonts.bold,
//         fontSize: perfectSize(20),
//         color: 'white',
//     },

// })
