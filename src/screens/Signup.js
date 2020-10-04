import React, {Fragment} from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import * as Yup from 'yup';
import FormInput from '../component/ValidationCompenent/FormInput';
import FormButton from '../component/ValidationCompenent/FormButton';
import ErrorMessage from '../component/ValidationCompenent/ErrorMessage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faFacebookF,
  faGoogle,
  faApple,
} from '@fortawesome/free-brands-svg-icons';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {LoginManager} from 'react-native-fbsdk';

import Firebase from '../../config/Firebase';
import {Images, Colors, Constants, Fonts, Layoutsd} from '@utils';
import {create, PREDEF_RES} from 'react-native-pixel-perfect';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
// import BackButton from '../component/SignUpBackBt';
import BackButton from '../component/BackButton';
import Logo from '../component/Logo';
import AwesomeAlert from 'react-native-awesome-alerts';

const perfectSize = create(PREDEF_RES.iphoneX.dp);
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .required()
    .min(2, 'Must have at least 2 characters'),
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(8, 'Password must have more than 8 characters '),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirm Password must matched Password')
    .required('Confirm Password is required'),
});

class SignupScreen extends React.Component {
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     title: ``,
  //     headerTransparent: 'false',
  //     headerLeft: () => <BackButton onPress={() => { navigation.goBack(); }} />
  //   };
  // };

  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      msgtxt: '',
    };
  }

  showAlert = txt => this.setState({showAlert: true, msgtxt: txt});

  hideAlert = () => this.setState({showAlert: false});

  register_account_with_mail(email, password, name) {
    const self = this;
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(
        function(result) {
          var user = Firebase.auth().currentUser;
          Firebase.database()
            .ref('User_info/' + result.user.uid)
            .update({
              mail_address: email,
              name: name,
              paid_state: false,
              accessed_at: self.get_now_date(),
              created_at: self.get_now_date(),
              photo_url:
                'https://firebasestorage.googleapis.com/v0/b/meditation-app-34538.appspot.com/o/Avatars%2Fuser.jpg?alt=media&token=657b9b73-6220-4232-a396-c02f8f19cff5',
              ca_key1: '',
              ca_key2: '',
              co_key1: '',
              co_key2: '',
              v_key1: '',
              v_key2: '',
            });
          user
            .sendEmailVerification()
            .then(
              function() {
                console.log('email sent!!!'); // Email sent.
                this.showAlert(
                  'Created new account successfully! please check your email! if you login, you need email verification.',
                );
              }.bind(this),
            )
            .catch(function(error) {
              console.log(error);
            });
        }.bind(this),
      )
      .catch(function(error) {
        self.showAlert(error.message);
      });
  }

  componentWillMount() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '1054226155220-k93entvui1v9qtnebf2us7iia96cqe8p.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    });
  }

  onGoogleButtonPress = async () => {
    const self = this;
    // await GoogleSignin.signOut();

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      this.setState({userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('error 0');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('error 1');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('error 2');
      } else {
        // some other error happened
        console.log('error 3', error);
      }
    }
  };

  onFacebookButtonPress = async () => {
    const self = this;
    try {
      LoginManager.logOut();

      const result = await LoginManager.logInWithPermissions(['email']);
      if (result.isCancelled) {
        self.showAlert('User cancelled the login process');
        throw 'User cancelled the login process';
      }
      console.log(result);
      // const data = await AccessToken.getCurrentAccessToken();
      // if (!data) {
      //   self.showAlert('Something went wrong obtaining access token')
      //   throw 'Something went wrong obtaining access token';
      // }
      // const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
      // auth().signInWithCredential(facebookCredential).
      //   then(function (result) {
      //     this.social_login_success(result);
      //   }.bind(this)).catch(function (error) {
      //     alert(error.message)
      //   })
    } catch (error) {
      self.showAlert(error.message);
    }
  };

  handleSubmit(values, actions) {
    const self = this;
    self.register_account_with_mail(values.email, values.password, values.name);
  }

  get_now_date() {
    var weekday = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    var Months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const date =
      weekday[new Date().getDay()] +
      ', ' +
      Months[new Date().getMonth()] +
      ' ' +
      new Date().getDate() +
      ', ' +
      new Date().getFullYear();
    return date;
  }

  get gradient() {
    return (
      <LinearGradient
        colors={['#fffd', '#77fd']}
        startPoint={{x: 1, y: 0}}
        endPoint={{x: 0, y: 1}}
        style={styles.gradient}
      />
    );
  }

  render() {
    const {
      showAlert,
      msgtxt,
      register_name,
      register_email,
      register_pass,
    } = this.state;
    return (
      <SafeAreaView Style={styles.container}>
        <LinearGradient
          colors={['#000000', '#0e0314', '#230633']}
          style={styles.linearGradient}>
          {/* {this.gradient} */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Introslider3');
              }}
              style={styles.btnContainer}>
              <FontAwesomeIcon
                icon={faAngleLeft}
                color={'white'}
                size={perfectSize(35)}
              />
            </TouchableOpacity>
            <Text style={{color: '#fff', fontSize: 25}}>INNERWONDERS</Text>
          </View>
          <ScrollView>
            <View style={styles.centerContainer}>
              <Text style={styles.SignUpTxt}>Sign Up</Text>
              <Formik
                enableReinitialize
                initialValues={{
                  name: register_name,
                  email: register_email,
                  password: '',
                  confirmPassword: '',
                }}
                onSubmit={(values, actions) => {
                  this.handleSubmit(values, actions);
                }}
                validationSchema={validationSchema}>
                {({
                  handleChange,
                  values,
                  handleSubmit,
                  errors,
                  isValid,
                  touched,
                  handleBlur,
                  isSubmitting,
                }) => (
                  <Fragment>
                    <View style={styles.inputgroup}>
                      <FormInput
                        name="name"
                        value={values.name}
                        // value={register_name}
                        onChangeText={handleChange('name')}
                        placeholder="Full Name"
                        // iconName='md-person'
                        // iconColor='#1D1D1D'
                        onBlur={handleBlur('name')}
                        inputStyle={styles.inputstyle1}
                        inputContainerStyle={styles.Icontainerstyle}
                        ShowIcon={false}
                        // autoFocus
                      />
                      <ErrorMessage errorValue={touched.name && errors.name} />
                      <FormInput
                        name="email"
                        value={values.email}
                        onChangeText={handleChange('email')}
                        placeholder="Email"
                        autoCapitalize="none"
                        // iconName='ios-mail'
                        // iconColor='#1D1D1D'
                        onBlur={handleBlur('email')}
                        inputStyle={styles.inputstyle1}
                        inputContainerStyle={styles.Icontainerstyle}
                        ShowIcon={false}
                      />
                      <ErrorMessage
                        errorValue={touched.email && errors.email}
                      />
                      <FormInput
                        name="password"
                        value={values.password}
                        onChangeText={handleChange('password')}
                        placeholder="Password"
                        secureTextEntry
                        // iconName='ios-lock'
                        // iconColor='#1D1D1D'
                        onBlur={handleBlur('password')}
                        inputStyle={styles.inputstyle2}
                        inputContainerStyle={styles.Icontainerstyle}
                        ShowIcon={true}
                      />
                      <ErrorMessage
                        errorValue={touched.password && errors.password}
                      />
                      <FormInput
                        name="password"
                        value={values.confirmPassword}
                        onChangeText={handleChange('confirmPassword')}
                        placeholder="Confirm Password"
                        secureTextEntry
                        // iconName='ios-lock'
                        // iconColor='#1D1D1D'
                        onBlur={handleBlur('confirmPassword')}
                        inputStyle={styles.inputstyle2}
                        inputContainerStyle={styles.Icontainerstyle}
                        ShowIcon={true}
                      />
                      <ErrorMessage
                        errorValue={
                          touched.confirmPassword && errors.confirmPassword
                        }
                      />
                    </View>
                    {/* <Text style={styles.description_txt}>by continuing, you agree to Innerwonders's Terms & Conditions and Privacy Policy</Text> */}
                    <View style={{width: '100%'}}>
                      <FormButton
                        // buttonType='outline'
                        onPress={handleSubmit}
                        title="SignUp"
                        buttonColor="#73219F"
                        // disabled={!isValid || isSubmitting}
                        // loading={isSubmitting}
                        buttonStyle={styles.signUpButton}
                        titleStyle={styles.signUpButtonTxt}
                      />
                    </View>
                  </Fragment>
                )}
              </Formik>
              <View style={styles.line} />
              <Text style={styles.OrTxt}>OR</Text>
              <TouchableOpacity
                style={styles.facebookButton}
                onPress={() => this.onFacebookButtonPress()}>
                <View style={styles.FaceBtnArea}>
                  <FontAwesomeIcon
                    icon={faFacebookF}
                    color={'#3A559F'}
                    size={Constants.normal_font * 1.5}
                  />
                </View>
                <View>
                  <Text style={styles.facebookButtonText}>
                    Continue with Facebook
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.googleButton}
                onPress={() => this.onGoogleButtonPress()}>
                <View style={styles.GoogleBtnArea}>
                  <FontAwesome
                    name="google-plus"
                    color={'#FFF'}
                    size={Constants.normal_font * 1.5}
                  />
                </View>
                <View style={{marginLeft: 8, width: '100%'}}>
                  <Text style={styles.googleButtonText}>
                    Continue with Google
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.AppleButton}
                onPress={() => this.onGoogleButtonPress()}>
                <View style={styles.FaceBtnArea}>
                  <FontAwesomeIcon
                    icon={faApple}
                    color={'#000'}
                    size={Constants.normal_font * 2.5}
                    style={{marginLeft: -3}}
                  />
                </View>
                <View style={{marginLeft: 15, width: '100%'}}>
                  <Text style={styles.AppleButtonText}>
                    Continue with Apple
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{marginTop: -20, marginBottom: 50, alignItems: 'center'}}
              onPress={() => this.props.navigation.navigate('SignIn')}>
              <Text style={{fontSize: 18, color: '#fff'}}>
                Existing User? Login
              </Text>
            </TouchableOpacity>
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
            this.props.navigation.navigate('IntroVideo');
          }}
        />
      </SafeAreaView>
    );
  }
}

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  backgroundImage: {
    width: Constants.screen_w,
    height: Constants.screen_h,
    // resizeMode : 'cover',//'contain',//'stretch',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  centerContainer: {
    alignSelf: 'flex-end',
    width: Constants.Spanel_w,
    height: Constants.Spanel_h,
    alignItems: 'center',
  },
  inputgroup: {
    marginTop: perfectSize(40),
    width: '85%',
  },
  Icontainerstyle: {
    width: Constants.input_w,
    height: Constants.input_h,
    borderBottomWidth: 0,
    width: '80%',
  },
  linearGradient: {
    height: '100%',
    width: '100%',
  },
  Background: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  inputstyle1: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    marginLeft: -10,
    color: '#73219F',
  },
  inputstyle2: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    marginLeft: -10,
    width: '80%',
    color: '#73219F',
  },
  description_txt: {
    marginTop: perfectSize(0),
    width: Constants.input_w,
    textAlign: 'justify',
    fontFamily: Fonts.bold,
    fontSize: perfectSize(13),
    color: Colors.basic,
  },
  signUpButton: {
    marginTop: perfectSize(30),
    width: '78%',
    height: Constants.button_h,
    // borderColor: Colors.white,
    backgroundColor: '#73219F',
    alignSelf: 'center',
    borderRadius: Constants.button_radius,
  },
  signUpButtonTxt: {
    fontFamily: Fonts.bold,
    fontSize: Constants.normal_font,
    letterSpacing: 1.5,
    color: Colors.white,
  },
  SignUpTxt: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: -20,
  },
  line: {
    marginTop: 40,
    height: 0.5,
    backgroundColor: '#906CA3',
    width: '85%',
  },
  OrTxt: {
    color: '#fff',
    marginTop: -10,
    backgroundColor: '#000',
    width: 30,
    textAlign: 'center',
  },
  facebookButton: {
    marginTop: perfectSize(50),
    width: '78%',
    flexDirection: 'row',
    height: Constants.button_h,
    // justifyContent: "space-between",
    paddingHorizontal: '5%',
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
    marginLeft: 15,
  },
  googleButton: {
    marginTop: perfectSize(30),
    width: '78%',
    flexDirection: 'row',
    height: Constants.button_h,
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
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
    width: '78%',
    flexDirection: 'row',
    height: Constants.button_h,
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    alignItems: 'center',
    borderRadius: Constants.button_radius,
    backgroundColor: '#fff',
  },
  btnContainer: {
    width: perfectSize(27),
    height: perfectSize(27),
    alignItems: 'center',
    position: 'absolute',
    left: perfectSize(20),
  },
  AppleButtonText: {
    // fontFamily: Fonts.bold,
    fontSize: Constants.normal_font,
    // textAlign: 'center',
    color: Colors.black,
    letterSpacing: 1.5,
    fontWeight: 'bold',
  },
  FaceBtnArea: {
    backgroundColor: '#fff',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  GoogleBtnArea: {
    // backgroundColor: '#fff',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
