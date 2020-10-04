//import liraries
import React, { Component, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { bool } from 'yup';
// create a component
class ApplePay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Checked: true,
            CheckedImageUrl: require('../Images/checkRadio.png'),
            UncheckedImageUrl: require('../Images/UncheckedRadio.png')
        };
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground source={require('../Images/Background1.png')} resizeMode='stretch' style={styles.Background} >
                    <View style={{ height: 100, borderRightWidth: 8, borderRightColor: 'white', justifyContent: 'center', padding: 8, marginTop: 150, alignItems: 'flex-end' }}>
                        <TouchableOpacity style={{alignItems: 'flex-end'}} onPress={()=>{this.props.navigation.navigate("TabBar")}}>
                            <Text style={{ color: 'white', fontSize: 16 }}>Double Click</Text>
                            <Text style={{ color: 'white', fontSize: 16 }}>to Pay</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ position: 'absolute', bottom: 0, width: "100%", paddingTop: 20, alignItems: "center", backgroundColor: '#1B1B1D' }}>
                        <View style={{ flexDirection: 'row', alignItems: "center", width: "100%", justifyContent: 'space-between', paddingHorizontal: 20 }}>
                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <FontAwesomeIcon name="apple" size={20} color="white" />
                                <Text style={{ color: 'white', fontSize: 22 }}>Pay</Text>
                            </View>
                            <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                                <Text style={{ color: '#0A84FF', fontSize: 17 }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: "5%", marginTop: 20, paddingBottom: 10, borderBottomWidth: 0.3, borderColor: '#A4A4A6', width: '95%' }}>
                            <Image source={require('../Images/PayColorIcon.png')} resizeMode="stretch" style={{ width: 40, height: 26 }} />
                            <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                                <Text style={{ fontSize: 12, color: 'white' }}>INNER WONDERS APP</Text>
                                <Text style={{ fontSize: 12, color: 'white' }}>INNER WONDERS APP SUBSCRIPTION</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: "5%", marginTop: 20, paddingBottom: 15, borderBottomWidth: 0.3, borderColor: '#A4A4A6', width: '95%' }}>
                            <View style={{ width: '20%' }}>
                                <Text style={{ color: "#707070", fontSize: 12, position: "absolute", right: 0 }}>POLICY</Text>
                            </View>
                            <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                                <Text style={{ fontSize: 12, color: 'white' }}>Automatically renews until cancelled.</Text>
                                <Text style={{ fontSize: 12, color: 'white' }}>To stop, tap Cancel Subscription in</Text>
                                <Text style={{ fontSize: 12, color: 'white' }}>Settings before next billing date.</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: "5%", marginTop: 20, paddingBottom: 15, borderBottomWidth: 0.3, borderColor: '#A4A4A6', width: '95%' }}>
                            <View style={{ width: '20%' }}>
                                <Text style={{ color: "#707070", fontSize: 12, position: "absolute", right: 0 }}>Account</Text>
                            </View>
                            <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                                <Text style={{ fontSize: 12, color: 'white' }}>Maryjane@apple.com</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: "5%", marginTop: 20, paddingBottom: 15, borderBottomWidth: 0.3, borderColor: '#A4A4A6', width: '95%' }}>
                            <View style={{ width: '20%' }}>
                                <Text style={{ color: "#707070", fontSize: 12, position: "absolute", right: 0 }}>POLICY</Text>
                            </View>
                            <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                                <Text style={{ fontSize: 12, color: 'white' }}>One year subscirption.</Text>
                                <Text style={{ fontSize: 12, color: 'white' }}>$59.99/year starting Apr 25, 2020.</Text>
                            </View>
                        </View>
                        <Image source={require('../Images/PayIcon.png')} resizeMode="stretch" style={{ width: 42, height: 42, marginTop: 50 }} />
                        <Text style={{ color: 'white', fontSize: 14, marginTop: 5, marginBottom: 20 }}>Confirm with Side Button</Text>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Background: {
        width: '100%',
        height: '100%',
        // alignItems: "center"
    },
    WelText: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20
    },
    WelText1: {
        color: '#8B8B8B',
        fontSize: 20,
        lineHeight: 25
    },
    checkedList: {
        width: 141,
        height: 85,
        borderWidth: 3,
        borderRadius: 24,
        borderColor: '#73219F',
        justifyContent: 'center',
        alignItems: 'center'
    },
    List: {
        width: 139,
        height: 83,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Listgroup: {
        flexDirection: 'row',
        justifyContent: "space-around",
        width: '100%',
        marginTop: 20,
        marginBottom: 20
    },
    maincontent: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
        marginLeft: '2.5%',
        marginTop: -10
    },
    BtnArea: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 50
    },
    continBtn: {
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#73219F',
        height: 46, width: '75%',
        borderRadius: 23
    },
    skipText: {
        color: '#73219F',
        fontWeight: 'bold',
        fontSize: 18
    },
    CloseBtn: {
        marginLeft: '90%',
        marginBottom: 10,
        marginTop: 15,
        width: 30,
        height: 30,
        backgroundColor: '#707070',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    ContentTxt: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10
    },
    IconArea: {
        flexDirection: 'row',
        alignItems: "center",
        width: '100%',
    },
    PaymentBtn: {
        width: '95%',
        height: 56,
        backgroundColor: '#191218',
        borderRadius: 28,
        alignItems: "center",
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: '3%',
        marginTop: 25,
        borderWidth: 1,
        borderColor: '#B154A2'
    },
    PaymentBtn1: {
        width: '95%',
        height: 56,
        backgroundColor: '#191218',
        borderRadius: 28,
        alignItems: "center",
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: '3%',
        marginTop: 25
    },
    PriceTxt: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10
    },
    pieriodTxt: {
        fontSize: 13,
        color: 'white',
        marginRight: 5
    },
    costTxt: {
        color: 'white',
        fontSize: 12,
        marginLeft: 5,
        marginTop: 5
    },
    BestBtn: {
        color: 'white',
        position: 'absolute',
        top: -10,
        backgroundColor: '#B154A2',
        right: 0,
        borderRadius: 8.5,
        height: 17,
        width: 64,
        textAlign: 'center',
        fontSize: 10,
        fontWeight: 'bold'
    },
    bottomTxt: {
        color: 'white',
        fontSize: 12,
        marginTop: 20,
    }
});

//make this component available to the app
export default ApplePay;
