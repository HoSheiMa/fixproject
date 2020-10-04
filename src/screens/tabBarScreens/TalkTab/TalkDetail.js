import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Slider,
  FlatList,
} from 'react-native';
// import { Button } from 'react-native-elements'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faSearch, faThumbsUp, faThumbsDown, faPlay, faTimesCircle, faEllipsisH, faCommentDots } from '@fortawesome/free-solid-svg-icons';
// import {faPlayCircle} from '@fortawesome/free-regular-svg-icons'
import Modal, { ModalContent, SlideAnimation, ScaleAnimation, ModalTitle, ModalFooter, ModalButton } from 'react-native-modals';

import LinearGradient from 'react-native-linear-gradient';
import { users, Talks } from '../../../data/DataArrays';
import { connect } from 'react-redux';
import Firebase from '../../../../config/Firebase';
import Sound from 'react-native-sound';
import { Images, Colors, Constants, Fonts, Layoutsd } from '@utils'
import { Right } from 'native-base';

import { create, PREDEF_RES } from 'react-native-pixel-perfect'
const perfectSize = create(PREDEF_RES.iphoneX.dp)

const {width, height} = Dimensions.get('window');
// orientation must fixed
// const HEIGHT = width < height ? height : width;
// const { width, height } = Dimensions.get('window');
// // orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
const SCREEN_HEIGHT = width < height ? height : width;

const video_width = SCREEN_WIDTH;
const video_height = video_width*3/5;


class HomeVideoDetail extends React.Component {

  sound = new Sound('https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3', null, (error) => {
    if (error) {
      alert('Cannot play the file')
    }

    // play when loaded
    console.log(this.sound.getDuration());
    // sound.play();
  });

  static navigationOptions = ({ navigation }) => {
    return {
      title: '',
      headerTransparent: 'true',
      headerLeft: (
        <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.btnContainer}>
          <FontAwesomeIcon icon={faTimesCircle} color={'white'} size={20} />
        </TouchableOpacity>
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      title: '',
      maker:'',
      time:'',
      image_url:'',
      podcasts:[],
      time: 0,
      sliderValue: 0
    }
    this.TalkRef=null;
  }

  componentDidMount() {
    // var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    // var Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // // const caId = this.props.navigation.state.params.categoryId;
    // // const coId = this.props.navigation.state.params.courseId;
    // // const vId = this.props.navigation.state.params.videoId;
    // this.setState({
    //   date:
    //     weekday[new Date().getDay()] + ',  ' + Months[new Date().getMonth()] + '  ' + new Date().getDate() + ',  ' + new Date().getFullYear(),
    //   selected_id: this.props.navigation.state.params.talk_id,

    // });
    const talk_key = this.props.navigation.state.params.talk_id;
    const self = this;


    this.TalkRef = Firebase.database().ref('podcasts/');
    this.TalkRef.on('value', function (snapshot) {
      let talks = [];
      let talk = null
      snapshot.forEach(function (childSnapshot) {
        // console.log('##############', childSnapshot.val().title)
        if (childSnapshot.key == talk_key) {
          // console.log('----------------!!!!!', childSnapshot.val().title); 
          talk=childSnapshot.val();
        } else {
          talks.push({
            key: childSnapshot.key,
            ...childSnapshot.val()
          });
        }
      });
 
      self.setState({
        podcasts: talks.reverse(),
        title: talk.title==null ? '':talk.title,
        maker: talk.uploader.name==null ? '': talk.uploader.name,
        time: 0,//talk.time==null ? '': talk.time,
        image_url: talk.thumbnail==null ? '': talk.thumbnail,
      });
    });

  }
  
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  _rendermakelist({ item, index }) {
    return (
      <View key={item} style={styles.list_line}>
        <View style={styles.list_left}>
          <TouchableOpacity style={styles.play_bt} >
            <Image source={Images.play_icon} />
            {/* <FontAwesomeIcon icon={faPlay} color={'#50E3C2'} size={20} /> */}
          </TouchableOpacity>
          <View style={styles.list_info_txt_area}>
            <Text style={styles.list_title_txt}>{item.title}</Text>
            <Text style={styles.list_maker_txt}>{item.maker}</Text>
            <Text style={styles.list_time_txt}>{item.time}</Text>
          </View>
        </View>
        <View style={styles.list_icon} >
          <FontAwesomeIcon icon={faEllipsisH} color={'#898F97'} size={20} />
          {/* <Image source={require('../../../../../assets/icons/Combined Shape.png')} /> */}
        </View>
      </View>
    )
  }

