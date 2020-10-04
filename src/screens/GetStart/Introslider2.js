import React from 'react';
import { RefreshControl, View, Text, Image, ScrollView, TouchableOpacity, TouchableHighlight, ImageBackground, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Images, Colors, Constants, Fonts, Layoutsd } from '@utils'
import { create, PREDEF_RES } from 'react-native-pixel-perfect';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import LinearGradient from 'react-native-linear-gradient';


const perfectSize = create(PREDEF_RES.iphoneX.dp);

class Introslider2 extends React.Component {
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
  onSwipeLeft(gestureState) {

    this.props.navigation.navigate("Introslider3")
  }

  back() {
    this.props.navigation.navigate("Introslider1")
  }

  onSwipeRight(gestureState) {
    this.props.navigation.goBack()
  }
  render() {
    const config = {
      velocityThreshold: 0.1,
      directionalOffsetThreshold: 30
    };
    return (
      <GestureRecognizer
        onSwipeLeft={(state) => this.onSwipeLeft(state)}
        onSwipeRight={(state) => this.onSwipeRight(state)}
        config={config}
        style={styles.container}>
        <LinearGradient colors={['#000000','#0e0314', '#230633']} style={styles.linearGradient}>
          <View style={styles.Background} >
            <View style={{ alignItems: 'center', width: '100%', flex: 1 }}>
              <Image source={require('../../Images/Mask2.png')} resizeMode='stretch' style={styles.HeartImage} />
              <View style={{ flexDirection: 'row', justifyContent: "space-between", width: '90%', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { this.back() }}>
                  <Image style={styles.stateImage} resizeMode="stretch" source={require('../../Images/PreviousIcon.png')} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginTop: 10 }}>Guided Meditation</Text>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate("Introslider3") }}>
                  <Image style={styles.stateImage} resizeMode="stretch" source={require('../../Images/NextIcon.png')} />
                </TouchableOpacity>
              </View>
              <Text style={styles.destxt} >Let us guide you on this journey through your emotions on this sound experience. Listen to the meditation that resonate with your feelings and emotions on that day.</Text>
              <Image source={require("../../Images/sliderImage2.png")} resizeMode="stretch" style={styles.sliderImage} />
              <TouchableOpacity style={styles.ExploreBtn} onPress={() => this.props.navigation.navigate("SignUp")}>
                <Text style={styles.ExploreTxt}>Get Started</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.LoginBtn} onPress={() => this.props.navigation.navigate("SignIn")}>
                <Text style={styles.ExploreTxt1}>Existing User? Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </GestureRecognizer>
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
export default connect(mapStateToProps)(Introslider2)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.courses_tab_backgroud,
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
    justifyContent: 'center',
    position: 'absolute',
    // backgroundColor: '#000'
  },
  HeaderArea: {
    flexDirection: 'row',
    alignItems: "center",
    marginTop: 10,
    height: 49,
    justifyContent: "center",
  },
  linearGradient: {
    height:'100%',
    width:'100%'
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
    marginTop: 100,
    width: 324,
    height: 233,
  },
  ExploreBtn: {
    width: '85%',
    height: 46,
    backgroundColor: '#73219F',
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 80
  },
  ExploreTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  ExploreTxt1: {
    fontSize: 16,
    color: 'white'
  },
  LoginBtn: {
    position: 'absolute',
    bottom: 40
  },
  stateImage: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  destxt: {
    fontSize: 15,
    color: 'white',
    marginTop: 35,
    textAlign: 'center',
    width: "85%",
    lineHeight: 22
  },
  sliderImage: {
    width: 38,
    height: 6,
    marginTop: 45
  }

});

