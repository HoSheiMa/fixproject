import React, { Component } from 'react';
import { View, Text, FlatList, Image, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { connect } from 'react-redux';
import { COURSE_SEL } from '../../../store/actions/user.actions';
// import { categories } from '../../../data/DataArrays';
import BackButton from '../../../component/ImageBackBt';
import Firebase from '../../../../config/Firebase';
import { Images, Colors, Constants, Fonts, Layoutsd } from '@utils'
import PlayButton from '../../../component/PlayButton'
import LinearGradient from 'react-native-linear-gradient';
import { create, PREDEF_RES } from 'react-native-pixel-perfect'

const perfectSize = create(PREDEF_RES.iphoneX.dp)

class HomeCoursesDetail extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: ``,
            headerTransparent: 'true',
            tabBarVisible: 'true',
            headerLeft: () => <BackButton onPress={() => { navigation.goBack(); }} />
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            ca_id: 0,
            co_id: 0,
            page_tittle: '',
            top_image_url: '',
            page_description: '',
            sel_video_id: 0,
            sel_video_title: '',
            sel_video_url: '',
            sel_video_description: '',
            sel_video_time: '',
            videosList: [],
            disp_list: [],
            search_text: '',
        }
        this._rendermakesession = this._rendermakesession.bind(this);
        this.videoRef = null
    }

    get_course_videos = () => {
        const self = this;
        const ca_id = this.props.navigation.state.params.categoryId;
        const co_id = this.props.navigation.state.params.courseId;
        let title = '';
        let image_url = '';
        let description = '';

        Firebase.database().ref('categories/' + ca_id + '/cources/' + co_id).once('value', function (snapshot) {
            title = snapshot.val().name;
            image_url = snapshot.val().thumbnailUrl;
            description = snapshot.val().description;
        });

        this.videoRef = Firebase.database().ref('videos/');
        this.videoRef.on('value', function (snapshot) {
            let videos = [];
            snapshot.forEach(function (childSnapshot) {
                if (childSnapshot.val().courceKey == co_id) {
                    videos.push({
                        key: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                }

            });
            self.setState({
                videosList: videos.reverse(),
                disp_list: videos,
                page_tittle: title,
                top_image_url: image_url,
                page_description: description,
                id: ca_id,
                ca_id: ca_id,
                co_id: co_id,
                sel_video_id: videos[0].key,
                sel_video_url: videos[0].thumbnail,
                sel_video_title: videos[0].name,
                sel_video_time: '4 min left', //categories[caId].courses[coId].videos[0].time,
                sel_video_description: videos[0].description,
            });
        });
    }
    componentDidMount() {
        this.get_course_videos();
    }
    _rendermakesession({ item, index }) {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.sessioncontainer} >
                <TouchableOpacity onPress={() => { navigate('HomeVideoDetail', { videoId: item.key }) }}>
                    <Image source={{ uri: item.thumbnail }} style={styles.sessionimage} />
                    <View style={styles.play_img_view}>
                        <PlayButton />
                    </View>
                </TouchableOpacity>
                <View style={styles.sessiontextarea}>
                    <Text style={styles.sessiontittle}>{this.formatTextEclips(item.name, 20)}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faClock} color={'#898F97'} size={10} />
                        <Text style={styles.sessiontime}>{this.formatTime(item.duration)}</Text>
                    </View>
                    <Text style={styles.sessiondescription}>{this.formatTextEclips(item.description, 100)}</Text>
                </View>
            </View>
        );
    }
    makeSessions() {
        return (
            <FlatList
                vertical
                showsVerticalScrollIndicator={false}
                numColumns={1}
                data={this.state.disp_list}
                renderItem={this._rendermakesession}
                keyExtractor={item => `${item.id}`}
            />
        );
    }

    formatTextEclips = (text, length = 20) => {
        return text.length > length ? text.slice(0, length) + '...' : text;
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


    filterSearch(text) {
        //passing the inserted text in textinput
        const newData = this.state.videosList.filter(function (item) {
            //applying filter for the inserted text in search bar
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            disp_list: newData,
            search_text: text,
        });
    }

    get gradient() {
        return (
            <LinearGradient
                colors={['#FBF3F300', '#FBF3F3']}
                startPoint={{ x: 1, y: 0 }}
                endPoint={{ x: 0, y: 1 }}
                style={styles.gradient}
            />
        );
    }
    render() {
        const { navigate } = this.props.navigation;
        const { paid } = this.props;
        const { formatTextEclips } = this;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.topContainer}>
                    <Image source={{ uri: this.state.top_image_url }} style={styles.top_image} />
                    {/* <Image source={Images.logo_white} style={styles.logoImage} /> */}
                    <View style={styles.gradient_view}>
                        {this.gradient}
                        <Text style={styles.subtittleText}>{formatTextEclips(this.state.page_tittle, 20)}</Text>
                        <View style={styles.searchcontainer}>
                            <TextInput style={styles.searchinput}
                                underlineColorAndroid="transparent"
                                placeholder="Search for categories ..."
                                placeholderTextColor="#898F97"
                                autoCapitalize="none"
                                onChangeText={text => this.filterSearch(text)} />
                            <FontAwesomeIcon icon={faSearch} color={'#09121C'} size={perfectSize(20)} />
                        </View>
                    </View>
                </View>
                <View style={styles.center_view}>
                    <Text style={styles.description_txt}>{this.state.page_description}</Text>
                </View>
                <View style={styles.line}/>
                <View style={styles.bottomcontainer}>
                    {this.makeSessions()}
                </View>

            </SafeAreaView>
        );
    }

}

