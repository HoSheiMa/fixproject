import React, { Component, Fragment } from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableHighlight, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFacebookF, faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
import FormInput from '../component/ValidationCompenent/FormInput';
import FormButton from '../component/ValidationCompenent/FormButton';
import ErrorMessage from '../component/ValidationCompenent/ErrorMessage';
import Firebase from '../../config/Firebase';
import { connect } from 'react-redux';
import { LOGIN } from '../store/actions/user.actions';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import Logo from '../component/Logo'
import { Images, Colors, Constants, Fonts, Layoutsd } from '@utils'
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import BackButton from '../component/BackButton';
import { create, PREDEF_RES } from 'react-native-pixel-perfect'
import AwesomeAlert from 'react-native-awesome-alerts';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'


const perfectSize = create(PREDEF_RES.iphoneX.dp)

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(8, 'Password must have more than 8 characters ')
})

class SignInScreen extends Component {
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
      showAlert: false,
      msgtxt: '',
      loggedIn: false,

      email: '',
      password: '',
      pincodehide: true,
      errorMessage: null,
      pushData: [],
      userInfo: null,

    };
    this.onEmailButtonPress = this.onEmailButtonPress.bind(this);
  }

  showAlert = (txt) => this.setState({ showAlert: true, msgtxt: txt });

  hideAlert = () => this.setState({ showAlert: false });

  componentDidMount() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '1054226155220-k93entvui1v9qtnebf2us7iia96cqe8p.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    });
  }

  get gradient() {
    return (
      <LinearGradient
        colors={['#fffd', '#77fd']}
        startPoint={{ x: 1, y: 0 }}
        endPoint={{ x: 0, y: 1 }}
        style={styles.gradient}
      />
    );
  }

  async onEmailButtonPress(values, actions) {
    const self = this;
    actions.setSubmitting(false);
    auth().signInWithEmailAndPassword(values.email, values.password)
      .then(function (result) {
        if (result.user.emailVerified) {
          self.success_login(result, values.password);
        } else {
          self.showAlert("you need email verification. please check your email");
        }
      }.bind(this)).catch(function (error) {
        self.showAlert(error.message);
      });
  }

  success_login = (result, pass) => {
    const self = this;
    const ref = Firebase.database().ref('User_info/' + result.user.uid)
    ref.on('value', function (snapshot) {
      self.props.login({
        userkey: result.user.uid,
        email: result.user.email,
        password: pass,
        username: snapshot.val().name,
        paidState: snapshot.val().paid_state,
        lastest_date: snapshot.val().accessed_at,
        photo_url: snapshot.val().photo_url,
        ca_key1: snapshot.val().ca_key1,
        ca_key2: snapshot.val().ca_key2,
        co_key1: snapshot.val().co_key1,
        co_key2: snapshot.val().co_key2,
        v_key1: snapshot.val().v_key1,
        v_key2: snapshot.val().v_key2,
      });
      ref.update({
        accessed_at: self.get_now_date(),
      });
      self.setState({ loggedIn: true })
      self.setState({ loggedIn: true })
      // self.props.navigation.navigate('TabBar')
      self.props.navigation.navigate('WelcomeScreen')
    });
  }

  get_now_date() {
    var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    var Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = weekday[new Date().getDay()] + ', ' + Months[new Date().getMonth()] + ' ' + new Date().getDate() + ', ' + new Date().getFullYear();
    return date;
  }

  goToResetPass = () => {
    const self = this;
    self.props.navigation.navigate('EmailInputScreen');
  }

  onGoogleButtonPress = async () => {
    const self = this;
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut()
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
      auth().signInWithCredential(googleCredential)
        .then(function (result) {
          this.social_login_success(result)
        }.bind(this)).catch(function (error) {
          self.showAlert(error.message)
        })
    } catch (error) {
      self.showAlert(error.message)
    }
  };

  onFacebookButtonPress = async () => {
    const self = this;
    try {
      LoginManager.logOut();
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        self.showAlert('User cancelled the login process');
        throw 'User cancelled the login process';
      }
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        self.showAlert('Something went wrong obtaining access token')
        throw 'Something went wrong obtaining access token';
      }
      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
      auth().signInWithCredential(facebookCredential).
        then(function (result) {
          this.social_login_success(result);
        }.bind(this)).catch(function (error) {
          alert(error.message)
        })
    } catch (error) {
      self.showAlert(error.message);
    }
  }

  social_login_success = (result) => {
    const self = this
    let ref = Firebase.database().ref('User_info/' + result.user.uid);
    ref.once('value', function (snapshot) {
      if (snapshot.val()) {
        self.props.login({
          userkey: result.user.uid,
          email: result.user.email,
          password: '',
          username: snapshot.val().name,
          paidState: snapshot.val().paid_state,
          lastest_date: snapshot.val().accessed_at,
          photo_url: snapshot.val().photo_url,
          ca_key1: snapshot.val().ca_key1,
          ca_key2: snapshot.val().ca_key2,
          co_key1: snapshot.val().co_key1,
          co_key2: snapshot.val().co_key2,
          v_key1: snapshot.val().v_key1,
          v_key2: snapshot.val().v_key2,
        });
        ref.update({
          accessed_at: self.get_now_date(),
        });
      } else {
        ref.set({
          mail_address: result.user.email,
          name: result.user.displayName,
          paid_state: false,
          accessed_at: self.get_now_date(),
          created_at: self.get_now_date(),
          photo_url: result.user.photoURL,
          ca_key1: '',
          ca_key2: '',
          co_key1: '',
          co_key2: '',
          v_key1: '',
          v_key2: '',
        });
        self.props.login({
          userkey: result.user.uid,
          email: result.user.email,
          password: '',
          username: result.user.displayName,
          paidState: false,
          lastest_date: self.get_now_date(),
          photo_url: result.user.photoURL,
          ca_key1: '',
          ca_key2: '',
          co_key1: '',
          co_key2: '',
          v_key1: '',
          v_key2: '',
        });
      }
      self.props.navigation.navigate('TabBar')
      self.setState({ loggedIn: true });
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    const { showAlert, msgtxt, register_pass } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient colors={['#000000','#0e0314', '#230633']} style={styles.linearGradient}>
          <View style={{ flexDirection: 'row', alignItems: "center", width: "100%", justifyContent: 'center', marginTop: 20 }}>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('SignUp')}} style={styles.btnContainer}>
              <FontAwesomeIcon icon={faAngleLeft} color={'white'} size={perfectSize(35)} />
            </TouchableOpacity>
            <Text style={{ color: '#fff', fontSize: 25 }}>INNERWONDERS</Text>
          </View>
          <ScrollView>
            {/* {this.gradient} */}
            <View style={styles.centerContainer}>
              <Text style={styles.LoginTxt}>Login</Text>
              <TouchableOpacity
                style={styles.facebookButton}
                onPress={() => this.onFacebookButtonPress()}
              >
                <View style={styles.FaceBtnArea}>
                  <FontAwesomeIcon icon={faFacebookF} color={'#3A559F'} size={Constants.normal_font * 1.5} />
                </View>
                <Text style={styles.facebookButtonText}>Continue with Facebook</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.googleButton}
                onPress={() => this.onGoogleButtonPress()}
              >
                <FontAwesome name="google-plus" color={'#FFF'} size={Constants.normal_font * 1.5} />
                <View style={{ marginLeft: 8, width: "100%" }}>
                  <Text style={styles.googleButtonText}>Continue with Google</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.AppleButton}
                onPress={() => this.onGoogleButtonPress()}
              >
                <View style={styles.FaceBtnArea}>
                  <FontAwesomeIcon icon={faApple} color={'#000'} size={Constants.normal_font * 2.5} />
                </View>
                <View style={{ marginLeft: 15, width: "100%" }}>
                  <Text style={styles.AppleButtonText}>Continue with Apple</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.line} />
              <Text style={styles.OrTxt}>OR</Text>
              <Formik
                // initialValues={{ email: 'funnyvideoslib@gmail.com', password: '111111111' }}
                initialValues={{ email: '', password: '' }}
                onSubmit={(values, actions) => {
                  this.onEmailButtonPress(values, actions)
                }}
                validationSchema={validationSchema}>

                {({
                  handleChange,
                  values,
                  handleSubmit,
                  errors,
                  isValid = false,
                  touched,
                  handleBlur,
                  isSubmitting
                }) => (
                    <Fragment>
                      <View style={styles.inputgroup}>
                        <FormInput
                          name='email'
                          // value="passion0213@163.com"
                          value={values.email}
                          onChangeText={handleChange('email')}
                          placeholder='Login with Email'
                          autoCapitalize='none'
                          iconName='ios-mail'
                          inputStyle={styles.inputstyle1}
                          inputContainerStyle={styles.Icontainerstyle}
                          inputCo
                          iconColor={Colors.basic}
                          onBlur={handleBlur('email')}
                        // autoFocus
                        />
                        <ErrorMessage errorValue={touched.email && errors.email} />
                        <FormInput
                          name='password'
                          // value="123123123"
                          value={values.password}
                          onChangeText={handleChange('password')}
                          placeholder='Password'
                          secureTextEntry={false}
                          inputStyle={styles.inputstyle2}
                          inputContainerStyle={styles.Icontainerstyle}
                          iconName='ios-lock'
                          iconColor={Colors.basic}
                          onBlur={handleBlur('password')}
                          ShowIcon={true}
                        />
                        <ErrorMessage errorValue={touched.password && errors.password} />
                      </View>
                      <TouchableOpacity style={styles.forgotTextContainer} onPress={() => this.goToResetPass()}><Text style={styles.forgotText}>Forgot your Password?</Text></TouchableOpacity>
                      <FormButton
                        buttonType='outline'
                        onPress={handleSubmit}
                        title='Login'
                        buttonColor={Colors.white}
                        disabled={!isValid || isSubmitting}
                        // loading={isSubmitting}
                        buttonStyle={styles.signInButton}
                        titleStyle={styles.signInButtonTxt}
                      />
                      <TouchableOpacity style={{ marginTop: 30 }} onPress={() => this.props.navigation.navigate("SignUp")}>
                        <Text style={{ color: '#73219F', fontWeight: 'bold', fontSize: 18 }}>Sign Up</Text>
                      </TouchableOpacity>
                    </Fragment>
                  )}
              </Formik>
            </View>
          </ScrollView>
        </LinearGradient>

        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="MassageBox"
          message={msgtxt}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Yes, Got it"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (userInfo) => {
      dispatch({
        type: LOGIN,
        password: userInfo.password,
        email: userInfo.email,
        username: userInfo.username,
        paidState: userInfo.paidState,
        userkey: userInfo.userkey,
        ca_key1: userInfo.ca_key1,
        ca_key2: userInfo.ca_key2,
        co_key1: userInfo.co_key1,
        co_key2: userInfo.co_key2,
        v_key1: userInfo.v_key1,
        v_key2: userInfo.v_key2,
        lastest_date: userInfo.lastest_date,
        photo_url: userInfo.photo_url,
      });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: Constants.screen_w,
    height: Constants.screen_h,
    // resizeMode : 'cover',//'contain',//'stretch',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  centerContainer: {
    alignSelf: 'flex-end',
    width: Constants.Spanel_w,
    height: Constants.Spanel_h,
    alignItems: 'center',
  },

  description_txt: {
    marginTop: perfectSize(20),
    width: Constants.input_w,
    textAlign: 'justify',
    fontFamily: Fonts.bold,
    fontSize: Constants.description_font,
    color: Colors.basic
  },
  inputgroup: {
    marginTop: perfectSize(40),
    // backgroundColor: 'red',
    width: '85%'
  },
  Icontainerstyle: {
    width: Constants.input_w,
    height: Constants.input_h,
    borderBottomWidth: 0
  },
  inputstyle1: {
    fontSize: Constants.normal_font,
    fontFamily: Fonts.regular,
    color: '#73219F'
  },
  inputstyle2: {
    fontSize: Constants.normal_font,
    fontFamily: Fonts.regular,
    marginLeft: perfectSize(4),
    color: '#73219F'
  },
  forgotTextContainer: {
    marginRight: -Constants.screen_w * 0.3,
    marginTop: perfectSize(5),
    // alignItems:"flex-end",
    // justifyContent:'flex-end'
  },
  forgotText: {
    fontFamily: Fonts.semibold,
    fontSize: 18,
    // textDecorationLine: 'underline',
    letterSpacing: 1.2,
    color: '#fff',
  },
  Background: {
    width: '100%',
    height: '100%',
    // alignItems: "center"
  },
  signInButton: {
    marginTop: perfectSize(30),
    width: Constants.button_w,
    height: Constants.button_h,
    // borderColor: Colors.white,
    backgroundColor: '#73219F',
    alignSelf: 'center',
    borderRadius: Constants.button_radius,
  },
  signInButtonTxt: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    letterSpacing: 1.5,
    color: Colors.white,
  },
  LoginTxt: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: -20
  },
  facebookButton: {
    marginTop: perfectSize(50),
    width: "78%",
    flexDirection: 'row',
    height: Constants.button_h,
    // justifyContent: "space-between",
    paddingHorizontal: "5%",
    alignItems: 'center',
    borderRadius: Constants.button_radius,
    backgroundColor: '#3A559F',
  },
  facebookButtonText: {
    // fontFamily: Fonts.bold,
    fontSize: Constants.normal_font,
    // textAlign: 'center',
    color: Colors.white,
    letterSpacing: 1.5,
    marginLeft: 15

  },
  btnContainer: {
    width: perfectSize(27),
    height: perfectSize(27),
    alignItems: 'center',
    position: 'absolute',
    left: perfectSize(20),
  },
  googleButton: {
    marginTop: perfectSize(30),
    width: "78%",
    flexDirection: 'row',
    height: Constants.button_h,
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    alignItems: 'center',
    borderRadius: Constants.button_radius,
    backgroundColor: '#197CD1',
  },
  googleButtonText: {
    marginLeft: perfectSize(10),
    // fontFamily: Fonts.bold,
    fontSize: Constants.normal_font,
    // textAlign: 'center',
    color: Colors.white,
    letterSpacing: 1.5,
  },
  AppleButton: {
    marginTop: perfectSize(30),
    width: "78%",
    flexDirection: 'row',
    height: Constants.button_h,
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    alignItems: 'center',
    borderRadius: Constants.button_radius,
    backgroundColor: '#fff',
  },
  AppleButtonText: {
    // marginLeft: perfectSize(10),
    // fontFamily: Fonts.bold,
    fontSize: Constants.normal_font,
    // textAlign: 'center',
    color: Colors.black,
    letterSpacing: 1.5,
    fontWeight: 'bold'
  },
  line: {
    marginTop: 40,
    height: 0.5,
    backgroundColor: '#906CA3',
    width: '85%'
  },
  OrTxt: {
    color: "#fff",
    marginTop: -10,
    backgroundColor: '#000',
    width: 30,
    textAlign: 'center'
  },
  FaceBtnArea: {
    backgroundColor: '#fff',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  }
});
