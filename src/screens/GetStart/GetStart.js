import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image, SafeAreaView, Dimensions } from 'react-native';
import { Images, Constants, Fonts } from '@utils'
import { create, PREDEF_RES } from 'react-native-pixel-perfect'
import Carousel from 'react-native-looped-carousel';

const perfectSize = create(PREDEF_RES.iphoneX.dp)
const { width, height } = Dimensions.get('window');

export default class GetStart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: { width, height },
    };
  }

  _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout;
    this.setState({ size: { width: layout.width, height: layout.height } });
  }
  
  goToLogin = () => this.props.navigation.navigate('SignIn');

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Carousel
          delay={3000}
          style={this.state.size}
          autoplay
          bullets
          bulletStyle={styles.bullets}
          chosenBulletStyle={styles.bullets}
        >
          <View style={[{ backgroundColor: '#96EDFF' }, this.state.size]}>
            <Image source={Images.startpage_image1} style={styles.backgroundImage} />
            <View style={styles.text_area}>
              <Text style={styles.tittle}>Gong Bath</Text>
              <Text style={styles.description}>I took a gong bang to see if it's a was better way to chill than gorgin on Net-flix. Created deep relaxation and clears the mind</Text>
            </View>
          </View>
          <View style={[{ backgroundColor: '#FFC8C8' }, this.state.size]}>
            <Image source={Images.startpage_image2} style={styles.backgroundImage} />
            <View style={styles.text_area}>
              <Text style={styles.tittle}>Sound Bath</Text>
              <Text style={styles.description}>I took a gong bang to see if it's a was better way to chill than gorgin on Net-flix. Created deep relaxation and clears the mind</Text>
            </View>
          </View>
          <View style={[{ backgroundColor: '#B1F1CD' }, this.state.size]}>
            <Image source={Images.startpage_image3} style={styles.backgroundImage} />
            <View style={styles.text_area}>
              <Text style={styles.tittle}>Breathwork</Text>
              <Text style={styles.description}>I took a gong bang to see if it's a was better way to chill than gorgin on Net-flix. Created deep relaxation and clears the mind</Text>
            </View>
          </View>
          <View style={[{ backgroundColor: '#FFEFA7' }, this.state.size]}>
            <Image source={Images.startpage_image4} style={styles.backgroundImage} />
            <View style={styles.text_area}>
              <Text style={styles.tittle}>NLP Meditation</Text>
              <Text style={styles.description}>I took a gong bang to see if it's a was better way to chill than gorgin on Net-flix. Created deep relaxation and clears the mind</Text>
            </View>
          </View>
          <View style={[{ backgroundColor: '#CAB3FF' }, this.state.size]}>
            <Image source={Images.startpage_image5} style={styles.backgroundImage} />
            <View style={styles.text_area}>
              <Text style={styles.tittle}>Chat with Users</Text>
              <Text style={styles.description}>I took a gong bang to see if it's a was better way to chill than gorgin on Net-flix. Created deep relaxation and clears the mind</Text>
            </View>
          </View>
        </Carousel>
        <TouchableOpacity style={styles.startBt} onPress={() => this.goToLogin()}>
          <Text style={styles.startBt_txt}>Start</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  bullets: {
    marginTop: perfectSize(-140),
  },
  backgroundImage: {
    marginTop: perfectSize(-20),
    width: '100%',
    height: '100%',
    resizeMode: 'cover',//'contain',//'stretch',
  },
  text_area: {
    marginTop: -Constants.screen_h,
    height: Constants.screen_h,
    width: Constants.screen_w,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: perfectSize(50),
  },
  tittle: {
    marginTop: perfectSize(400),
    fontFamily: Fonts.black,
    fontSize: Constants.subtittle_font,
    color: '#08111B',
  },
  description: {
    marginTop: perfectSize(10),
    fontFamily: Fonts.regular,
    fontSize: Constants.description_font,
    textAlign: 'justify',
    color: '#898F97',
  },
  startBt: {
    height: Constants.button_h,
    width: Constants.button_w,
    backgroundColor: '#3369FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: perfectSize(-80),
    borderRadius: Constants.button_radius,
  },
  startBt_txt: {
    fontFamily: Fonts.bold,
    fontSize: Constants.normal_font,
    letterSpacing: 2,
    color: 'white',
  }
})
