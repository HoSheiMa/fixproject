import React, { Component } from 'react';
import { TouchableOpacity, View, Text, TextInput, ImageBackground, Image, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { Images, Colors, Constants, Fonts, Layoutsd } from '@utils'
import { create, PREDEF_RES } from 'react-native-pixel-perfect'
import LinearGradient from 'react-native-linear-gradient'
import BackButton from '../../component/SignUpBackBt';
// import CodeInput from 'react-native-code-input';

const perfectSize = create(PREDEF_RES.iphoneX.dp)

export default class ConfirmCodeScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: ``,
            headerTransparent: 'true',
            headerLeft: () => <BackButton onPress={() => { navigation.goBack(); }} />
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            num: '',
        };
    }

    Resend_code = () => {
        // this.props.navigation.navigate('ForgotPassword3');
    };

    NextPage = () => {
        this.props.navigation.navigate('ResetPasswordScreen');
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
                            <Text style={styles.tittle_txt}>Enter 6-digit</Text>
                            <Text style={styles.tittle_txt}>Recovery code</Text>
                        </View>
                        <View style={styles.bottom_view}>
                            <Text style={styles.description}>The recovery code was sent to the email capidertest@gmail.com.</Text>
                            <Text style={styles.description}>Please enter the code:</Text>
                            <View style={styles.input_group}>
                                <TextInput style={styles.txt_input}
                                    underlineColorAndroid="#43C311"
                                    placeholder=""
                                    placeholderTextColor="#898F97"
                                    autoCapitalize="none"
                                    numeric 
                                    keyboardType='numeric'
                                    onChangeText={(text) => this.setState({ num: text})}
                                />
 
                            </View>
                            <TouchableOpacity style={styles.resendBt} onPress={() => this.Resend_code()}>
                                <Text style={styles.resendBt_txt}>Resend recovery code</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.nextBt} onPress={() => this.NextPage()}>
                                <Text style={styles.nextBt_txt}>Next</Text>
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
    top_view: {
        justifyContent: 'center',
    },
    tittle_txt: {
        fontFamily: Fonts.bold,
        fontSize: Constants.subtittle_font,
    },
    bottom_view: {
        marginTop: perfectSize(10),
        marginBottom: perfectSize(10),
    },
    description: {
        marginTop: perfectSize(10),
        width: Constants.button_w,
        fontFamily: Fonts.semibold,
        fontSize: Constants.description_font,
        textAlign: 'justify',
        color: '#6D6D6D',
    },
    input_group: {
        // flexDirection: 'row',
        // alignSelf: 'center',
    },

    txt_input: {
        marginTop: perfectSize(10),
        width: Constants.input_w,
        fontSize: perfectSize(40),
    },
    resendBt: {
        marginTop: perfectSize(100),
        height: Constants.button_h,
        width: Constants.button_w,
        backgroundColor: Colors.red_bt,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Constants.button_radius,
    },
    resendBt_txt: {
        fontFamily: Fonts.bold,
        fontSize: Constants.normal_font,
        color: Colors.bt_txt,
        letterSpacing: 1.5,
    },
    nextBt: {
        marginTop: perfectSize(20),
        height: Constants.button_h,
        width: Constants.button_w,
        backgroundColor: Colors.blue_bt,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Constants.button_radius,
    },
    nextBt_txt: {
        fontFamily: Fonts.bold,
        fontSize: Constants.normal_font,
        color: Colors.bt_txt,
        letterSpacing: 1.5,
    },

})