  makelists() {
    const data = Talks;
    return (
      <FlatList
        vertical
        showsVerticalScrollIndicator={true}
        numColumns={1}
        data={this.state.podcasts}
        renderItem={this._rendermakelist}
        keyExtractor={item => `${item.id}`}
      />
    );
  }


  get gradient() {
    return (
      <LinearGradient
        colors={['#fff0', '#FBF3FB']}
        startPoint={{ x: 1, y: 0 }}
        endPoint={{ x: 0, y: 1 }}
        style={styles.gradient}
      />
    );
  }

  async getInfo() { // You need the keyword `async`
    try {
      this.sound.getCurrentTime((seconds) => console.log('at ' + seconds));
    } catch (e) {
      console.log('There is no song playing', e)
    }
  }

  onPressPlayButton() {
    this.sound.play()
    this.intervalID = setInterval(
      () => this.displaytime(),
      500
    );
  }

  displaytime() {
    this.sound.getCurrentTime((seconds) => {
      this.setState({
        time: seconds,
        sliderValue: seconds,
      });
    });
  }

  stop() {
    this.sound.pause();
    clearInterval(this.intervalID);
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
    const { navigate } = this.props.navigation;
    const { paid } = this.props;
    const id = this.state.selected_id;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
          <Image source={{ uri: this.state.image_url }} style={styles.top_image} />
          <Image source={Images.logo_white} style={styles.logoImage} />
          {this.gradient}
        </View>
        <View style={styles.info_view}>
          <View style={styles.info_txt_area}>
            <Text style={styles.title_txt}>{this.state.title}</Text>
            <Text style={styles.maker_txt}>{this.state.maker}</Text>
          </View>
          <TouchableOpacity style={styles.play_bt} onPress={() => { this.onPressPlayButton() }} >
            {/* <FontAwesomeIcon icon={faPlay} color={'#50E3C2'} size={20} /> */}
            <Image source={Images.play_icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.control_view}>
          <Slider
            style={styles.talk_slider}
            minimumValue={0}
            maximumValue={this.sound.getDuration()}
            minimumTrackTintColor="#C036D0"
            maximumTrackTintColor="#bbb"
            value={this.state.sliderValue}
          />
          <View style={styles.time_txt_veiw}>
            <Text style={styles.current_time}>{this.formatTime(this.state.time)}</Text>
            <Text style={styles.total_time}>{this.formatTime(this.sound.getDuration())}</Text>
          </View>
        </View>
        <View style={styles.list_view}>
          <Text style={styles.list_title}>NEXT TALKS</Text>
          {this.makelists()}
        </View>
        {/* {!paid ?
          <View style={styles.trialpart}>
            <Text style={styles.trialText}>Unleach your inner wonders</Text>
            <TouchableOpacity style={styles.trialButton}>
              <Text style={styles.trialButtonText}>Try For Free</Text>
            </TouchableOpacity>
          </View>
          : <View />
        } */}
        {/* <View style={styles.bottomcontainer}>
          <View style={styles.experiencesArea}>
            <Text style={styles.reviewtittleText}>List of Experiences</Text>
            <TouchableOpacity onPress={() => { this.displayModal(true) }}>
              <FontAwesomeIcon icon={faPlusCircle} color={'#343'} size={17} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.mainContent}>
            {this.makeExperiencesPart()}
          </ScrollView>
        </View> */}
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    paid: state.user.paidState,
  }
}
export default connect(mapStateToProps)(HomeVideoDetail);



