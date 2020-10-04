import React, { Component } from 'react';
import { TouchableOpacity, View, Text, TextInput, ImageBackground, Image, Button, SafeAreaView, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import { Images, Colors, Constants, Fonts, Layoutsd } from '@utils'
import { create, PREDEF_RES } from 'react-native-pixel-perfect'
import LinearGradient from 'react-native-linear-gradient'
import BackButton from '../../component/SignUpBackBt';
import Firebase from '../../../config/Firebase';
import { faAngleLeft, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Icon from 'react-native-vector-icons/Fontisto'
import Modal from 'react-native-modal';

const perfectSize = create(PREDEF_RES.iphoneX.dp)

export default class EmailInputScreen extends Component {
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
            reset_email: '',
            isModalVisible: false,
        };
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    send_email = () => {
        // this.props.navigation.navigate('ConfirmCodeScreen');
        const self = this;
        console.log(self.state.reset_email);
        Firebase.auth().sendPasswordResetEmail(self.state.reset_email)
            .then(function (user) {
                self.setState({ isModalVisible: !self.state.isModalVisible });
                // alert(self.state.isModalVisible)
            }).catch(function (e) {
                console.log(e)
            })
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
                <ImageBackground source={require('../../Images/Background1.png')} resizeMode='stretch' style={styles.Background} >
                    {/* {this.gradient} */}
                    <View style={styles.centerContainer}>
                        <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 10, marginLeft: -25 }}>
                            <TouchableHighlight onPress={() => this.props.navigation.goBack()} style={styles.btnContainer}>
                                <FontAwesomeIcon icon={faAngleLeft} color={'white'} size={perfectSize(35)} />
                            </TouchableHighlight>
                            <Text style={{ color: '#fff', fontSize: 25, marginLeft: 20 }}>INNERWONDOERS</Text>
                        </View>
                        <View style={{ alignItems: 'center', alignSelf: 'center', width: '100%', marginTop: 30 }}>
                            <Text style={styles.tittle_txt}>Forgot Password</Text>
                            <Text style={styles.description}>Don't worry, it happens to the best of us</Text>
                            <Text style={styles.description1}>We will send you a link to securely reset your password.</Text>
                            <TextInput style={styles.txt_input}
                                underlineColorAndroid="#707070"
                                placeholder="Email"
                                placeholderTextColor="#898F97"
                                autoCapitalize="none"
                                value={this.state.reset_email}
                                onChangeText={text => this.setState({ reset_email: text })}
                            />
                            <TouchableOpacity style={styles.nextBt} onPress={() => this.send_email()}>
                                <Text style={styles.nextBt_txt}>Email Recovery Link</Text>
                            </TouchableOpacity>
                        </View>
                        <Modal isVisible={this.state.isModalVisible}>
                            <View style={styles.modalView}>
                                <TouchableOpacity style={styles.CloseBtn} onPress={this.toggleModal}>
                                    <Icon name="close-a" color={'white'} size={15} />
                                </TouchableOpacity>
                                <Text style={styles.ModalTitle}>We got you!</Text>
                                <Text style={styles.ModalText}>If this email account is in your system, you should have received  a recovery link for your password.</Text>
                                <TouchableOpacity style={styles.OkayBtn} onPress={this.toggleModal} >
                                    <Text style={styles.BtnText}>Okay</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
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
        // alignItems: 'center',
        // justifyContent: 'center',
        borderBottomLeftRadius: Constants.forgot_radius,
        borderBottomRightRadius: Constants.forgot_radius,
        // shadowColor: 'black',
        // shadowOffset: { width: perfectSize(-20), height: perfectSize(20) },
        // shadowOpacity: 1,
        // shadowRadius: Constants.Spanel_redius,
        // elevation: 3,
    },

    tittle_txt: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white'
    },

    Background: {
        width: '100%',
        height: '100%',
        // alignItems: "center"
    },

    description: {
        marginTop: perfectSize(30),
        fontSize: 15,
        textAlign: 'center',
        color: '#fff',
    },
    description1: {
        marginTop: perfectSize(30),
        fontSize: 15,
        textAlign: 'center',
        color: '#fff',
    },
    txt_input: {
        width: "100%",
        marginTop: perfectSize(10),
        borderColor: '#fff',
        marginTop: 50,
        fontSize: 16,
        color: '#73219F'
    },
    nextBt: {
        marginTop: perfectSize(80),
        height: 46,
        width: Constants.button_w,
        backgroundColor: "#73219F",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 23,
    },
    nextBt_txt: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.bt_txt,
        letterSpacing: 2,
    },
    btnContainer: {
        width: perfectSize(27),
        height: perfectSize(27),
        alignItems: 'center',
        margin: perfectSize(25),
    },
    modalView: {
        width: "80%",
        marginLeft: '10%',
        height: 255,
        alignItems: "center",
        backgroundColor: '#1F062C',
        borderRadius: 10,

    },
    OkayBtn: {
        backgroundColor: '#73219F',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        height: 46,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    CloseBtn: {
        marginRight: '-80%',
        marginTop: 15,
        width: 30,
        height: 30,
        backgroundColor: '#707070',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    ModalTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15
    },
    ModalText:{ 
        color: 'white', 
        width: '90%', 
        textAlign: 'center', 
        marginTop: 20, 
        lineHeight: 25 
    }

})

