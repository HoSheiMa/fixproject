import React, { Component, Fragment } from 'react';
import { SafeAreaView,View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faUserEdit } from '@fortawesome/free-solid-svg-icons';
// import { users } from '../../../data/DataArrays'
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../../../component/ValidationCompenent/FormInput';
import FormButton from '../../../component/ValidationCompenent/FormButton';
import ErrorMessage from '../../../component/ValidationCompenent/ErrorMessage';
import { Images, Colors, Constants, Fonts, Layoutsd } from '@utils'
import BackButton from '../../../component/SignUpBackBt';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { create, PREDEF_RES } from 'react-native-pixel-perfect';

const perfectSize = create(PREDEF_RES.iphoneX.dp)

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
    .required('Confirm Password is required')
})

class ProfileEdit extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: ``,
      headerTransparent: 'true',
      headerLeft: () => <BackButton onPress={() => { navigation.goBack(); }} />
    };
  };

  constructor(props) {
    super(props)
    this.state = {
      filepath: {
        data: '',
        uri: ''
      },
      fileData: '',
      fileUri: ''
    }
  }

  chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });
  }

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image
        source={{ uri: this.state.fileUri }}
        style={styles.profileImage}
      />
    } else {
      return <Image
        source={{ uri: this.props.photo_url }} 
        style={styles.profileImage}
      />
    }
  }

  edit_avatar = () => {

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
            {this.renderFileUri()}
          </View>
          <TouchableOpacity onPress={this.chooseImage} style={styles.imageedit} >
            <FontAwesomeIcon icon={faUserEdit} color={'#2E4DA2'} size={perfectSize(25)} />
          </TouchableOpacity>
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
          <Formik
            initialValues={{ name: this.props.username, email: this.props.email, password: this.props.password }}
            onSubmit={(values, actions) => {
              this.handleSubmit(values, actions)
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
                      name='name'
                      value={values.name}
                      onChangeText={handleChange('name')}
                      placeholder='Enter your full name'
                      iconName='md-person'
                      iconColor='#1D1D1D'
                      onBlur={handleBlur('name')}
                      inputStyle={styles.inputstyle1}
                      inputContainerStyle={styles.Icontainerstyle}
                    // autoFocus
                    />
                    <ErrorMessage errorValue={touched.name && errors.name} />
                    <FormInput
                      name='email'
                      value={values.email}
                      onChangeText={handleChange('email')}
                      placeholder='Enter email'
                      autoCapitalize='none'
                      iconName='ios-mail'
                      inputStyle={styles.inputstyle1}
                      inputContainerStyle={styles.Icontainerstyle}
                      iconColor={Colors.basic}
                      onBlur={handleBlur('email')}
                    // autoFocus
                    />
                    <ErrorMessage errorValue={touched.email && errors.email} />
                    <FormInput
                      name='password'
                      value={values.password}
                      onChangeText={handleChange('password')}
                      placeholder='Enter password'
                      secureTextEntry
                      inputStyle={styles.inputstyle2}
                      inputContainerStyle={styles.Icontainerstyle}
                      iconName='ios-lock'
                      iconColor={Colors.basic}
                      onBlur={handleBlur('password')}
                    />
                    <ErrorMessage errorValue={touched.password && errors.password} />
                  </View>
                  <FormButton
                    buttonType='outline'
                    onPress={handleSubmit}
                    title='SAVE'
                    buttonColor={Colors.white}
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting}
                    buttonStyle={styles.save_bt}
                    titleStyle={styles.save_bt_txt}
                  />
                </Fragment>
              )}
          </Formik>
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
    password: state.user.password
  }
}


export default connect(mapStateToProps)(ProfileEdit);


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
  imageedit: {
    marginTop: perfectSize(-50),
    marginLeft: Constants.screen_w * 0.8,
    marginBottom: perfectSize(20),
    justifyContent: 'center',
    borderRadius: perfectSize(20),
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

  inputgroup: {
    marginTop: perfectSize(40),
  },
  Icontainerstyle: {
    width: Constants.input_w,
    height: Constants.input_h,
    borderBottomWidth: 0
  },
  inputstyle1: {
    fontSize: Constants.normal_font,
    fontFamily: Fonts.regular,
  },
  inputstyle2: {
    fontSize: Constants.normal_font,
    fontFamily: Fonts.regular,
    marginLeft: perfectSize(4),
  },

  save_bt: {
    width: Constants.button_w,
    height: Constants.button_h,
    borderColor: Colors.white,
    backgroundColor: '#19232F',
    alignSelf: 'center',
    borderRadius: Constants.button_radius,
  },
  save_bt_txt: {
    fontFamily: Fonts.bold,
    fontSize: Constants.normal_font,
    letterSpacing: 1.5,
    color: Colors.white,
  },
});