function mapStateToProps(state) {
    return {
        paid: state.user.paidState,
        userkey: state.user.userkey,
        ca_key1: state.user.ca_key1,
        ca_key2: state.user.ca_key2,
        co_key1: state.user.co_key1,
        co_key2: state.user.co_key2,
    }
};


function mapDispatchToProps(dispatch) {
    return {
        course_select: (keys) => {
            dispatch({
                type: COURSE_SEL,
                ca_key1: keys.ca_key1,
                ca_key2: keys.ca_key2,
                co_key1: keys.co_key1,
                co_key2: keys.co_key2,
            });
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeCoursesDetail);

const styles = StyleSheet.create({
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    container: {
        flex: 1,
        backgroundColor: Colors.home_tab_background,
        // backgroundColor: 'blue',
    },

    topContainer: {
        flexDirection: 'column',
        // paddingVertical: perfectSize(10),
        // width: Constants.video_w,
        // height: Constants.video_h,
        // flexDirection: 'row',
        justifyContent: 'flex-end',
        // backgroundColor: 'red',
    },
    gradient_view: {
        position: 'absolute',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: Constants.video_w,
        height: Constants.video_h * 0.5,
        // backgroundColor: '#ff0000aa',
    },
    top_image: {
        // position: 'absolute',
        width: Constants.video_w,
        height: Constants.video_h,
        resizeMode: 'cover',
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
        backgroundColor: 'white',
    },
    searchinput: {
        width: Constants.search_w - perfectSize(40),
        height: Constants.search_h,
        fontSize: Constants.normal_font,
        textAlign: 'center',
    },
    center_view: {
        width: '100%',
        paddingHorizontal: perfectSize(30),
        paddingVertical: perfectSize(10),
    },
    description_txt:{
        fontFamily: Fonts.extrabold,
        fontSize: Constants.description_font,
        textAlign: 'center',
        color: Colors.fontcolors.strong,
    },
    line: {
        height: perfectSize(3),
        width: perfectSize(150),
        alignSelf: 'center',
        backgroundColor: '#6e878e'
    },
    bottomcontainer: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        // backgroundColor: 'blue'
    },
    sessioncontainer: {
        flexDirection: 'row',
        width: Constants.course_vw,
        height: Constants.course_vh,
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: perfectSize(20),
        borderRadius: Constants.course_vradius,
        borderBottomRightRadius: 0,
        // backgroundColor: 'yellow',
    },
    sessionimage: {
        width: Constants.course_vh,
        height: Constants.course_vh,
        borderRadius: Constants.course_vradius,
        borderBottomRightRadius: 0,
        opacity: 1,
    },
    play_img_view: {
        position: 'absolute',
        width: Constants.course_vh,
        height: Constants.course_vh,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sessiontextarea: {
        flex: 1,
        width: Constants.course_vw - Constants.course_vh,
        height: Constants.course_vh,
        paddingHorizontal: perfectSize(20),
        alignItems: 'flex-start',
        borderTopRightRadius: Constants.course_vradius,
    },
    sessiontittle: {
        fontFamily: Fonts.extrabold,
        fontSize: Constants.normal_font,
        textAlign: 'center',
        color: Colors.fontcolors.strong,
    },
    sessiontime: {
        marginLeft: perfectSize(5),
        fontFamily: Fonts.semibold,
        fontSize: Constants.small_font,
        textAlign: 'center',
        color: Colors.fontcolors.little,
    },
    sessiondescription: {
        fontFamily: Fonts.semibolditalic,
        fontSize: Constants.small_font,
        textAlign: 'justify',
        color: Colors.fontcolors.strong,
    },

});

