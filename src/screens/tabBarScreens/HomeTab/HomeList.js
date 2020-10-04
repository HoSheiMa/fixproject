import React from 'react';
import { TextInput, RefreshControl, Animated, ActivityIndicator, View, Text, Image, ImageBackground, TouchableHighlight, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import Firebase from '../../../../config/Firebase'
import { Images, Colors, Constants, Fonts, Layoutsd } from '@utils'
import Logo from '../../../component/Logo'
import TrialButton from '../../../component/TrialButton'
import Modal, { ModalContent, SlideAnimation, ScaleAnimation, ModalTitle, ModalFooter, ModalButton } from 'react-native-modals';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faSearch, faThumbsUp, faThumbsDown, faPlay, faTimesCircle, faEllipsisH, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import Loader from "react-native-modal-loader";
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';

import { create, PREDEF_RES } from 'react-native-pixel-perfect';
import { FlatList } from 'react-native-gesture-handler';
const perfectSize = create(PREDEF_RES.iphoneX.dp)

class HomeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intro_v: [],
      my_course: [],
      recent_v: [],
      isVisible: false,
      refreshing: false,
      isLoading: false,
      recentPlayItems: [
        {
          id: 1,
          ImageUrl: '../../../Images/NonImage.png',
        },
        {
          id: 2,
          ImageUrl: '../../../Images/NonImage1.png',
        },
        {
          id: 3,
          ImageUrl: '../../../Images/NonImage.png',
        },
        {
          id: 4,
          ImageUrl: '../../../Images/NonImage1.png',
        },
        {
          id: 5,
          ImageUrl: '../../../Images/NonImage.png',
        },
      ],
      podcastPlayItems: [
        {
          id: 1,
          ImageUrl: '../../../Images/NonImage1.png',
        },
        {
          id: 2,
          ImageUrl: '../../../Images/NonImage1.png',
        },
        {
          id: 3,
          ImageUrl: '../../../Images/NonImage1.png',
        },
        {
          id: 4,
          ImageUrl: '../../../Images/NonImage1.png',
        },
        {
          id: 5,
          ImageUrl: '../../../Images/NonImage1.png',
        },
      ]
    }
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.runSetUpInterface(this.props);
  }

  showLoader = () => {
    this.setState({ isLoading: true });
  };

  componentDidMount() {
    this.showLoader();
    this.runSetUpInterface(this.props);
  }


  runSetUpInterface(props) {
    const self = this
    let intro_count = 0;
    let recent_count = 0;
    let intro_videos = [];
    let recent_videos = [];
    let courses = [];
    const ca_key1 = props.ca_key1;
    const co_key1 = props.co_key1;
    const ca_key2 = props.ca_key2;
    const co_key2 = props.co_key2;
    const v_key1 = props.v_key1;
    const v_key2 = props.v_key2;
    const co_ref1 = Firebase.database().ref('categories/' + ca_key1 + '/cources/' + co_key1);
    const co_ref2 = Firebase.database().ref('categories/' + ca_key2 + '/cources/' + co_key2);
    const v_ref = Firebase.database().ref('videos/');

    if (co_key1 && ca_key1) {
      co_ref1.on('value', function (snapshot) {
        courses.push({
          key_1: ca_key1,
          key_2: co_key1,
          ...snapshot.val(),
        })
      })
    } else {
      courses.push({
        key_1: ca_key1,
        key_2: co_key1,
      })
    }
    if (co_key2 && ca_key2) {
      co_ref2.on('value', function (snapshot) {
        courses.push({
          key_1: ca_key2,
          key_2: co_key2,
          ...snapshot.val(),
        })
      })
    } else {
      courses.push({
        key_1: ca_key2,
        key_2: co_key2,
      })
    }

    v_ref.on('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        if (childSnapshot.val().videoType == 'intro' && intro_count < 2) {
          intro_videos.push({
            key: childSnapshot.key,
            ...childSnapshot.val()
          });
          intro_count++;
        }
        if (childSnapshot.key == v_key1 || childSnapshot.key == v_key2) {
          recent_videos.push({
            key: childSnapshot.key,
            ...childSnapshot.val()
          })
          recent_count++;
        }
      });
      intro_videos = self.formatarray(intro_videos)
      recent_videos = self.formatarray(recent_videos)
      self.setState({
        intro_v: intro_videos,
        recent_v: recent_videos,
        my_course: courses,//.reverse(),
        refreshing: false,
        isLoading: false,
      })
    });
  }

  formatarray = (array_val) => {
    var result_array = array_val;
    const len = array_val.length;
    if (len == 0) {
      result_array.push({ key: '' });
      result_array.push({ key: '' });
    } else if (len == 1) {
      result_array.push({ key: '' });
    }
    return result_array;
  }

  formatTime = (time) => {
    time = ~~(time);
    const second = time % 60;
    const minute = Math.floor(time / 60) % 60;
    const hour = Math.floor(time / 3600);
    return this.formatTimeString(hour) + ':' + this.formatTimeString(minute) + ':' + this.formatTimeString(second);
  }

  formatTimeString = (num) => {
    return ('00' + String(num)).slice(-2);
  }

  formatTextEclips = (text, length = 10) => {
    return text.length > length ? text.slice(0, length) + '...' : text;
  }
  makeStartRelaxing = () => {
    const { navigate } = this.props.navigation;
    const start_relaxing = this.state.intro_v.map((video, index) => {
      if (video.key == "") {
        return (
          <TouchableOpacity onPress={() => { navigate('Player1') }}>
            <View style={styles.blankcard}>
              {/* <Text style={styles.blankcard_txt}>Not found</Text> */}
              <Image style={styles.cardPhoto1} source={require('../../../Images/NonImage.png')} resizeMode="stretch" />
            </View>
            <View style={{ width: 150 }}>
              <Text style={{ color: 'white', fontSize: 14, }}>Enjoy Life</Text>
              <Text style={{ color: "#BDBDBD", fontSize: 12, }}>Experiencing the joyful moments in life</Text>
              <Text style={{ color: "white", fontSize: 11, }}>15 min</Text>
            </View>
            <TouchableOpacity style={styles.heartIcon}>
              <Icon name="heart-o" size={20} color="#fff" />
            </TouchableOpacity>
          </TouchableOpacity>
        )
      } else {
        return (
          // <TouchableOpacity key={index} onPress={() => { navigate('HomeVideoDetail', { videoId: video.key }) }}>
          <TouchableOpacity key={index} onPress={() => { navigate('Player1') }}>
            <View style={styles.cardContainer}>
              <View style={styles.cardPhotoView}>
                <Image style={styles.cardPhoto} source={{ uri: video.thumbnail }} />
              </View>
              {/* <Text style={styles.cardTitle}>{this.formatTextEclips(video.name, 10)}</Text> */}
              {/* <Text style={styles.cardDescription}>{this.formatTime(video.duration)}</Text> */}
            </View>
            <View style={{ width: 150 }}>
              <Text style={{ color: 'white', fontSize: 14, }}>Enjoy Life</Text>
              <Text style={{ color: "#BDBDBD", fontSize: 12, }}>Experiencing the joyful moments in life</Text>
              <Text style={{ color: "white", fontSize: 11, }}>15 min</Text>
            </View>
            <TouchableOpacity style={styles.heartIcon}>
              <Icon name="heart-o" size={20} color="#fff" />
            </TouchableOpacity>
          </TouchableOpacity >
        );
      }
    });
    return start_relaxing;
  }
  makeMyCourses = () => {
    const self = this;
    const { navigate } = this.props.navigation;

    const MyCourses = self.state.my_course.map((course, index) => {
      if (course.key_1 == '' || course.key_2 == '') {
        return (
          <TouchableOpacity onPress={() => { navigate('Player1') }}>
            <View style={styles.blankcard}>
              {/* <Text style={styles.blankcard_txt}>Not found</Text> */}
              <Image style={styles.cardPhoto1} source={require('../../../Images/NonImage.png')} resizeMode="stretch" />
            </View>
            <View style={{ width: 150 }}>
              <Text style={{ color: 'white', fontSize: 14, }}>PodCast Title</Text>
              <Text style={{ color: "#BDBDBD", fontSize: 12, }}>Brief descriptions of podcast episode</Text>
              <Text style={{ color: "white", fontSize: 11, }}>15 min</Text>
            </View>
            <TouchableOpacity style={styles.heartIcon}>
              <Icon name="heart-o" size={20} color="#fff" />
            </TouchableOpacity>
          </TouchableOpacity>
        )
      } else {
        return (
          // <TouchableOpacity onPress={() => { navigate('HomeCoursesDetail', { categoryId: course.key_1, courseId: course.key_2 }) }}>
          <TouchableOpacity onPress={() => { navigate('TalkList') }}>
            <View style={styles.cardContainer}>
              <View style={styles.cardPhotoView}>
                <Image style={styles.cardPhoto} source={{ uri: course.thumbnailUrl }} />
              </View>
              <Text style={styles.cardTitle}>{this.formatTextEclips(course.name, 10)}</Text>
              {/* <Text style={styles.cardDescription}>{this.formatTextEclips(course.description, 15)}</Text> */}
              <Text style={{ color: 'white', fontSize: 14, }}>Podcast Title</Text>
              <Text style={{ color: "#BDBDBD", fontSize: 12, }}>Brief descriptions of podcast episode</Text>
              <Text style={{ color: "white", fontSize: 11, }}>15 min</Text>
              <TouchableOpacity style={styles.heartIcon}>
                <Icon name="heart-o" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      }
    });
    return MyCourses;
  }

  renderPhoto = (item) => (
    <View style={{ marginRight: 25 }}>
      <TouchableOpacity onPress={() => { this.props.navigation.navigate('Player1') }}>
        {/* <TouchableOpacity onPress={() => { this.props.navigaiton.navigate('HomeVideoDetail', { videoId: item.key }) }}> */}
        <View style={styles.cardContainer}>
          <View style={styles.cardPhotoView}>
            <Image style={styles.cardPhoto} source={require('../../../Images/NonImage.png')} />
          </View>
          <View style={{ width: 150, marginTop: 20 }}>
            <Text style={{ color: 'white', fontSize: 14, }}>Enjoy Life</Text>
            <Text style={{ color: "#BDBDBD", fontSize: 12, }}>Experiencing the joyful moments in life</Text>
            <Text style={{ color: "white", fontSize: 11, }}>15 min</Text>
          </View>
          {/* <Text style={styles.cardTitle}>{this.formatTextEclips(item.name, 6)}</Text>
            <Text style={styles.cardDescription}>{this.formatTime(item.duration)}</Text> */}
          <TouchableOpacity style={styles.heartIcon}>
            <Icon name="heart-o" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  )

  renderPodcast = (item) => (
    <TouchableOpacity style={{ marginRight: 25 }} onPress={() => { this.props.navigation.navigate('TalkList') }}>
      <View style={styles.cardContainer}>
        <View style={styles.cardPhotoView}>
          <Image style={styles.cardPhoto} source={require('../../../Images/NonImage1.png')} />
        </View>
        {/* <Text style={styles.cardTitle}>{this.formatTextEclips(item.name, 10)}</Text> */}
        <Text style={styles.cardTitle}>{item.name}</Text>
        {/* <Text style={styles.cardDescription}>{this.formatTextEclips(item.description, 15)}</Text> */}
        <Text style={{ color: 'white', fontSize: 14, }}>Podcast Title</Text>
        <Text style={{ color: "#BDBDBD", fontSize: 12, }}>Brief descriptions of podcast episode</Text>
        <Text style={{ color: "white", fontSize: 11, }}>15 min</Text>
        <TouchableOpacity style={styles.heartIcon}>
          <Icon name="heart-o" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )

  makeRecentlyPlayed = () => {
    const { navigate } = this.props.navigation;
    const { recent_v } = this.state;
    const recentVideo = recent_v.map((video, index) => {
      if (video.key == "") {
        return (
          <TouchableOpacity onPress={() => { navigate('Player1') }}>
            <View style={styles.blankcard}>
              {/* <Text style={styles.blankcard_txt}>Not found</Text> */}
              <Image style={styles.cardPhoto1} source={require('../../../Images/NonImage.png')} resizeMode="stretch" />
            </View>
            <View style={{ width: 150 }}>
              <Text style={{ color: 'white', fontSize: 14, }}>Enjoy Life</Text>
              <Text style={{ color: "#BDBDBD", fontSize: 12, }}>Experiencing the joyful moments in life</Text>
              <Text style={{ color: "white", fontSize: 11, }}>1500 min</Text>
            </View>
            <TouchableOpacity style={styles.heartIcon}>
              <Icon name="heart-o" size={20} color="#fff" />
            </TouchableOpacity>
          </TouchableOpacity>
        )
      } else {
        return (
          // <View style={styles.cardBorder}>
          <TouchableOpacity key={index} onPress={() => { navigate('HomeVideoDetail', { videoId: video.key }) }}>
            <View style={styles.cardContainer}>
              <View style={styles.cardPhotoView}>
                <Image style={styles.cardPhoto} source={{ uri: video.thumbnail }} />
              </View>
              <View style={{ width: 150 }}>
                <Text style={{ color: 'white', fontSize: 14, }}>Enjoy Life</Text>
                <Text style={{ color: "#BDBDBD", fontSize: 12, }}>Experiencing the joyful moments in life</Text>
                <Text style={{ color: "white", fontSize: 11, }}>15 min</Text>
              </View>
              {/* <Text style={styles.cardTitle}>{this.formatTextEclips(video.name, 6)}</Text>
                <Text style={styles.cardDescription}>{this.formatTime(video.duration)}</Text> */}
              <TouchableOpacity style={styles.heartIcon}>
                <Icon name="heart-o" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          //<Text style={{ color: 'white' }}>Enjoy Life</Text>
          //</View> 
        );
      }
    });
    return recentVideo;
  }


  displayModal(show) {
    const self = this
    self.setState({ isVisible: show });
  }


  render() {
    const { navigate } = this.props.navigation;
    const self = this;
    const { recent_v } = this.state;
    const { paid } = this.props;
    return (
      <>
        {this.state.isLoading ?
          <Loader loading={this.state.isLoading} color="#ff66be" /> :
          <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#000000','#0e0314', '#230633']} style={styles.linearGradient}>
              <ImageBackground source={require('../../../Images/Cat.png')} resizeMode='stretch' style={styles.Background1} >
                <LinearGradient colors={['#000000', '#561E98']} style={styles.linearGradient}>
                  <View style={styles.HeaderArea}>
                    {/* <TouchableHighlight onPress={() => this.props.navigation.goBack()} style={styles.btnContainer}>
                    <FontAwesomeIcon icon={faAngleLeft} color={'white'} size={perfectSize(35)} />
                  </TouchableHighlight> */}
                    <Text style={{ color: '#fff', fontSize: 20, marginLeft: 20 }}>INNERWONDERS</Text>
                  </View>
                </LinearGradient>
              </ImageBackground>
              <Modal
                visible={this.state.isVisible}
                modalAnimation={
                  new SlideAnimation({
                    slideFrom: 'bottom',
                  })
                }
                modalTitle={
                  <View style={styles.modal_header}>
                    <Logo />
                    <TouchableOpacity onPress={() => { self.setState({ isVisible: false, text: '' }); }} style={styles.modal_cacel_bt}>
                      <FontAwesomeIcon icon={faTimesCircle} color={'#aaa'} size={perfectSize(25)} />
                    </TouchableOpacity>
                  </View>}
                onTouchOutside={() => {
                  self.setState({ isVisible: false });
                }}
              >
                <ModalContent style={styles.modal_content}>
                  <Text style={styles.modal_des1}>Remember why you starded</Text>
                  <Text style={styles.modal_des2}>your intention:</Text>
                  <TextInput
                    onChangeText={val => self.setState({ text: val })}
                    value={this.state.text}
                    multiline={false}
                    // numberOfLines={4}
                    // blurOnSubmit={false}
                    style={styles.modal_input}
                  />
                </ModalContent>
              </Modal>
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                  />
                }
              >
                <View style={styles.centerContainer}>
                  <View style={styles.TitleArea}>
                    <Text style={styles.PartTittle}>Recently Played</Text>
                    <AntDesignIcon name="arrowright" color="#73219F" size={25} style={{ marginRight: 20, marginTop: 20 }} />
                  </View>
                  <View style={styles.Part}>
                    <View style={styles.partContainer}>
                      {/* {this.makeRecentlyPlayed()} */}
                      <FlatList
                        data={this.state.recentPlayItems}
                        horizontal
                        showsHorizontalScrollIndicator={true}
                        renderItem={this.renderPhoto}
                        keyExtractor={item => item.id}
                      />
                    </View>
                  </View>
                  {/* {!paid ? <TrialButton onPress={() => { navigate('Subscription') }} /> : <View />} */}
                  <View style={styles.TitleArea}>
                    <Text style={styles.PartTittle}>Podcast</Text>
                    <AntDesignIcon name="arrowright" color="#73219F" size={25} style={{ marginRight: 20, marginTop: 20 }} />
                  </View>
                  <View style={styles.Part}>
                    <View style={styles.partContainer}>
                      {/* {this.makeMyCourses()} */}
                      <FlatList
                        data={this.state.podcastPlayItems}
                        horizontal
                        showsHorizontalScrollIndicator={true}
                        renderItem={this.renderPodcast}
                        keyExtractor={item => item.id}
                      />
                    </View>
                  </View>
                  <View style={styles.TitleArea}>
                    <Text style={styles.PartTittle}>Courses</Text>
                    <AntDesignIcon name="arrowright" color="#73219F" size={25} style={{ marginRight: 20, marginTop: 20 }} />
                  </View>
                  <View style={styles.partContainer}>
                    {/* {this.makeStartRelaxing()} */}
                    <FlatList
                      data={this.state.recentPlayItems}
                      horizontal
                      showsHorizontalScrollIndicator={true}
                      renderItem={this.renderPhoto}
                      keyExtractor={item => item.id}
                    />
                  </View>
                </View>
              </ScrollView>
              {/* <Animated.View style={styles.header}>
              <View style={styles.bar}>
                <Text style={styles.title}>Title</Text>
              </View>
            </Animated.View> */}
            </LinearGradient>
          </SafeAreaView>
        }
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    userkey: state.user.userkey,
    email: state.user.email,
    username: state.user.username,
    paid: state.user.paidState,
    ca_key1: state.user.ca_key1,
    ca_key2: state.user.ca_key2,
    co_key1: state.user.co_key1,
    co_key2: state.user.co_key2,
    v_key1: state.user.v_key1,
    v_key2: state.user.v_key2,
  }
}

