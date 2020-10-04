import React, { Component, Fragment } from 'react';
import { SafeAreaView, View, Text, Image, TouchableHighlight, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import BackButton from '../../../component/SignUpBackBt';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
// import { users } from '../../../data/DataArrays'
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { Images, Colors, Constants, Fonts, Layoutsd } from '@utils'
import { create, PREDEF_RES } from 'react-native-pixel-perfect';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const perfectSize = create(PREDEF_RES.iphoneX.dp)
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
const SCREEN_HEIGHT = width < height ? height : width;


class Terms extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: ``,
      headerTransparent: 'true',
      headerLeft: () => <BackButton onPress={() => { navigation.goBack(); }} />
    };
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient colors={['#000000', '#0e0314', '#230633']} style={styles.linearGradient}>
          <View style={styles.topContainer}>
            <LinearGradient colors={['#000000', '#561E98']} style={styles.linearGradient1}>
              <View style={styles.HeaderArea}>
                <Text style={{ color: '#fff', fontSize: 16, marginLeft: 10, textAlign: 'center', width: SCREEN_WIDTH - 20 }}>Terms and Conditions</Text>
                <TouchableHighlight onPress={() => this.props.navigation.goBack()} style={styles.btnContainer1}>
                  <AntDesignIcon name="close" color="gray" size={perfectSize(15)} />
                </TouchableHighlight>
              </View>
            </LinearGradient>
          </View>
          <ScrollView>
            <View style={{ marginLeft: 30, marginRight: 30, marginTop: 50, alignItems: 'center' }}>
              <Text style={{ fontSize: 14, color: '#fff', marginTop: 20, textAlign: 'center', textAlign: 'center' }}>Lorern iosum dolor sit amet, consetetur sadipscing dlitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo do dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing dlitr, sed diam nonumy eirmod tempor inviduant ut labore et dolore magna aliquyam erat, sed diam voluptua.</Text>
              <Text style={{ fontSize: 14, color: '#fff', marginTop: 20, textAlign: 'center' }}>Lorern iosum dolor sit amet, consetetur sadipscing dlitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo do dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing dlitr, sed diam nonumy eirmod tempor inviduant ut labore et dolore magna aliquyam erat, sed diam voluptua.</Text>
              <Text style={{ fontSize: 14, color: '#fff', marginTop: 20, textAlign: 'center' }}>Lorern iosum dolor sit amet, consetetur sadipscing dlitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo do dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing dlitr, sed diam nonumy eirmod tempor inviduant ut labore et dolore magna aliquyam erat, sed diam voluptua.</Text>
            </View>
          </ScrollView>
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
export default connect(mapStateToProps)(Terms);


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
    right: perfectSize(25),
    backgroundColor: "#707070",
    borderRadius: 13.5,
    justifyContent: "center",
    alignItems: "center"
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
  linearGradient: {
    height: '100%',
    width: '100%'
  },
});
