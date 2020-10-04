import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, Switch, Dimensions, StyleSheet, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faTrashAlt, faChartPie, faDollarSign } from '@fortawesome/free-solid-svg-icons';
// import { users } from '../../../data/DataArrays'
import { connect } from 'react-redux';
import { Images, Colors, Constants, Fonts, Layoutsd } from '@utils'
import { create, PREDEF_RES } from 'react-native-pixel-perfect'
import Firebase from '../../../../config/Firebase';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import InviteFriend from './InviteFriend';
import Modal from 'react-native-modalbox';
import Slider from 'react-native-slider';



const perfectSize = create(PREDEF_RES.iphoneX.dp)
const icon_size = perfectSize(20);

const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
const SCREEN_HEIGHT = width < height ? height : width;
var screen = Dimensions.get('window');

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      isEnabled: false,
    };
  }

  handleSignout = async () => {
    try {
      await Firebase.auth().signOut();
      await GoogleSignin.signOut();
      this.props.navigation.navigate("SignIn");
    } catch (error) {
      console.log(error);
    }
  };

  toggleSwitch = () => {
    this.setState({ isEnabled: !this.state.isEnabled })
  }

  formatTextEclips = (text, length = 20) => {
    return text.length > length ? text.slice(0, length) + '...' : text;
  }

  toggleModal(visible) {
    this.setState({ modalVisible: true });
  }

  renderList() {
    var list = [];

    for (var i = 0; i < 50; i++) {
      list.push(<Text style={styles.text} key={i}>Elem {i}</Text>);
    }

    return list;
  }

  render() {
    const { navigate } = this.props.navigation;
    const { username, email, lastest_date, paid } = this.props
    console.log('===', username, email);
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient colors={['#000000', '#0e0314', '#230633']} style={styles.linearGradient}>
          <View style={styles.topContainer}>
            <LinearGradient colors={['#000000', '#000000']} style={styles.linearGradient1}>
              <View style={styles.HeaderArea}>
                <TouchableHighlight onPress={() => this.props.navigation.goBack()} style={styles.btnContainer}>
                  <FontAwesomeIcon icon={faAngleLeft} color={'#73219F'} size={perfectSize(20)} />
                </TouchableHighlight>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginLeft: 60 }}>More</Text>
              </View>
            </LinearGradient>
          </View>
          <ScrollView>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ color: '#fff', marginLeft: 10, marginTop: 15, fontSize: 16 }}>Milestones</Text>
              <ScrollView horizontal style={{ marginTop: 15 }}>
                <View style={{ width: 100, height: 100, alignItems: 'center', position: 'relative', margin: 5 }}>
                  <Image style={styles.TopImage} source={require('../../../Images/Mask2.png')} />
                  <Text style={styles.TopTxt1}>First Meditaion</Text>
                </View>
                <View style={{ width: 100, height: 100, alignItems: 'center', position: 'relative', margin: 5 }}>
                  <Image style={styles.TopImage} source={require('../../../Images/NightImage.png')} />
                  <Text style={styles.TopTxt1}>Night Owl</Text>
                </View>
                <View style={{ width: 100, height: 100, alignItems: 'center', position: 'relative', margin: 5 }}>
                  <Image style={styles.TopImage} source={require('../../../Images/VictorImage.png')} />
                  <Text style={styles.TopTxt1}>Victorious</Text>
                </View>
                <View style={{ width: 100, height: 100, alignItems: 'center', position: 'relative', margin: 5 }}>
                  <Image style={styles.TopImage} source={require('../../../Images/weakerImage.png')} />
                  <Text style={styles.TopTxt1}>All weaker</Text>
                </View>
              </ScrollView>
            </View>
            <TouchableHighlight style={{ alignItems: 'center', marginTop: 10 }} onPress={() => { this.props.navigation.navigate("Subscription") }}>
              <Text style={styles.UpgradeBtn}>Upgrade to Premium Now!</Text>
            </TouchableHighlight>
            <Text style={{ color: '#fff', marginLeft: 20, marginTop: 10, fontSize: 16 }}>Progress</Text>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <View style={{ width: 100, alignItems: 'center', marginLeft: 5, marginRight: 5 }}>
                  <Text style={{ color: '#73219F', fontSize: 20, textAlign: 'center' }}>0</Text>
                  <Text style={{ color: '#73219F', fontSize: 14, textAlign: 'center' }}>Current</Text>
                  <Text style={{ color: '#73219F', fontSize: 14, textAlign: 'center' }}>Day Streak</Text>
                </View>
                <View style={{ width: 100, alignItems: 'center', marginLeft: 5, marginRight: 5 }}>
                  <Text style={{ color: '#444BFD', fontSize: 20, textAlign: 'center' }}>3</Text>
                  <Text style={{ color: '#444BFD', fontSize: 14, textAlign: 'center' }}>Total</Text>
                  <Text style={{ color: '#444BFD', fontSize: 14, textAlign: 'center' }}>Sessions</Text>
                </View>
                <View style={{ width: 100, alignItems: 'center', marginLeft: 5, marginRight: 5 }}>
                  <Text style={{ color: '#CB36D8', fontSize: 20, textAlign: 'center' }}>32</Text>
                  <Text style={{ color: '#CB36D8', fontSize: 14, textAlign: 'center' }}>Total</Text>
                  <Text style={{ color: '#CB36D8', fontSize: 14, textAlign: 'center' }}>Minutes</Text>
                </View>
              </View>
            </View>

            <TouchableHighlight style={{ alignItems: 'center', marginTop: 25 }}>
              <View style={{ backgroundColor: '#561E98', borderRadius: 10, height: 41, width: SCREEN_WIDTH - 50, flexDirection: 'row', alignItems: 'center' }}>
                <AntDesignIcon name='bells' size={25} color='#fff' style={{ marginLeft: 15 }} />
                <Text style={{ fontSize: 16, color: '#fff', marginLeft: 15 }}>Meditation reminder</Text>
                <View style={{ marginLeft: 40 }}>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={this.state.isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={this.toggleSwitch}
                    value={this.state.isEnabled}
                  />
                </View>
              </View>

            </TouchableHighlight>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
              <TouchableHighlight onPress={() => this.refs.modal6.open()}>
                <View style={styles.SelectBtn}>
                  <Text style={{ fontSize: 14, color: '#fff', }}>Invite Friends</Text>
                  <AntDesignIcon name='right' size={16} color='#fff' style={{ position: 'absolute', right: 0 }} />
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => { this.props.navigation.navigate("Rate") }}>
                <View style={styles.SelectBtn}>
                  <Text style={{ fontSize: 14, color: '#fff', }}>Rate our app</Text>
                  <AntDesignIcon name='right' size={16} color='#fff' style={{ position: 'absolute', right: 0 }} />
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => { this.props.navigation.navigate("Settings") }}>
                <View style={styles.SelectBtn}>
                  <Text style={{ fontSize: 14, color: '#fff', }}>Settings</Text>
                  <AntDesignIcon name='right' size={16} color='#fff' style={{ position: 'absolute', right: 0 }} />
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => { this.props.navigation.navigate("Account") }}>
                <View style={{ ...styles.SelectBtn, borderBottomWidth: 0 }}>
                  <Text style={{ fontSize: 14, color: '#fff', }}>Account</Text>
                  <AntDesignIcon name='right' size={16} color='#fff' style={{ position: 'absolute', right: 0 }} />
                </View>
              </TouchableHighlight>
            </View>
          </ScrollView>
          <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal6"} swipeArea={20}>
            <ScrollView style={{ backgroundColor: '#1d1d1d', width: '100%' }}>
              <View style={{ width: screen.width }}>
                <View style={styles.ModalTop}>
                  <Image source={require('../../../Images/GreenBorad.png')} resizeMode="stretch" style={styles.Greenborad} />
                  <View>
                    <Text style={{ color: 'white', fontSize: 15 }}>Check out Inner Wonders</Text>
                    <Text style={{ color: '#707070', fontSize: 13 }}>Come meditate with me</Text>
                  </View>
                  <TouchableHighlight onPress={() => this.refs.modal6.close()} style={styles.btnContainer1}>
                    <AntDesignIcon name="close" color="gray" size={perfectSize(15)} />
                  </TouchableHighlight>
                </View>
                <View style={styles.ModalTop1}>
                  <View style={styles.ImageArea}>
                    <Image source={require('../../../Images/PersonImage1.png')} resizeMode="stretch" style={styles.Greenborad1} />
                    <Text style={styles.ImageTxt}>Sandy Wilder</Text>
                  </View>
                  <View style={styles.ImageArea}>
                    <Image source={require('../../../Images/PersonImage2.png')} resizeMode="stretch" style={styles.Greenborad1} />
                    <Text style={styles.ImageTxt}>Chris</Text>
                  </View>
                  <View style={styles.ImageArea}>
                    <Image source={require('../../../Images/PersonImage3.png')} resizeMode="stretch" style={styles.Greenborad1} />
                    <Text style={styles.ImageTxt}>Sandy and</Text>
                  </View>
                  <View style={styles.ImageArea}>
                    <Image source={require('../../../Images/PersonImage4.png')} resizeMode="stretch" style={styles.Greenborad1} />
                    <Text style={styles.ImageTxt}>Stephanie</Text>
                  </View>
                  <View style={styles.ImageArea}>
                    <Image source={require('../../../Images/PersonImage1.png')} resizeMode="stretch" style={styles.Greenborad1} />
                    <Text style={styles.ImageTxt}>Stephanie</Text>
                  </View>
                </View>
                <View style={styles.ModalTop1}>
                  <View style={styles.ImageArea}>
                    <Image source={require('../../../Images/wirefire.png')} resizeMode="stretch" style={styles.Greenborad2} />
                    <Text style={styles.ImageTxt}>Airdrop</Text>
                    <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: "red", position: 'absolute', justifyContent: "center", alignItems: 'center', top: -8, right: -8 }}>
                      <Text style={{ color: "white", fontSize: 15 }}>2</Text>
                    </View>
                  </View>
                  <View style={styles.ImageArea}>
                    <Image source={require('../../../Images/MessageImage.png')} resizeMode="stretch" style={styles.Greenborad2} />
                    <Text style={styles.ImageTxt}>Messages</Text>
                  </View>
                  <View style={styles.ImageArea}>
                    <Image source={require('../../../Images/MailImage.png')} resizeMode="stretch" style={styles.Greenborad2} />
                    <Text style={styles.ImageTxt}>Mail</Text>
                  </View>
                  <View style={styles.ImageArea}>
                    <Image source={require('../../../Images/NoteImage.png')} resizeMode="stretch" style={styles.Greenborad2} />
                    <Text style={styles.ImageTxt}>Notes</Text>
                  </View>
                  <View style={styles.ImageArea}>
                    <Image source={require('../../../Images/ReminderImage.png')} resizeMode="stretch" style={styles.Greenborad2} />
                    <Text style={styles.ImageTxt}>Reminders</Text>
                  </View>
                </View>
                <View style={styles.CopyArea}>
                  <Text>Copy</Text>
                  <View style={styles.QuestionArea}>
                    <FontAwesome5Icon name="question" size={15} color="black" />
                  </View>
                </View>
              </View>
            </ScrollView>
          </Modal>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    userkey: state.user.userkey,
    email: state.user.email,
    username: state.user.username,
    paid: state.user.paidState,
    lastest_date: state.user.lastest_date,
    photo_url: state.user.photo_url,
  }
}