export default connect(mapStateToProps)(HomeList);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.home_tab_background,
  },


  // header: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   backgroundColor: '#03A9F4',
  //   overflow: 'hidden',
  // },
  // bar: {
  //   marginTop: 28,
  //   height: 32,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // title: {
  //   backgroundColor: 'transparent',
  //   color: 'white',
  //   fontSize: 18,
  // },
  linearGradient: {
    height:'100%',
    width:'100%'
  },

  topContainer: {
    flexDirection: 'column',
    padding: perfectSize(10),
  },
  subTittleText: {
    marginTop: perfectSize(10),
    alignSelf: 'center',
    fontFamily: Fonts.bold,
    fontSize: Constants.description_font,
  },
  Background: {
    width: '100%',
    height: '100%',
    // alignItems: "center"
  },
  Background1: {
    width: '100%',
    height: 200,
    // alignItems: "center"
  },
  modal_header: {
    backgroundColor: '#ff9e5d',
  },
  modal_cacel_bt: {
    position: 'absolute',
    alignSelf: 'flex-end',
    width: perfectSize(25),
    height: perfectSize(25),
    marginTop: perfectSize(10),
    right: perfectSize(10),
  },
  modal_content: {
    width: Constants.screen_w * 0.7,
    height: Constants.screen_h * 0.3,
    // backgroundColor: Colors.home_tab_background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal_des1: {
    fontFamily: Fonts.extrabold,
    fontSize: Constants.description_font,
  },
  modal_des2: {
    marginTop: perfectSize(30),
    marginBottom: perfectSize(10),
    fontFamily: Fonts.semibold,
    fontSize: Constants.description_font,
  },
  modal_input: {
    width: Constants.screen_w * 0.6,
    height: perfectSize(50),
    backgroundColor: '#f3f0eb',
    color: '#000',
    // borderColor: 'blue',
    borderWidth: perfectSize(0.5),
    // borderRadius:  perfectSize(10),
    // textAlignVertical: 'top',
  },



  indicator: {
    marginTop: perfectSize(200),
  },
  centerContainer: {
    width: Constants.screen_w,
  },

  PartTittle: {
    marginTop: perfectSize(20),
    fontFamily: Fonts.bold,
    fontSize: 16,
    marginLeft: Constants.homecard_margin,
    color: "#9435D0",
  },
  partContainer: {
    width: Constants.screen_w - 2 * Constants.homecard_margin,
    marginTop: perfectSize(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  cardContainer: {
    flex: 1,
    width: Constants.homecard_size,
    borderColor: Colors.basic,
    // marginBottom: 20
  },
  cardPhotoView: {
    width: Constants.homecard_size + Constants.homecard_border,
    height: 112,
    borderRadius: Constants.homecard_radius,
    // backgroundColor: Colors.home_tab,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardPhoto: {
    width: Constants.homecard_size,
    height: 112,
    borderRadius: Constants.homecard_radius,
  },
  cardPhoto1: {
    width: Constants.homecard_size,
    height: 112,
    borderRadius: 10,
  },
  cardTitle: {
    fontFamily: Fonts.extrabold,
    fontSize: Constants.small_font,
    color: Colors.fontcolors.strong,
    marginLeft: Constants.homecard_radius * 0.6
  },
  cardDescription: {
    fontFamily: Fonts.semibold,
    fontSize: Constants.small_font,
    color: Colors.fontcolors.little,
    marginLeft: Constants.homecard_radius * 0.6
  },

  blankcard: {
    width: Constants.homecard_size,
    height: 112,
    backgroundColor: Colors.gray,
    borderRadius: Constants.homecard_radius,
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 20
  },
  blankcard_txt: {
    fontFamily: Fonts.extrabold,
    fontSize: perfectSize(20),
    color: Colors.fontcolors.strong,
  },
  HeaderArea: {
    flexDirection: 'row',
    alignItems: "center",
    marginTop: 10,
    height: 49,
    justifyContent: "center",
  },
  linearGradient: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  TitleArea: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    width: '100%'
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 20
  }
});