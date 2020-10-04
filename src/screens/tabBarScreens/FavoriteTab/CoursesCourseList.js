import React from 'react';
import { View, RefreshControl, Text, Image, TouchableOpacity, ImageBackground, SafeAreaView, TextInput, StyleSheet, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faVideo } from '@fortawesome/free-solid-svg-icons';
// import { categories } from '../../../../data/DataArrays';
import { connect } from 'react-redux';
import Logo from '../../../component/Logo'
import Firebase from '../../../../config/Firebase'
import BackButton from '../../../component/ImageBackBt'
import LinearGradient from 'react-native-linear-gradient';
import TrialButton from '../../../component/TrialButton'
import { Images, Colors, Constants, Fonts, Layoutsd } from '@utils'
import Loader from "react-native-modal-loader";
import { create, PREDEF_RES } from 'react-native-pixel-perfect';
const perfectSize = create(PREDEF_RES.iphoneX.dp);

class CoursesCourseList extends React.Component {
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
      ca_title: '',
      ca_description: '',
      id: 0,
      OrientationStatus: '',
      colums: 2,
      coursesList: [],
      disp_list: [],
      search_text: '',
      refreshing: false,
      isLoading: false,
      top_image_url: '',
    }
  }

  componentDidMount() {
    this.showLoader();
    this.load_course();
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.load_course();
  }

  showLoader = () => {
    this.setState({ isLoading: true });
  };

  load_course() {
    const self = this;
    const ca_id = this.props.navigation.state.params.categoryId
    let title = '';
    let description = '';
    let image_url = '';
    const category_ref = Firebase.database().ref('categories/' + ca_id);
    const course_ref = Firebase.database().ref('categories/' + ca_id + '/cources');

    category_ref.once('value', function (snapshot) {
      title = snapshot.val().name;
      description = snapshot.val().description;
      image_url = snapshot.val().thumbnailUrl;
    });

    course_ref.on('value', function (snapshot) {
      let courses = [];
      snapshot.forEach(function (childSnapshot) {
        courses.push({
          key: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      self.setState({
        coursesList: courses.reverse(),
        disp_list: courses,
        ca_title: title,
        ca_description: description,
        top_image_url: image_url,
        id: ca_id,
        refreshing: false,
        isLoading: false
      });
    });
  }

  makecoursecard() {
    const self = this
    const { paid } = self.props;
    const { navigate } = self.props.navigation;
    const categories_card = self.state.disp_list.map((course, index) => {
      return (
        <TouchableOpacity key={index} onPress={() => { navigate('CoursesVideoList', { categoryId: this.state.id, courseId: course.key }) }}>
          <View style={styles.cardContainer}>
            <Image style={styles.cardPhoto} source={{ uri: course.thumbnailUrl }} />
            <View style={styles.cardTextContainer}>
              <View style={styles.top_txt_view}>
                <FontAwesomeIcon icon={faVideo} color={'#979797'} size={10} />
                <Text style={styles.video_txt}>videos: {course.videoCount}</Text>
              </View>
              <View style={styles.card_bottom_view}></View>
              <View style={styles.bottom_txt_view}>
                <Text style={styles.card_title}>{course.name}</Text>
                <Text style={styles.card_description}>{self.formatTextEclips(course.description, 30)}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
    if (!paid) { categories_card.splice(1, 0, <TrialButton onPress={() => { navigate('Subscription') }} />); }
    return categories_card;

  }

  formatTextEclips = (text, length = 20) => {
    return text.length > length ? text.slice(0, length) + '...' : text;
  }

  filterSearch(text) {
    //passing the inserted text in textinput
    const newData = this.state.coursesList.filter(function (item) {
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
        colors={['#F3FBF300', '#F3FBF3']}
        startPoint={{ x: 1, y: 0 }}
        endPoint={{ x: 0, y: 1 }}
        style={styles.gradient}
      />
    );
  }
  render() {
    const { formatTextEclips } = this;
    return (
      <>
        {this.state.isLoading ?
          <Loader loading={this.state.isLoading} color="#ff66be" /> :
          <SafeAreaView
            style={styles.container}
            onLayout={this.DetectOrientation}>
            <ImageBackground source={require('../../../Images/Background1.png')} resizeMode='stretch' style={styles.Background} >
              <View style={styles.topContainer}>
                <Image source={{ uri: this.state.top_image_url }} style={styles.top_image} />
                {/* <Image source={Images.logo_white} style={styles.logoImage} /> */}
                <View style={styles.gradient_view}>
                  {this.gradient}
                  <Text style={styles.subtittleText}>{formatTextEclips(this.state.ca_title, 25)}</Text>
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
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                  />
                }
              >
                <View style={styles.centerContainer}>
                  {this.makecoursecard()}
                </View>
              </ScrollView>
            </ImageBackground>
          </SafeAreaView>
        }
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    paid: state.user.paidState,
  }
}
export default connect(mapStateToProps)(CoursesCourseList);


const styles = StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  container: {
    flex: 1,
    backgroundColor: Colors.courses_tab_backgroud,
  },

  topContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
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

  centerContainer: {
  },

  cardContainer: {
    marginTop: perfectSize(20),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: Constants.course_w + Constants.course_border,
    height: Constants.course_h + Constants.course_border,
    borderRadius: Constants.course_radius,
    borderBottomRightRadius: 0,
    backgroundColor: Colors.courses_tab,
  },
  cardPhoto: {
    resizeMode: 'cover',
    width: Constants.course_w,
    height: Constants.course_h,
    borderRadius: Constants.course_radius,
    borderBottomRightRadius: 0,
    opacity: 1
  },
  cardTextContainer: {
    position: 'absolute',
    width: Constants.course_w,
    height: Constants.course_h,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  top_txt_view: {
    marginTop: perfectSize(20),
    marginLeft: perfectSize(20),
    paddingVertical: perfectSize(2),
    paddingHorizontal: perfectSize(5),
    alignSelf: 'flex-start',
    flexDirection: 'row',
    backgroundColor: Colors.category_text_backcolor,
    alignItems: 'center',
    borderRadius: Constants.course_radius * 0.3,
    borderBottomRightRadius: 0,
  },
  video_txt: {
    marginLeft: perfectSize(10),
    fontFamily: Fonts.extrabolditalic,
    fontSize: Constants.small_font,
    color: Colors.fontcolors.white,
  },
  card_bottom_view: {
    width: Constants.course_w,
    height: Constants.course_h * 0.4,
    bottom: 0,
    position: 'absolute',
    backgroundColor: Colors.category_text_backcolor,
    // backgroundColor: 'red',
    borderBottomLeftRadius: Constants.course_radius,
  },
  bottom_txt_view: {
    width: Constants.course_w,
    height: Constants.course_h * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',
    borderBottomLeftRadius: Constants.course_radius,
  },
  card_title: {
    fontFamily: Fonts.bold,
    alignSelf: 'center',
    fontSize: Constants.subtittle_font * 0.9,
    color: Colors.fontcolors.white,
  },
  card_description: {
    fontFamily: Fonts.semibold,
    alignSelf: 'center',
    fontSize: Constants.normal_font,
    color: Colors.fontcolors.white,
  },
  Background: {
    width: '100%',
    height: '100%',
    // alignItems: "center"
  },
});

