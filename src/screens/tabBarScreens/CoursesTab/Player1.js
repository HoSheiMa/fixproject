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
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


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

  formatTextEclips = (text, length = 20) => {
    return text.length > length ? text.slice(0, length) + '...' : text;
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ width: "100%", height: '100%' }}>
          <LinearGradient colors={['#000000', '#0e0314', '#230633']} style={styles.linearGradient}>
            <View style={{height:'100%', justifyContent:'center'}}>
              <TouchableHighlight onPress={() => this.props.navigation.navigate("HomeList")} style={styles.btnContainer}>
                <FontAwesomeIcon icon={faAngleLeft} color="#561E98" size={perfectSize(25)} />
              </TouchableHighlight>
              <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <ImageBackground source={require('../../../Images/PlayRount.png')} resizeMode='stretch' style={styles.SubBackground}>
                  <Image source={require('../../../Images/PlayCat.png')} resizeMode='stretch' style={styles.HeartImage} />
                </ImageBackground>
                <TouchableOpacity style={styles.ExploreBtn} onPress={() => this.props.navigation.navigate("Player2")}>
                  <MaterialCommunityIcons name="pause" size={40} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>
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
    justifyContent: "center",
    alignItems: 'center'
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

  linearGradient: {
    height: '100%',
    width: '100%'
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
    marginTop: perfectSize(20),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: Constants.category_w + Constants.category_border,
    height: Constants.category_h + Constants.category_border,
    borderRadius: Constants.category_radius,
    borderBottomRightRadius: 0,
    backgroundColor: Colors.courses_tab,
  },
  cardPhoto: {
    resizeMode: 'cover',
    width: Constants.category_w,
    height: Constants.category_h,
    borderRadius: Constants.category_radius,
    borderBottomRightRadius: 0,
    opacity: 1
  },
  cardTextContainer: {
    width: Constants.category_w,
    height: Constants.category_h,
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
    alignSelf: 'center',
    backgroundColor: Colors.category_text_backcolor,
    borderRadius: Constants.category_radius * 0.4,
    borderBottomRightRadius: 0,
  },
  card_title: {
    fontFamily: Fonts.black,
    textAlign: 'center',
    fontSize: Constants.subtittle_font * 0.9,
    color: Colors.fontcolors.white,
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
    alignItems: "center",
    justifyContent: 'center'
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
  btnContainer: {
    width: perfectSize(27),
    height: perfectSize(27),
    alignItems: 'center',
    position: "absolute",
    left: perfectSize(15),
    backgroundColor: "#707070",
    borderRadius: 13.5,
    justifyContent: "center",
    alignItems: "center",
    top: 20
  },
  HeartImage: {
    height: 188,
    width: 188,
    borderRadius: 94
  },
  ExploreBtn: {
    width: 72,
    height: 72,
    backgroundColor: '#707070',
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80
  },
  ExploreTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  SubBackground: {
    width: 270,
    height: 270,
    justifyContent: "center",
    alignItems: 'center'
  }

});

