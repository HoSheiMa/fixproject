//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { create, PREDEF_RES } from 'react-native-pixel-perfect'
const perfectSize = create(PREDEF_RES.iphoneX.dp);
import LinearGradient from 'react-native-linear-gradient';

import { bool } from 'yup';

// create a component
class Subscription extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Checked: true,
            CheckedImageUrl: require('../Images/checkRadio.png'),
            UncheckedImageUrl: require('../Images/UncheckedRadio.png'),
            detscirptionTxt: [
                { id: 1, text: "Get unlimited access to our ourses" },
                { id: 2, text: "First meditation app with <Text style={{ fontStyle: 'italic' }}>crystal singing bowls" },
                { id: 3, text: "Unique Inner Wonders style meditations" },
                { id: 4, text: "Backed up by ongoing research and studies" },
                { id: 5, text: "Use binaural beat to take you deeper" },
            ]
        };
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <LinearGradient colors={['#000000', '#0e0314', '#230633']} style={styles.linearGradient}>
                    <ScrollView style={{ width: "100%" }}>
                        <View style={{ width: "90%", marginLeft: '5%', marginTop: 15 }}>
                            <TouchableOpacity style={styles.CloseBtn} onPress={() => { this.props.navigation.navigate("TabBar") }}>
                                <Icon name="close-a" color={'white'} size={15} />
                            </TouchableOpacity>
                            <Text style={styles.WelText}>Try INNERWONDERS for <Text style={{ fontStyle: 'italic' }}>free</Text></Text>
                        </View>
                        <View style={styles.maincontent}>
                            <View style={styles.Listgroup}>
                                <Image source={require('../Images/RabbitIcon.png')} resizeMode="stretch" style={{ width: 101, height: 156 }} />
                            </View>
                            <View style={{ alignSelf: "center" }}>
                                <View style={styles.IconArea}>
                                    <AntIcon name="check" color="#73219F" size={30} />
                                    <Text style={styles.ContentTxt}>Get unlimited access to our ourses</Text>
                                </View>
                                <View style={styles.IconArea}>
                                    <AntIcon name="check" color="#73219F" size={30} />
                                    <Text style={styles.ContentTxt}>First meditation app with <Text style={{ fontStyle: "italic" }}>crystal singing bowls</Text></Text>
                                </View>
                                <View style={styles.IconArea}>
                                    <AntIcon name="check" color="#73219F" size={30} />
                                    <Text style={styles.ContentTxt}>Unique Inner Wonders style meditations</Text>
                                </View>
                                <View style={styles.IconArea}>
                                    <AntIcon name="check" color="#73219F" size={30} />
                                    <Text style={styles.ContentTxt}>Backed up by ongoing research and studies</Text>
                                </View>
                                <View style={styles.IconArea}>
                                    <AntIcon name="check" color="#73219F" size={30} />
                                    <Text style={styles.ContentTxt}>Use binaural beat to take you deeper</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <TouchableOpacity style={this.state.Checked ? styles.PaymentBtn : styles.PaymentBtn1} onPress={() => { this.setState({ Checked: true }) }}>
                                <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                                    <Image source={this.state.Checked ? this.state.CheckedImageUrl : this.state.UncheckedImageUrl} resizeMode="stretch" style={{ width: 23, height: 23 }} />
                                    <Text style={styles.PriceTxt}>$59.99 Annual</Text>
                                </View>
                                <View style={{ marginRight: 15 }}>
                                    <Text style={styles.pieriodTxt}>Billed yearly</Text>
                                    <Text style={styles.costTxt}>$4.99/month</Text>
                                </View>
                                <Text style={styles.BestBtn}>BEST DEAL</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center', }}>
                            <TouchableOpacity style={this.state.Checked ? styles.PaymentBtn1 : styles.PaymentBtn} onPress={() => { this.setState({ Checked: false }) }}>
                                <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                                    <Image source={this.state.Checked ? this.state.UncheckedImageUrl : this.state.CheckedImageUrl} resizeMode="stretch" style={{ width: 23, height: 23 }} />
                                    <Text style={styles.PriceTxt}>$7.99 Monthly</Text>
                                </View>
                                <View style={{ marginRight: 15 }}>
                                    <Text style={styles.pieriodTxt}>Billed monthly</Text>
                                    <Text style={styles.costTxt}>1 week for free</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.BtnArea}>
                            <TouchableOpacity style={styles.continBtn} onPress={() => this.props.navigation.navigate("ApplePayScreen")}>
                                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Try free and subscribe</Text>
                            </TouchableOpacity>
                            <Text style={styles.bottomTxt}>No commitment  .  Cancel Anytime</Text>
                            <Text style={styles.bottomTxt}>Restore Subscription  .  Terms & Conditions</Text>
                        </View>
                    </ScrollView>
                </LinearGradient>
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
        fontSize: 22,
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
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: -10,
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
        fontSize: perfectSize(14),
        marginLeft: 5
    },
    IconArea: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'flex-start'
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
    linearGradient: {
        height: '100%',
        width: '100%'
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
export default Subscription;
