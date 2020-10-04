import React, { Component } from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faUser, faSignOutAlt, faTrashAlt, faChartPie, faClock, faDollarSign } from '@fortawesome/free-solid-svg-icons';
// import { users } from '../../../data/DataArrays'
import { connect } from 'react-redux';
import { Images, Colors, Constants, Fonts, Layoutsd } from '@utils'
import BackButton from '../../../component/SignUpBackBt';
import { create, PREDEF_RES } from 'react-native-pixel-perfect'

const perfectSize = create(PREDEF_RES.iphoneX.dp)
const icon_size = perfectSize(20);

class Progress extends Component {
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
      <View style={styles.container}>
        <View style={styles.topcontainer}>
          <View style={styles.upgroup}>
            <View style={styles.txtarea}>
              <Text style={styles.hello}>Hello,</Text>
              <Text style={styles.name}>{this.props.username}!</Text>
              <Text style={styles.email}>{this.props.email}</Text>
            </View>
            <Image source={{ uri: this.props.photo_url }} style={styles.profileImage} />
          </View>
          <View style={styles.lineBar} />
          <View style={styles.downgroup}>
            <View style={styles.txtgroup}>
              <Text style={styles.title}>Latest open:</Text>
              <Text style={styles.valuetxt}>{this.props.lastest_date}</Text>
            </View>
            <View style={styles.txtgroup}>
              <Text style={styles.title}>Membership</Text>
              <Text style={styles.valuetxt}>{this.props.paid ? 'Paid' : 'Free'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomcontainer}>
          <View style={styles.line_view}>
            <FontAwesomeIcon icon={faClock} size={icon_size} color={'#000'} />
            <Text style={styles.line_title}>Last practice: </Text>
            <Text style={styles.line_content}>Saturday, Jan 22, 2020</Text>
          </View>
          <View style={styles.line_view}>
            <FontAwesomeIcon icon={faClock} size={icon_size} color={'#000'} />
            <Text style={styles.line_title}>Daily Average Time: </Text>
            <Text style={styles.line_content}>8 mins</Text>
          </View>
          <View style={styles.line_view}>
            <FontAwesomeIcon icon={faClock} size={icon_size} color={'#000'} />
            <Text style={styles.line_title}>Daily Consecutive Days: </Text>
            <Text style={styles.line_content}>2 days</Text>
          </View>
          <View style={styles.line_view}>
            <FontAwesomeIcon icon={faClock} size={icon_size} color={'#000'} />
            <Text style={styles.line_title}>Consecutive Weeks: </Text>
            <Text style={styles.line_content}>1 weeks</Text>
          </View>
          <View style={styles.line_view}>
            <FontAwesomeIcon icon={faClock} size={icon_size} color={'#000'} />
            <Text style={styles.line_title}>Total Number of Sessions: </Text>
            <Text style={styles.line_content}>1</Text>
          </View>
          <View style={styles.line_view}>
            <FontAwesomeIcon icon={faClock} size={icon_size} color={'#000'} />
            <Text style={styles.line_title}>Total Time Meditating: </Text>
            <Text style={styles.line_content}>30</Text>
          </View>
        </View>
      </View>
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
export default connect(mapStateToProps)(Progress);

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
  upgroup: {
    height: Constants.profile_panel_th * 0.65,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: perfectSize(15),
    paddingVertical: perfectSize(30),
  },
  txtarea: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  hello: {
    marginTop: perfectSize(30),
    fontFamily: Fonts.semibold,
    fontSize: Constants.description_font,
  },
  name: {
    marginTop: perfectSize(5),
    fontFamily: Fonts.extrabold,
    fontSize: Constants.description_font,
    color: Colors.fontcolors.strong
  },
  email: {
    marginTop: perfectSize(5),
    fontFamily: Fonts.bolditalic,
    fontSize: Constants.normal_font,
    color: Colors.fontcolors.little
  },
  profileImage: {
    width: perfectSize(100),
    height: perfectSize(100),
    resizeMode: 'contain',
    borderRadius: perfectSize(50),
  },
  lineBar: {
    width: '90%',
    height: perfectSize(2),
    alignSelf: 'flex-end',
    backgroundColor: '#E5E5E5',
  },
  downgroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: perfectSize(20),
    paddingVertical: perfectSize(15),
  },
  txtgroup: {
    flexDirection: 'column'
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: Constants.normal_font,
    color: Colors.fontcolors.strong
  },
  valuetxt: {
    marginTop: perfectSize(5),
    fontFamily: Fonts.semibold,
    fontSize: Constants.normal_font,
    color: Colors.fontcolors.little,
  },

  bottomcontainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: Constants.profile_panel_sh,
    height: Constants.profile_panel_bh,
    width: Constants.profile_panel_w,
    alignSelf: 'center',
    paddingHorizontal: perfectSize(40),
    paddingTop: perfectSize(20),
    paddingBottom: perfectSize(100),
    borderTopRightRadius: Constants.profile_panel_radius,
    borderTopLeftRadius: Constants.profile_panel_radius,
    borderColor: '#060D1577',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  line_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line_title: {
    marginLeft: perfectSize(10),
    fontFamily: Fonts.bold,
    fontSize: Constants.normal_font,
    color: Colors.fontcolors.strong,
  },
  line_content: {
    fontFamily: Fonts.regular,
    fontSize: Constants.normal_font,
    color: Colors.fontcolors.little,
  },
});
