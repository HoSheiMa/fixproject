//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// create a component
class Welcome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            CheckedList1: false,
            CheckedList2: false,
            CheckedList3: false,
            CheckedList4: false,
            CheckedList5: false,
            CheckedList6: false,
            CheckedList7: false,
            CheckedList8: false,
        };
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <LinearGradient colors={['#000000', '#0e0314', '#230633']} style={styles.linearGradient}>
                    <ScrollView style={{ width: "100%" }}>
                        <View style={{ width: "85%", marginLeft: '7.5%', marginTop: 15 }}>
                            <Text style={styles.WelText}>Welcome!</Text>
                            <Text style={styles.WelText1}>What brings you here today?</Text>
                            <Text style={styles.WelText1}>Choose one or more topics</Text>
                        </View>
                        <View style={styles.maincontent}>
                            <View style={styles.Listgroup}>
                                <TouchableOpacity style={this.state.CheckedList1 ? styles.checkedList : styles.List} onPress={() => { this.setState({ CheckedList1: !this.state.CheckedList1 }) }}>
                                    <ImageBackground source={require('../Images/List1.png')} resizeMode="stretch" style={{ width: 146, height: 86, justifyContent: 'center' }}>
                                        <Text style={this.state.CheckedList1 ? styles.imageTxt1 : styles.imageTxt}>Reduce{"\n"}Stres</Text>
                                    </ImageBackground>
                                </TouchableOpacity>

                                <TouchableOpacity style={this.state.CheckedList2 ? styles.checkedList : styles.List} onPress={() => { this.setState({ CheckedList2: !this.state.CheckedList2 }) }}>
                                    <ImageBackground source={require('../Images/List2.png')} resizeMode="stretch" style={{ width: 146, height: 86, justifyContent: 'center' }}>
                                        <Text style={this.state.CheckedList2 ? styles.imageTxt1 : styles.imageTxt}>Sleep{"\n"}Better</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.Listgroup}>
                                <TouchableOpacity style={this.state.CheckedList3 ? styles.checkedList : styles.List} onPress={() => { this.setState({ CheckedList3: !this.state.CheckedList3 }) }}>
                                    <ImageBackground source={require('../Images/List3.png')} resizeMode="stretch" style={{ width: 146, height: 86, justifyContent: 'center' }}>
                                        <Text style={this.state.CheckedList3 ? styles.imageTxt1 : styles.imageTxt}>Healing</Text>
                                    </ImageBackground>
                                </TouchableOpacity>

                                <TouchableOpacity style={this.state.CheckedList4 ? styles.checkedList : styles.List} onPress={() => { this.setState({ CheckedList4: !this.state.CheckedList4 }) }}>
                                    <ImageBackground source={require('../Images/List4.png')} resizeMode="stretch" style={{ width: 146, height: 86, justifyContent: 'center' }}>
                                        <Text style={this.state.CheckedList4 ? styles.imageTxt1 : styles.imageTxt}>Boost{"\n"}Mood</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.Listgroup}>
                                <TouchableOpacity style={this.state.CheckedList5 ? styles.checkedList : styles.List} onPress={() => { this.setState({ CheckedList5: !this.state.CheckedList5 }) }}>
                                    <ImageBackground source={require('../Images/List5.png')} resizeMode="stretch" style={{ width: 146, height: 86, justifyContent: 'center' }}>
                                        <Text style={this.state.CheckedList5 ? styles.imageTxt1 : styles.imageTxt}>Relaxation</Text>
                                    </ImageBackground>
                                </TouchableOpacity>

                                <TouchableOpacity style={this.state.CheckedList6 ? styles.checkedList : styles.List} onPress={() => { this.setState({ CheckedList6: !this.state.CheckedList6 }) }}>
                                    <ImageBackground source={require('../Images/List6.png')} resizeMode="stretch" style={{ width: 146, height: 86, justifyContent: 'center' }}>
                                        <Text style={this.state.CheckedList6 ? styles.imageTxt1 : styles.imageTxt}>Calm{"\n"}Anxiety</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View><View style={styles.Listgroup}>
                                <TouchableOpacity style={this.state.CheckedList7 ? styles.checkedList : styles.List} onPress={() => { this.setState({ CheckedList7: !this.state.CheckedList7 }) }}>
                                    <ImageBackground source={require('../Images/List7.png')} resizeMode="stretch" style={{ width: 146, height: 86, justifyContent: 'center' }}>
                                        <Text style={this.state.CheckedList7 ? styles.imageTxt1 : styles.imageTxt}>Control{"\n"}Emotions</Text>
                                    </ImageBackground>
                                </TouchableOpacity>

                                <TouchableOpacity style={this.state.CheckedList8 ? styles.checkedList : styles.List} onPress={() => { this.setState({ CheckedList8: !this.state.CheckedList8 }) }}>
                                    <ImageBackground source={require('../Images/List8.png')} resizeMode="stretch" style={{ width: 146, height: 86, justifyContent: 'center' }}>
                                        <Text style={this.state.CheckedList8 ? styles.imageTxt1 : styles.imageTxt}>Improve{"\n"}Focus</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.BtnArea}>
                            <TouchableOpacity style={styles.continBtn} onPress={() => this.props.navigation.navigate("SubscriptionScreen")}>
                                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Continue</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginTop: 30 }} onPress={() => this.props.navigation.navigate("SubscriptionScreen")}>
                                <Text style={styles.skipText}>Skip</Text>
                            </TouchableOpacity>
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
        width: 150,
        height: 90,
        borderWidth: 2,
        borderRadius: 27,
        borderColor: '#73219F',
        justifyContent: 'center',
        alignItems: 'center'
    },
    List: {
        width: 160,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Listgroup: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: '100%',
        marginTop: 20
    },
    maincontent: {
        alignItems: 'center',
        width: '90%',
        marginLeft: '5%',
        marginTop: 30
    },
    BtnArea: {
        alignItems: "center",
        justifyContent: "center"
    },
    continBtn: {
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#73219F',
        height: 46, width: '75%',
        borderRadius: 23
    },
    linearGradient: {
        height: '100%',
        width: '100%'
    },
    skipText: {
        color: '#73219F',
        fontWeight: 'bold',
        fontSize: 18
    },
    imageTxt: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    imageTxt1: {
        color: '#73219F',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

//make this component available to the app
export default Welcome;
