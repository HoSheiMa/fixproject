import React, { Component, Fragment } from 'react';
import { SafeAreaView, View, Text, Image, TouchableHighlight, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
// import { users } from '../../../data/DataArrays'
import { connect } from 'react-redux';
import { Images, Colors, Constants, Fonts, Layoutsd } from '@utils'
import BackButton from '../../../component/SignUpBackBt';
import ImagePicker from 'react-native-image-picker';
import { create, PREDEF_RES } from 'react-native-pixel-perfect';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const perfectSize = create(PREDEF_RES.iphoneX.dp)
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
const SCREEN_HEIGHT = width < height ? height : width;


class About extends Component {
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
            <LinearGradient colors={['#000000', '#000000']} style={styles.linearGradient1}>
              <View style={styles.HeaderArea}>
                <TouchableHighlight onPress={() => this.props.navigation.goBack()} style={styles.btnContainer}>
                  <FontAwesomeIcon icon={faAngleLeft} color={'#73219F'} size={perfectSize(20)} />
                </TouchableHighlight>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: "bold", marginLeft: 70 }}>About</Text>
              </View>
            </LinearGradient>
          </View>
          <View style={{ marginLeft: 50, marginTop: 30 }}>
            <Text style={{ fontSize: 14, color: '#fff', marginTop: 10 }}>App Version:</Text>
            <Text style={{ fontSize: 14, color: '#fff', marginTop: 10 }}>Build Number:</Text>
            <Text style={{ fontSize: 14, color: '#fff', marginTop: 10 }}>Third Parties:</Text>
          </View>
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
export default connect(mapStateToProps)(About);


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
  linearGradient: {
    height: '100%',
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
});