export default connect(mapStateToProps)(ProfileScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.profile_tab_backgroud,
  },
  topcontainer: {
    height: Constants.profile_panel_th,
    width: Constants.profile_panel_w,
    alignSelf: 'center',
    borderBottomRightRadius: Constants.profile_panel_radius,
    borderBottomLeftRadius: Constants.profile_panel_radius,
    borderColor: '#060D1577',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  linearGradient1: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
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
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal4: {
    height: 400
  },
  Greenborad: {
    width: 40,
    height: 40,
    borderRadius: 2,
    marginLeft: 15,
    marginRight: 15
  },
  Greenborad1: {
    width: 62,
    height: 62,
  },
  linearGradient: {
    height: '100%',
    width: '100%'
  },
  Greenborad2: {
    width: 62,
    height: 62,
    borderRadius: 4,
  },
  btnContainer1: {
    width: perfectSize(27),
    height: perfectSize(27),
    alignItems: 'center',
    position: "absolute",
    right: perfectSize(15),
    backgroundColor: "#707070",
    borderRadius: 13.5,
    justifyContent: "center",
    alignItems: "center"
  },
  ModalTop: {
    height: 72,
    backgroundColor: '#1d1d1d',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.3,
    borderBottomColor: '#D8D8D8'
  },
  ModalTop1: {
    height: 128,
    backgroundColor: '#1d1d1d',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.3,
    borderBottomColor: '#D8D8D8',
    paddingLeft: 5
  },
  ImageArea: {
    marginHorizontal: 10,
    alignItems: 'center'
  },
  ImageTxt: {
    color: 'white',
    fontSize: 11,
    marginTop: 10
  },
  CopyArea: {
    width: '92%',
    backgroundColor: '#707070',
    marginLeft: "4%",
    height: 51,
    marginTop: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  QuestionArea: {
    width: 20,
    height: 20,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: 'center',
    borderColor: 'black'
  },
  TopImage: {
    width: 89,
    height: 89,
    borderRadius: 45,
    borderColor: '#561E98',
    borderWidth: 2
  },
  TopTxt1: {
    fontSize: 12,
    color: '#561E98',
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#fff',
    borderRadius: 3,
    width: 100,
    textAlign: 'center'
  },
  UpgradeBtn: {
    fontSize: 18,
    color: '#fff',
    backgroundColor: '#73219F',
    borderRadius: 25,
    height: 50,
    width: SCREEN_WIDTH - 100,
    textAlign: 'center',
    paddingTop: 12
  },
  SelectBtn: {
    height: 35,
    width: SCREEN_WIDTH - 50,
    marginTop: 20,
    paddingBottom: 0,
    flexDirection: 'row',
    borderBottomColor: 'white',
    borderBottomWidth: 0.2
  }
});