const styles = StyleSheet.create({
  btnContainer:{
      marginLeft: perfectSize(15),
      marginTop: perfectSize(-5),
  },
  gradient: {
      ...StyleSheet.absoluteFillObject
  },
  container: {
      flex: 1,
      backgroundColor: Colors.talks_tab_background,
      },
      topContainer: {
          width: video_width,
          height: video_height,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          // backgroundColor: 'red'
          },
          top_image: {
              position: 'absolute',
              width: video_width,
              height: video_height,
              resizeMode: 'cover',
          },
          logoImage: {
              // marginTop: -5,
              marginRight: perfectSize(-30),
              // backgroundColor: 'blue',
              transform: [{scaleX: 0.4}, {scaleY: 0.4}]
          },
      info_view:{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          height: perfectSize(60),
          marginTop: perfectSize(-70),
          // backgroundColor: 'blue',
          justifyContent: 'space-between',
          },
          info_txt_area:{
              paddingHorizontal: perfectSize(20),
              flexDirection: 'column'
              },
              title_txt:{
                  fontFamily: Fonts.extrabold,
                  fontSize: perfectSize(16),
                  color: Colors.fontcolors.strong,
              },
              maker_txt:{
                  fontFamily: Fonts.semibold,
                  fontSize: perfectSize(14),
                  color: Colors.fontcolors.little,
              },
          play_bt:{
              width: perfectSize(50),
              height: perfectSize(50),
              borderRadius: perfectSize(25),
              marginRight: perfectSize(20),
              borderColor: Colors.gray,
              borderWidth:1,
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: 'yellow',
          },
      control_view:{
          flexDirection: 'column',
          // alignItems: 'center',
          width: SCREEN_WIDTH,
          height: perfectSize(60),
          // backgroundColor: 'blue',
          justifyContent: 'center',
          },
          talk_slider: {
              height: perfectSize(20),
              width: SCREEN_WIDTH-50,
              alignSelf: 'center',
          },
          time_txt_veiw: {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: perfectSize(30),
              },
              current_time: {
                  
                  fontFamily: Fonts.semibold,
                  fontSize: perfectSize(14),
                  color: Colors.fontcolors.strong,
              },
              total_time: {
                  fontFamily: Fonts.semibold,
                  fontSize: perfectSize(14),
                  color: Colors.fontcolors.strong,
              },
      list_view:{
          // flex: 1,
          width: '100%',
          height: 280,
          // backgroundColor: 'red',
          },
          list_title:{
              marginLeft: perfectSize(20),
              fontFamily: Fonts.bold,
              fontSize: perfectSize(14),
              color: Colors.fontcolors.strong,
          },
          list_line:{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              height: perfectSize(60),
              paddingHorizontal: perfectSize(10),
              // backgroundColor: 'blue',
              },
              list_left:{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // backgroundColor: 'gray',
              },
              list_info_txt_area:{
                  paddingHorizontal: perfectSize(10),
                  flexDirection: 'column',
                  // backgroundColor:'red',
                  },
                  list_title_txt:{
                      fontFamily: Fonts.extrabold,
                      fontSize: perfectSize(14),
                      color: Colors.fontcolors.strong,
                  },
                  list_maker_txt:{
                      fontFamily: Fonts.semibold,
                      fontSize: perfectSize(12),
                      color: Colors.fontcolors.little,
                  },
                  list_time_txt:{
                      fontFamily: Fonts.semibold,
                      fontSize: perfectSize(10),
                      color: Colors.fontcolors.little,                        
                  },
              list_icon:{
                  marginRight: perfectSize(10),
                  // backgroundColor: 'yellow',
                  alignItems: 'center',
                  justifyContent: 'center',
              },





      modal_content:{
          width: SCREEN_WIDTH * 0.9,
          height: SCREEN_HEIGHT * 0.5, 
          backgroundColor: Colors.home_tab_backgroud,
          alignItems: 'center',
          justifyContent: 'center',
          },
          modal_input:{
              width: SCREEN_WIDTH * 0.8,
              height: SCREEN_HEIGHT * 0.35, 
              backgroundColor: 'white',
              borderColor: 'blue',
              borderWidth: 3,
              borderRadius: 10,
              textAlignVertical: 'top',
          },
          modal_starGroup:{
              flexDirection: 'row',
              marginTop: 15,
              
          },

      videoContainer: {
          // backgroundColor: Colors.dark,
         },
       
          VideoPlayerPart: {
              alignSelf: 'center',
              width: video_width,
              // height: video_height,
              // backgroundColor: 'red',
          },
          videocontrol: {
              alignSelf: 'center',
              width:video_width,
              height: 50,
              backgroundColor: Colors.basic,
              borderRadius: 20,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,    
          },

          video_control_disp:{
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: "center",
              paddingHorizontal: 20,
          },
          video_icon: {
              width: 25,
              height: 25,
              backgroundColor: '#000000ee',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 13,
          },
          uptxt:{
              fontFamily: Fonts.semibold,
              fontSize: 11,
              color: Colors.fontcolors.little,
              marginLeft: 10,
          },
          video_time:{
              fontFamily: Fonts.bold,
              fontSize: 12,
              color: Colors.fontcolors.white,
              marginHorizontal: 40,
          },
          downtxt:{
              fontFamily: Fonts.semibold,
              fontSize: 11,
              color: Colors.fontcolors.little,
              marginRight: 10,
          },
          videodescriptionText: {
              fontFamily:Fonts.regular,
              fontSize: 12,
              marginLeft: 30,
              marginTop: 5,
              color: Colors.fontcolors.strong,
          },  
          more_container:{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingRight: 30,
              
          },
          more_txt:{
              fontFamily: Fonts.semibold,
              color: Colors.fontcolors.little,
              marginRight: 5,
              fontSize: 12,
          },
      bottomcontainer:{
          alignSelf: 'center',
          width: video_width,
          height: 200,
          marginTop: 10,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          backgroundColor: Colors.home_tab_session,
          borderColor: Colors.home_tab,
          borderWidth: 1,
          },
          experiencesArea: {
              flexDirection:"row",
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 3,
              },
              reviewtittleText: {
                  fontFamily: Fonts.bold,
                  fontSize: 15,
                  letterSpacing: 1.5,
                  // fontWeight: 'bold',
                  marginRight: 30,
                  color: Colors.basic,
              },

  mainContent: {
      width: '100%',
      flex: 1,
      paddingHorizontal: 20,
      // paddingVertical: 5,
      },

      cardContainer: {
          padding: 10,
          borderRadius: 30,
          borderWidth: 1, 
          borderColor: '#FDDFDF',
          marginBottom: 10
          },
          cardTopPart:{
              flexDirection:"row",
              alignItems: 'center',
              marginLeft: -10,
              marginTop: -10,
              },
              cardImagecontainer:{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 52,
                  height: 52,
                  borderRadius:26,
                  backgroundColor:'red',
                  borderWidth: 1,
                  borderColor: '#5BE195',
                  },
                  cardImage: {
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                  },
              cardTittleGroup:{
                  flexDirection:'column',
                  alignItems: 'flex-start',
                  marginLeft: 10,
                  },
                  cardTittle:{
                      fontFamily: Fonts.bold,
                      fontSize: 13,
                      color: Colors.basic
                  },
                  cardStar:{
                      flexDirection:'row',
                      alignItems:'flex-start'
                  },
          cardcontents: {
              marginLeft: 10,
              fontFamily: Fonts.regular,
              fontSize: 10,
              color: Colors.basic           
          },

});

