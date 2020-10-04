import React from 'react';
import { RefreshControl, View, Text, Image, ScrollView, TouchableOpacity, TouchableHighlight, ImageBackground, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faBook, faVideo } from '@fortawesome/free-solid-svg-icons';
import Firebase from '../../../../config/Firebase';
import { Images, Colors, Constants, Fonts, Layoutsd } from '@utils'
import Logo from '../../../component/Logo'
import TrialButton from '../../../component/TrialButton'
import Loader from "react-native-modal-loader";
import { create, PREDEF_RES } from 'react-native-pixel-perfect';
import LinearGradient from 'react-native-linear-gradient';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';


const perfectSize = create(PREDEF_RES.iphoneX.dp);

class CoursesCategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search_text: '',
            // Category List
            categoriesList: [],
            disp_List: [],
            refreshing: false,
            isLoading: false,
        };
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.load_categories();
    }

    showLoader = () => {
        this.setState({ isLoading: true });
    };

    load_categories = () => {
        const self = this;
        const ref = Firebase.database().ref('categories/');
        ref.on('value', function (snapshot) {
            let categories = [];
            snapshot.forEach(function (childSnapshot) {
                if (childSnapshot.val().status) {
                    categories.push({
                        key: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                }
            });
            self.setState({
                categoriesList: categories.reverse(),
                disp_List: categories,
                refreshing: false,
                isLoading: false
            });
        });
    }

    componentDidMount() {
        this.showLoader();
        this.load_categories();
    }

    componentWillUnmount() {
        // this.categoriesRef.off();
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <LinearGradient colors={['#000000', '#0e0314', '#230633']} style={styles.linearGradient}>
                    <LinearGradient colors={['#000000', '#561E98']} style={styles.linearGradient}>
                        <View style={styles.HeaderArea}>
                            <TouchableHighlight onPress={() => this.props.navigation.navigate("CoursesCategoryList")} style={styles.btnContainer}>
                                <AntDesignIcon name="close" color="gray" size={perfectSize(15)} />
                            </TouchableHighlight>
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>HOW WAS YOUR MEDITATION?</Text>
                        </View>
                    </LinearGradient>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                            <Image source={require('../../../Images/FaceIcon1.png')} resizeMode="stretch" style={styles.FaceIcon} />
                            <Image source={require('../../../Images/FaceIcon2.png')} resizeMode="stretch" style={styles.FaceIcon} />
                            <Image source={require('../../../Images/FaceIcon3.png')} resizeMode="stretch" style={styles.FaceIcon} />
                        </View>
                        <LinearGradient colors={['#10061e', '#000000']} style={styles.linearGradient1}>
                            <View style={styles.HeaderArea}>
                                <Text style={styles.TitleText}>Milestones</Text>
                            </View>
                            <Image source={require("../../../Images/Monkey.png")} resizeMode="stretch" style={styles.MonkeyImage} />
                        </LinearGradient>
                        <LinearGradient colors={['#10061e', '#000000']} style={styles.linearGradient2}>
                            <View style={styles.HeaderArea}>
                                <Text style={styles.TitleText}>Progress</Text>
                            </View>
                            <View style={styles.processItem}>
                                <View style={styles.processArea}>
                                    <Text style={styles.processTxt}>0</Text>
                                    <Text style={styles.processTxt}>Current</Text>
                                    <Text style={styles.processTxt}>Day Streak</Text>
                                </View>
                                <View style={styles.processArea}>
                                    <Text style={styles.processTxt1}>3</Text>
                                    <Text style={styles.processTxt1}>Total</Text>
                                    <Text style={styles.processTxt1}>Sessions</Text>
                                </View>
                                <View style={styles.processArea}>
                                    <Text style={styles.processTxt2}>32</Text>
                                    <Text style={styles.processTxt2}>Total</Text>
                                    <Text style={styles.processTxt2}>Minutes</Text>
                                </View>
                            </View>
                        </LinearGradient>
                        <LinearGradient colors={['#110620', '#0d0314']} style={styles.linearGradient3}>
                            <View style={styles.HeaderArea}>
                                <Text style={styles.TitleText1}>Schedule next meditation</Text>
                            </View>
                            <TouchableOpacity style={styles.SetButton} onPress={() => { this.props.navigation.navigate("Player1") }}>
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: '#ffffff' }}>Set reminder</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        <LinearGradient colors={['#170629', '#160420']} style={styles.linearGradient4}>
                            <View style={styles.HeaderArea}>
                                <Text style={styles.TitleText1}>Listen to a <Text style={{ fontStyle: 'italic' }}>Victory Message</Text></Text>
                            </View>
                            <TouchableOpacity style={styles.SetButton} onPress={() => { this.props.navigation.navigate("Player1") }}>
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: '#ffffff' }}>Play</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </ScrollView>
                </LinearGradient>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        email: state.user.email,
        username: state.user.username,
        paid: state.user.paidState
    }
}
export default connect(mapStateToProps)(CoursesCategoryList)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#230633',
    },
    topContainer: {
        flexDirection: 'column',
        paddingVertical: perfectSize(10),
    },
    subtittleText: {
        fontFamily: Fonts.extrabold,
        fontSize: Constants.subtittle_font,
        color: Colors.basic,
        marginLeft: perfectSize(20),
    },

    searchcontainer: {
        alignItems: 'center',
        flexDirection: 'row',
        height: Constants.search_h,
        width: Constants.search_w,
        borderWidth: 1,
        borderColor: Colors.gray,
        borderTopRightRadius: Constants.search_h / 2,
        borderBottomRightRadius: Constants.search_h / 2,
        marginTop: perfectSize(5),
    },
    searchinput: {
        width: Constants.search_w - perfectSize(40),
        height: Constants.search_h,
        fontSize: Constants.normal_font,
        textAlign: 'center',
    },

    cardContainer: {
        marginTop: perfectSize(30),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: Constants.category_w + Constants.category_border,
        height: 111,
        borderRadius: 20,
        backgroundColor: Colors.courses_tab,
    },
    cardPhoto: {
        resizeMode: 'cover',
        width: Constants.category_w,
        height: 111,
        borderRadius: 20,
        opacity: 1
    },
    cardTextContainer: {
        width: Constants.category_w,
        height: Constants.category_h,
        position: 'absolute',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    linearGradient: {
        height: '100%',
        width: '100%'
    },
    courses_view: {
        marginTop: perfectSize(20),
        marginLeft: perfectSize(10),
        paddingVertical: perfectSize(2),
        paddingHorizontal: perfectSize(5),
        alignSelf: 'flex-end',
        flexDirection: 'row',
        backgroundColor: Colors.category_text_backcolor,
        alignItems: 'center',
        borderRadius: Constants.category_radius * 0.3,
        borderBottomRightRadius: 0,
    },
    cardcourses: {
        marginLeft: perfectSize(5),
        fontFamily: Fonts.extrabolditalic,
        fontSize: Constants.normal_font,
        color: Colors.fontcolors.white,
    },
    card_title_view: {
        paddingHorizontal: perfectSize(15),
        paddingVertical: perfectSize(5),
        // alignSelf: 'center',
        borderRadius: Constants.category_radius * 0.4,
        marginTop: -90
    },
    card_title: {
        fontFamily: Fonts.black,
        fontSize: 18,
        fontWeight: 'bold',
        color: "white",
        marginLeft: 10
    },
    card_description_view: {
        paddingHorizontal: perfectSize(20),
        paddingVertical: perfectSize(5),
        alignSelf: 'center',
        marginTop: perfectSize(5),
        marginBottom: perfectSize(20),
        backgroundColor: Colors.category_text_backcolor,
        borderRadius: Constants.category_radius * 0.3,
        borderBottomRightRadius: 0,
    },
    card_description: {
        fontFamily: Fonts.semibold,
        textAlign: 'center',
        fontSize: Constants.normal_font,
        color: Colors.fontcolors.white,
    },
    Background: {
        width: '100%',
        height: '100%',
        // alignItems: "center"
    },
    HeaderArea: {
        flexDirection: 'row',
        alignItems: "center",
        height: 49,
        justifyContent: "center",
    },
    linearGradient: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    btnContainer: {
        width: perfectSize(27),
        height: perfectSize(27),
        alignItems: 'center',
        position: "absolute",
        right: perfectSize(15),
        backgroundColor: "#707070",
        borderRadius: 13.5,
        justifyContent: "center",
        alignItems: "center"
    },
    FaceIcon: {
        width: 42,
        height: 42,
        borderRadius: 21,
        marginHorizontal: 10
    },
    linearGradient1: {
        height: 193,
        marginTop: 20
    },
    linearGradient2: {
        height: 148,
    },
    linearGradient3: {
        height: 120,
    },
    linearGradient4: {
        height: 185,
    },
    MonkeyImage: {
        width: 132,
        height: 132,
        borderRadius: 66,
        alignSelf: 'center',
        marginTop: -10
    },
    TitleText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        position: 'absolute',
        left: 40
    },
    TitleText1: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    processItem: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    processTxt: {
        color: '#73219F',
        fontSize: 16,
    },
    processTxt1: {
        color: '#444BFD',
        fontSize: 16,
    },
    processTxt2: {
        color: '#CB36D8',
        fontSize: 16,
    },
    processArea: {
        alignItems: 'center',
        marginHorizontal: 15
    },
    SetButton: {
        width: 141,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#73219F',
        alignSelf: 'center',
        marginTop: 10
    }

});

