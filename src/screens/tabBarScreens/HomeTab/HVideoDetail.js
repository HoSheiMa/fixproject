import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
// import { Button } from 'react-native-elements'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faSearch, faThumbsUp, faThumbsDown, faAngleDown, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import Modal, { ModalContent, SlideAnimation, ScaleAnimation, ModalTitle, ModalFooter, ModalButton } from 'react-native-modals';

import VideoPlayer from '../../../component/VideoPlayer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { experiences, users } from '../../../data/DataArrays';
// import { categories } from '../../../data/DataArrays';
import { connect } from 'react-redux';
import BackButton from '../../../component/ImageBackBt';
import Firebase from '../../../../config/Firebase';
import { VIDEO_SEL } from '../../../store/actions/user.actions';
import { Images, Colors, Constants, Fonts, Layoutsd } from '@utils'
import Stars from 'react-native-stars';
import Orientation from 'react-native-orientation-locker';
import { create, PREDEF_RES } from 'react-native-pixel-perfect'

const perfectSize = create(PREDEF_RES.iphoneX.dp)

class HVideoDetail extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Video Detail Page`,
            // headerTransparent: 'true',
            headerLeft: () => <BackButton onPress={() => { navigation.goBack(); }} />
        };
    };
    constructor(props) {
        super(props);
        this.state = {
        }

    }

    componentDidMount = () => {

    }


    formatTime = (time) => {
        time = ~~(time);
        // console.log('time=', time);
        const second = time % 60;
        const minute = Math.floor(time / 60) % 60;
        const hour = Math.floor(time / 3600);
        return this.formatTimeString(hour) + ':' + this.formatTimeString(minute) + ':' + this.formatTimeString(second);
    }

    formatTimeString = (num) => {
        return ('00' + String(num)).slice(-2);
    }

    render() {
        const { formatTime } = this;
        const { v_info } = this.props.navigation.state.params
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.txt_container}>
                        <Text style={styles.videotittle}>{v_info.name}</Text>
                        <Text style={styles.description_txt} >Video Description</Text>
                        <Text style={styles.content_txt}>{v_info.description}</Text>
                        <Text style={styles.description_txt} >Video duration Time</Text>
                        <Text style={styles.content_txt}>{formatTime(v_info.duration)}</Text>
                        <Text style={styles.description_txt} >Video File Size</Text>
                        <Text style={styles.content_txt}>{~~(v_info.videoSize/1024)} Kbyte</Text>
                        <Text style={styles.description_txt} >Video Play </Text>
                        <Text style={styles.content_txt}>{v_info.playCount}</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        paid: state.user.paidState,
        userkey: state.user.userkey,
        v_key1: state.user.v_key1,
        v_key2: state.user.v_key2,
    }
};

function mapDispatchToProps(dispatch) {
    return {
        video_select: (keys) => {
            dispatch({
                type: VIDEO_SEL,
                v_key1: keys.v_key1,
                v_key2: keys.v_key2,
            });
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HVideoDetail);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.home_tab_background,
    },
    txt_container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: perfectSize(30),
    },
    videotittle: {
        fontFamily: Fonts.black,
        fontSize: Constants.subtittle_font,
        color: Colors.fontcolors.strong,
        textAlign: 'center',
    },
    description_txt: {
        marginVertical: perfectSize(20),
        alignSelf: 'flex-start',
        fontFamily: Fonts.bold,
        fontSize: Constants.description_font,
        color: Colors.fontcolors.strong,
        textAlign: 'center',
    },
    content_txt: {
        alignSelf: 'flex-start',
        fontFamily: Fonts.bold,
        fontSize: Constants.normal_font,
        color: Colors.fontcolors.strong,
        textAlign: 'justify',
    }
});

