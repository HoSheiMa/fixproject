import React, { Component } from 'react';
import { SafeAreaView, View, Text, Image, TouchableHighlight, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
// import { users } from '../../../data/DataArrays'
import { Images, Colors, Constants, Fonts, Layoutsd } from '@utils'
import BackButton from '../../../component/SignUpBackBt';
import { connect } from 'react-redux';
import { create, PREDEF_RES } from 'react-native-pixel-perfect';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const perfectSize = create(PREDEF_RES.iphoneX.dp)
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
const SCREEN_HEIGHT = width < height ? height : width;


class Settings extends Component {
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
                <Text style={{ color: '#fff', fontSize: 20, marginLeft: 70, fontWeight: "bold" }}>Settings</Text>
              </View>
            </LinearGradient>
          </View>
          <View style={{ alignItems: 'center', marginTop: 30 }}>
            <TouchableHighlight onPress={() => { alert(123) }}>
              <View style={styles.SelectArea1}>
                <Text style={{ fontSize: 14, color: '#fff', }}>Help and support</Text>
                <AntDesignIcon name='right' size={16} color='#fff' style={{ position: 'absolute', right: 0 }} />
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => { this.props.navigation.navigate("Terms") }}>
              <View style={styles.SelectArea1}>
                <Text style={{ fontSize: 14, color: '#fff', }}>Terms and conditions</Text>
                <AntDesignIcon name='right' size={16} color='#fff' style={{ position: 'absolute', right: 0 }} />
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => { this.props.navigation.navigate("Privacy") }}>
              <View style={styles.SelectArea1}>
                <Text style={{ fontSize: 14, color: '#fff', }}>Privacy policy</Text>
                <AntDesignIcon name='right' size={16} color='#fff' style={{ position: 'absolute', right: 0 }} />
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => { this.props.navigation.navigate("About") }}>
              <View style={styles.SelectArea1}>
                <Text style={{ fontSize: 14, color: '#fff', }}>About</Text>
                <AntDesignIcon name='right' size={16} color='#fff' style={{ position: 'absolute', right: 0 }} />
              </View>
            </TouchableHighlight>
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
export default connect(mapStateToProps)(Settings);


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
  linearGradient: {
    height: '100%',
    width: '100%'
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
  SelectArea1: {
    height: 40,
    width: SCREEN_WIDTH - 50,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    borderBottomWidth: 0.3,
    borderBottomColor: '#707070'
  }
});
