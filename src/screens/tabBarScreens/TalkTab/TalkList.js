import React, { Component } from 'react';
import { FlatList, Platform, TextInput, TouchableHighlight, View, StyleSheet, Dimensions, Text, Image, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../../../component/SliderEntry/Styles';
import SliderEntry from '../../../component/SliderEntry/SliderEntry';
// import { Talks } from '../../../../data/DataArrays';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Firebase from '../../../../config/Firebase';
import { Images, Colors, Constants, Fonts, Layoutsd } from '@utils'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Icon from 'react-native-vector-icons/FontAwesome'


import Logo from '../../../component/Logo'
import TrialButton from '../../../component/TrialButton'
import { create, PREDEF_RES } from 'react-native-pixel-perfect'
import { ScrollView } from 'react-native-gesture-handler';
const perfectSize = create(PREDEF_RES.iphoneX.dp)

const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
const SCREEN_HEIGHT = width < height ? height : width;

const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#B721FFbb',
  background2: '#21D4FDbb'
};


const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;

class TalkList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerMode: 'none',
      title: ``,
      headerTransparent: 'true',
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      podcasts: [],
      disp_list: [],
      search_text: '',
    };
    this._rendermakecard = this._rendermakecard.bind(this);
    this.TalkRef = null;
  }

  // _renderItem({ item, index }) {
  //   return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  // }

  componentDidMount() {
    const self = this;
    this.TalkRef = Firebase.database().ref('podcasts/');
    this.TalkRef.on('value', function (snapshot) {
      let talks = [];
      snapshot.forEach(function (childSnapshot) {
        talks.push({
          key: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      self.setState({
        podcasts: talks.reverse(),
        disp_list: talks,
      });
    });
  }

  navigateTalk = (item) => {
    // console.log('index========', index);
    this.props.navigation.navigate('TalkDetail', { talk_id: item.key });
  }

  _renderItemWithParallax = ({ item, index }, parallaxProps) => {
    const self = this;

    return (
      <SliderEntry
        // onPress={() => { alert(`You've clicked '${item}'`); }}
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
        navigateTalk={self.navigateTalk.bind(self, item)}
      />
    );
  }

  _renderLightItem({ item, index }) {
    return <SliderEntry data={item} even={false} />;
  }

  _renderDarkItem({ item, index }) {
    return <SliderEntry data={item} even={true} />;
  }

  mainExample(number, title) {
    return (
      <View style={styles.exampleContainer}>
        {/* <Text style={styles.title}>{`Example ${number}`}</Text> */}
        {/* <Text style={styles.subtitle}>{title}</Text> */}
        <Carousel
          ref={c => this._slider1Ref = c}
          data={this.state.podcasts}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.8}
          inactiveSlideOpacity={0.4}
          // inactiveSlideShift={20}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={2}
          autoplay={false}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
        />
      </View>
    );
  }
  _rendermakecard({ item, index }) {
    const { navigate } = this.props.navigation;
    return (
      // <TouchableOpacity key={item.id} onPress={() => { navigate('TalkDetail', { talk_id: item.key }) }}>
      <TouchableOpacity key={item.id} onPress={() => { navigate('Player1') }}>
        <View style={styles.cardContainer}>
          <View style={{ alignItems: 'center', flexDirection: 'row', padding: 10, }}>
            <View style={{ flex: 3, height: 120, alignItems: 'center', paddingLeft: 10 }}>
              <Image style={styles.cardPhoto} source={{ uri: item.thumbnail }} />
            </View>
            <View style={{ flex: 7, paddingLeft: 20 }}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Podcast Title</Text>
              <Text style={{ color: '#fff', fontSize: 12 }}>Guest Name</Text>
              <Text style={{ color: "#BDBDBD", fontSize: 12 }}>Brief description of the podcast. Brief description of the podcast. Brief description of the podcast. </Text>
              <Text style={{ color: '#fff', fontSize: 12 }}>20 min</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.heartIcon}>
            <Icon name="heart-o" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
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

  formatTextEclips = (text, length = 20) => {
    return text.length > length ? text.slice(0, length) + '...' : text;
  }

  makecardgroup() {
    return (
      <View style={styles.partContainer}>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={this.state.disp_list}
          renderItem={this._rendermakecard}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    );
  }

  get gradient() {
    return (
      <LinearGradient
        colors={[colors.background1, colors.background2]}
        startPoint={{ x: 1, y: 0 }}
        endPoint={{ x: 0, y: 1 }}
        style={styles.gradient}
      />
    );
  }


  filterSearch(text) {
    //passing the inserted text in textinput
    const newData = this.state.podcasts.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      disp_list: newData,
      search_text: text,
    });
  }

  render() {
    // const example1 = this.mainExample();
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient colors={['#000000', '#0e0314', '#230633']} style={styles.linearGradient}>
          <View style={styles.topContainer}>
            <Image source={require('../../../Images/Podcast_top.png')} style={styles.top_image} />
            <LinearGradient colors={['#000000', '#561E98']} style={styles.linearGradient1}>
              <View style={styles.HeaderArea}>
                <TouchableHighlight onPress={() => this.props.navigation.goBack()} style={styles.btnContainer}>
                  <FontAwesomeIcon icon={faAngleLeft} color={'#73219F'} size={perfectSize(20)} />
                </TouchableHighlight>
                <Text style={{ color: '#fff', fontSize: 16, marginLeft: 60 }}>PODCAST</Text>
              </View>
            </LinearGradient>
          </View>
          <Text style={{ color: '#fff', margin: 30 }}> Brief description of the podcast. Brief description of the podcast. Brief description of the podcast. Brief description of the podcast.</Text>
          <ScrollView>
            <View style={styles.bottomgroup}>
              {this.makecardgroup()}
            </View>
          </ScrollView>
        </LinearGradient>

      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    paid: state.user.paidState,
  }
}

export default connect(mapStateToProps)(TalkList)


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.black
  },
  container: {
    flex: 1,
    backgroundColor: Colors.talks_tab_background,
  },

  topContainer: {
    flexDirection: 'column',
    // alignItems: 'center',
    // width: '100%',
    // height: 240,
    // borderBottomRightRadius: perfectSize(60),
    // borderBottomLeftRadius: perfectSize(60),
    // backgroundColor: Colors.talks_tab_background,
    flexDirection: 'column',

  },

  linearGradient: {
    height: '100%',
    width: '100%'
  },
  
  subtittleText: {
    fontFamily: Fonts.extrabold,
    fontSize: Constants.subtittle_font,
    color: Colors.basic,
    marginLeft: perfectSize(20),
  },

  searchinput: {
    width: Constants.search_w - perfectSize(40),
    height: Constants.search_h,
    fontSize: Constants.normal_font,
    textAlign: 'center',
  },

  backgroudimage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },

  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  scrollview: {
    flex: 1
  },
  exampleContainer: {
    // paddingVertical: perfectSize(5)
  },
  exampleContainerDark: {
    backgroundColor: colors.black
  },
  exampleContainerLight: {
    backgroundColor: 'white'
  },

  slider: {
    // marginTop: perfectSize(5),
    overflow: 'visible' // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: perfectSize(15) // for custom animation
  },

  bottomgroup: {
    width: Constants.talks_bottom_w,
    alignSelf: 'center',
  },
  partContainer: {
    // flex: 1,
    alignSelf: 'center',
  },

  cardContainer: {
    marginHorizontal: Constants.talks_card_margin / 2,
    marginVertical: 10,
    width: SCREEN_WIDTH - 60,
    backgroundColor: "#73219F",
    borderRadius: Constants.talks_card_radius,
  },
  cardPhotoView: {
    width: 20,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: Constants.talks_card_radius
  },

  cardPhoto: {
    width: 100,
    height: 100,
    borderRadius: Constants.talks_card_radius,
  },
  cardTitle: {
    alignSelf: 'center',
    fontFamily: Fonts.semibold,
    fontSize: Constants.small_font,
    color: Colors.fontcolors.strong,
  },
  cardDescription: {
    alignSelf: 'center',
    fontFamily: Fonts.semibold,
    fontSize: Constants.small_font,
    color: Colors.fontcolors.little,
  },
  linearGradient1: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'absolute',
    top: 0,
    width: '100%'
  },
  Background: {
    width: '100%',
    height: '100%',
    // alignItems: "center"
  },
  HeaderArea: {
    flexDirection: 'row',
    alignItems: "center",
    marginTop: 10,
    height: 49,
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
    alignItems: "center"
  },
  top_image: {
    // position: 'absolute',
    width: Constants.video_w,
    height: Constants.video_h,
    resizeMode: 'cover',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  heartIcon: {
    position: 'absolute',
    top: 20,
    right: 20
  }
});

