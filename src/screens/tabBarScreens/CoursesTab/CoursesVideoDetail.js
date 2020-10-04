import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
// import { Button } from 'react-native-elements'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
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
import Loader from "react-native-modal-loader";

const perfectSize = create(PREDEF_RES.iphoneX.dp)

class CoursesVideoDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: ``,
      headerTransparent: 'true',
      headerLeft: () => <BackButton onPress={() => { Orientation.unlockAllOrientations(); navigation.goBack(); }} />
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      video_info: [],
      up_count: 0,
      down_count: 0,
      fullscreen: false,
      reviews: [],
      r_avg: 0,
      r_count: 0,
      r_flag: false,
      user_reveiw_status: false,
      isLoading: true,
      isVisible: false,
      add_review_text: '',
      add_review_rating: 0,
      set_like_flag: false,
    }
    this.ReviewRef = null;
  }

  componentDidMount = () => {
    const self = this
    self.get_recent_video();
    self.get_video_info();
  }

  get_recent_video = () => {
    const self = this;
    const v_key1 = this.props.v_key1;
    const v_key2 = this.props.v_key2;
    const userkey = this.props.userkey;
    const video_id = this.props.navigation.state.params.videoId;
    const user_ref = Firebase.database().ref('User_info/' + userkey)

    if (v_key1 == '') {
      user_ref.update({ v_key1: video_id })
      self.props.video_select({
        v_key1: video_id,
        v_key2: ''
      });
    } else {
      if (v_key2 == '') {
        if (v_key1 != video_id) {
          user_ref.update({ v_key2: video_id })
          self.props.video_select({
            v_key1: v_key1,
            v_key2: video_id
          });
        }
      } else {
        if (v_key2 != video_id) {
          user_ref.update({
            v_key1: v_key2,
            v_key2: video_id,
          })
          self.props.video_select({
            v_key1: v_key2,
            v_key2: video_id,
          });
        }
      }
    }
  }

  get_video_info = () => {
    const self = this;
    const video_id = this.props.navigation.state.params.videoId;
    let video_info = null;
    const reviews = [];
    const video_ref = Firebase.database().ref('videos/' + video_id)
    const video_like = Firebase.database().ref('videos/' + video_id + '/like_status')
    const review_ref = Firebase.database().ref('reviews/');
    self.ReviewRef = review_ref;
    var review_sum = 0;
    var review_counter = 0;
    var up_val=0;
    var down_val=0;

    video_ref.on('value', function (snapshot) {
      video_info = snapshot.val();
    })

    if (video_info.like_status == null) {
      self.setState({ up_count: 0, down_count: 0 })
    } else {
      video_like.on('value', function(snapshot){
        snapshot.forEach(function (childSanpshot){
          childSanpshot.val().like ? up_val++: down_val++
          if (childSanpshot.val().email==self.props.email) self.setState({set_like_flag: true})
        })     
      })
      self.setState({ up_count:up_val, down_count: down_val })
    }


    review_ref.on('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        if (childSnapshot.val().video_key == video_id) {
          if (childSnapshot.val().uploader.email == self.props.email) self.setState({ user_reveiw_status: true })
          review_sum += childSnapshot.val().score;
          review_counter++;
          reviews.push({
            key: childSnapshot.key,
            ...childSnapshot.val()
          })
        }
      });
      self.setState({
        video_info: video_info,
        r_avg: review_counter != 0 ? (review_sum / review_counter).toFixed(2) : 0,
        r_count: review_counter,
        reviews: reviews.reverse(),
        r_flag: reviews.length == 0 ? false : true,
        isLoading: false,
      });
    });

  }

  manageVideoCurrentTime = () => {
    if (!this.player.state.isPlaying) {
      this.videoProgress = setInterval(() => {
        this.setState({
          videoStatus: {
            ...this.state.videoStatus,
            currentTime: this.state.videoStatus.duration * this.player.state.progress
          }
        })
      }, 1000)
    } else {
      clearInterval(this.videoProgress);
    }
  }

  formatTextEclips = (text, length = 20) => {
    return text.length > length ? text.slice(0, length) + '...' : text;
  }

  make_star_group = (ranking, spacing) => {
    // console.log('star: ', ranking);
    return (
      <Stars
        default={ranking}
        // display={ranking}
        spacing={spacing}
        count={5}
        half={true}
        disabled={true}
        starSize={30}
        fullStar={<Icon name={'star'} style={[styles.myStarStyle]} />}
        halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]} />}
        emptyStar={<Icon name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />} />
    )
  }

  displayModal = (show) => {
    const self = this;
    self.setState({ isVisible: show });
  }

  modalview = () => {
    const self = this;
    const { isVisible, add_review_text, add_review_rating } = this.state;
    const { email, userkey, username } = this.props
    const video_id = this.props.navigation.state.params.videoId;
    return (
      <Modal
        visible={isVisible}
        modalAnimation={
          new ScaleAnimation({
            initialValue: 0, // optional
            useNativeDriver: true, // optional
          })
          // new SlideAnimation({
          // slideFrom: 'bottom',
          // })
        }
        modalTitle={<ModalTitle title="Add Experience" />}
        onTouchOutside={() => {
          self.setState({ isVisible: false });
        }}
        footer={
          <ModalFooter>
            <ModalButton
              text="CANCEL"
              onPress={() => { self.setState({ isVisible: false, add_review_text: '' }); }}
            />
            <ModalButton
              text="ADD"
              onPress={() => {
                self.setState({ isVisible: false });
                self.ReviewRef.push({
                  video_key: video_id,
                  date: "2020-03-25 22:10:21",
                  score: add_review_rating,
                  contents: add_review_text,
                  uploader: {
                    email: email,
                    uid: userkey,
                    name: username
                  }
                });
              }}
            />
          </ModalFooter>
        }
      >
        <ModalContent style={styles.modal_content}>
          <TextInput
            onChangeText={val => self.setState({ add_review_text: val })}
            value={this.state.text}
            multiline={true}
            numberOfLines={4}
            blurOnSubmit={false}
            style={styles.modal_input}
          />
          <View style={styles.modal_starGroup}>
            <Stars
              default={0}
              update={(val) => { self.setState({ add_review_rating: val }) }}
              spacing={4}
              count={5}
              starSize={40}
              fullStar={<Icon name={'star'} style={[styles.myStarStyle]} />}
              halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]} />}
              emptyStar={<Icon name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />} />
          </View>
        </ModalContent>
      </Modal>
    )
  }

  video_like_set = (val) => {
    const self = this;
    const { set_like_flag, up_count, down_count } = this.state;
    const video_id = this.props.navigation.state.params.videoId;
    const { userkey, email } = this.props;
    if (!set_like_flag) {
      val ?
        self.setState({ up_count: up_count + 1 })
        : self.setState({ down_count: down_count + 1 })
      Firebase.database().ref('videos/' + video_id + '/like_status/' + userkey).update({
        email: email,
        like: val,
      })
      alert('Have done successfully!!!');
    } else {
      alert('You have already set this option!');
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const video_id = this.props.navigation.state.params.videoId;
    const { formatTextEclips, modalview, displayModal, video_like_set } = this;
    const { video_info, reviews, user_reveiw_status, r_avg, r_count, up_count, down_count, isLoading, r_flag } = this.state;
    return (
      <>
        {isLoading ?
          <Loader loading={isLoading} color="#ff66be" /> :
          <SafeAreaView style={styles.container}>
            {modalview()}
            <VideoPlayer video_url={video_info.videoUrl} />
            <ScrollView>
              <View style={styles.top_part}>
                <View style={styles.top_tittle_part}>
                  {this.make_star_group(r_avg, 10)}
                  <Text style={styles.videotittle}>{video_info.name}</Text>
                </View>
                <View style={styles.top_down_part}>
                  <View style={styles.down_up_part}>
                    <TouchableOpacity style={styles.video_icon} onPress={() => { video_like_set(true) }}>
                      <FontAwesomeIcon icon={faThumbsUp} color={'#459221'} size={Constants.description_font} />
                    </TouchableOpacity>
                    <Text style={styles.uptxt}>{up_count}</Text>
                  </View>
                  <Text style={styles.uploader_name}>{video_info.uploader.email}</Text>
                  <View style={styles.down_up_part}>
                    <TouchableOpacity style={styles.video_icon} onPress={() => { video_like_set(false) }}>
                      <FontAwesomeIcon icon={faThumbsDown} color={'#922145'} size={Constants.description_font} />
                    </TouchableOpacity>
                    <Text style={styles.downtxt}>{down_count}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.center_part}>
                <Text style={styles.description}>{formatTextEclips(video_info.description, 200)}</Text>
                <TouchableOpacity onPress={() => { navigate('VideoDetail', { v_info: video_info }) }}>
                  <Text style={styles.more_bt}>Read More</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.line} />
              <View style={styles.bottom_part}>
                <View style={styles.star_ranking}>
                  {this.make_star_group(r_avg, 6)}
                  <Text style={styles.reaview_avg}>{r_avg}</Text>
                </View>
                {r_flag ?
                  <View style={styles.review_part}>
                    <View style={styles.cardImagecontainer}>
                      <Image source={Images.user_image} style={styles.cardImage} />
                    </View>
                    <View style={styles.txt_view}>
                      <Text style={styles.review_name_txt}>{reviews[0].uploader.name}</Text>
                      <Text style={styles.review_date_txt}>{reviews[0].date}</Text>
                      <Text style={styles.review_content_txt}>{formatTextEclips(reviews[0].contents, 200)}</Text>
                      <View style={{ alignSelf: 'flex-start' }}>
                        {this.make_star_group(reviews[0].score, 3)}
                      </View>
                    </View>
                  </View>
                  : <Text style={styles.no_review_txt}>Not Found Review</Text>
                }
              </View>
              <View style={{ flexDirection: 'row', paddingHorizontal: perfectSize(20) }}>
                <TouchableOpacity onPress={() => { navigate('VideoReviewDetail', { avg_review: r_avg, review_count: r_count, reviews: reviews }) }}>
                  <Text style={styles.more_bt}>Read More</Text>
                </TouchableOpacity>
                {!user_reveiw_status &&
                  <TouchableOpacity onPress={() => { displayModal(true) }}>
                    <Text style={styles.rate_bt}>Leave Your Review</Text>
                  </TouchableOpacity>
                }
              </View>
              <View style={styles.line} />
            </ScrollView>
          </SafeAreaView>
        }
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    paid: state.user.paidState,
    userkey: state.user.userkey,
    email: state.user.email,
    username: state.user.username,
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

export default connect(mapStateToProps, mapDispatchToProps)(CoursesVideoDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.courses_tab_background,
  },
  top_part: {
    alignItems: 'center',
    paddingHorizontal: perfectSize(30),
  },
  top_tittle_part: {
    alignItems: 'center',
    // backgroundColor: 'red',
    paddingVertical: perfectSize(10),
  },
  videotittle: {
    fontFamily: Fonts.black,
    fontSize: Constants.subtittle_font,
    color: Colors.fontcolors.strong,
    textAlign: 'center',
  },
  top_down_part: {
    width: '100%',
    marginTop: perfectSize(-10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // backgroundColor: 'blue',
  },
  down_up_part: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  video_icon: {
    padding: perfectSize(5),
  },
  uptxt: {
    fontFamily: Fonts.semibold,
    fontSize: Constants.small_font,
    color: Colors.fontcolors.little,
  },
  uploader_name: {
    fontFamily: Fonts.semibolditalic,
    fontSize: Constants.description_font,
    color: Colors.fontcolors.strong,
  },
  downtxt: {
    fontFamily: Fonts.semibold,
    fontSize: Constants.small_font,
    color: Colors.fontcolors.little,
  },
  myStarStyle: {
    color: 'yellow',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: 'white',
  },

  center_part: {
    paddingHorizontal: perfectSize(20),
    paddingVertical: perfectSize(10),
  },
  description: {
    fontFamily: Fonts.semibold,
    fontSize: Constants.description_font,
    color: Colors.fontcolors.strong,
    textAlign: 'justify',
  },
  more_bt: {
    marginVertical: perfectSize(20),
    fontFamily: Fonts.extrabold,
    fontSize: Constants.description_font,
    color: Colors.primary_text,
  },
  rate_bt: {
    marginVertical: perfectSize(20),
    marginLeft: perfectSize(40),
    fontFamily: Fonts.extrabold,
    fontSize: Constants.description_font,
    color: Colors.primary_text,

  },
  line: {
    height: perfectSize(1),
    backgroundColor: Colors.little_dark,
    marginBottom: perfectSize(30),
    marginHorizontal: perfectSize(20),
  },
  bottom_part: {
    paddingHorizontal: perfectSize(20),
    width: '100%',
  },
  star_ranking: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  reaview_avg: {
    fontFamily: Fonts.semibold,
    fontSize: Constants.description_font,
    color: Colors.fontcolors.little,
    paddingHorizontal: perfectSize(20)
  },

  review_part: {
    alignSelf: 'center',
    flexDirection: 'row',
    paddingVertical: perfectSize(10),
  },
  cardImagecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Constants.review_avartar_size + perfectSize(2),
    height: Constants.review_avartar_size + perfectSize(2),
    borderRadius: Constants.review_avartar_size * 0.5 + perfectSize(1),
    backgroundColor: Colors.primary_text,
  },
  cardImage: {
    width: Constants.review_avartar_size,
    height: Constants.review_avartar_size,
    borderRadius: Constants.review_avartar_size * 0.5,
  },
  txt_view: {
    width: Constants.screen_w * 0.7,
    paddingHorizontal: perfectSize(10),
  },
  review_name_txt: {
    fontFamily: Fonts.extrabold,
    fontSize: Constants.description_font,
    color: Colors.fontcolors.strong,
  },
  review_date_txt: {
    fontFamily: Fonts.semibolditalic,
    fontSize: Constants.small_font,
    color: Colors.fontcolors.little,
  },
  review_content_txt: {
    marginVertical: perfectSize(10),
    fontFamily: Fonts.semibold,
    fontSize: Constants.normal_font,
    color: Colors.fontcolors.strong,
    textAlign: 'justify'
  },

  no_review_txt: {
    fontFamily: Fonts.semibolditalic,
    fontSize: Constants.description_font,
    color: Colors.fontcolors.little,
    paddingHorizontal: perfectSize(30)
  },

  modal_content: {
    width: Constants.screen_w * 0.9,
    height: Constants.screen_h * 0.5,
    backgroundColor: Colors.courses_tab_background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal_input: {
    width: Constants.screen_w * 0.8,
    height: Constants.screen_h * 0.35,
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: perfectSize(3),
    borderRadius: perfectSize(10),
    textAlignVertical: 'top',
  },
  modal_starGroup: {
    flexDirection: 'row',
    marginTop: perfectSize(15),

  },

});

