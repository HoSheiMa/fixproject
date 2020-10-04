import React, { Component } from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, SafeAreaView} from 'react-native';
// import { users } from '../../../data/DataArrays'
import { connect } from 'react-redux';

import 'react-native-get-random-values';
import { WebView } from 'react-native-webview';
import axios from "axios";
import qs from "qs";
import { decode, encode } from 'base-64'

import { Images, Colors, Constants, Fonts, Layoutsd } from '@utils'
import BackButton from '../../../component/SignUpBackBt';
import { create, PREDEF_RES } from 'react-native-pixel-perfect'
// import { SafeAreaView } from 'react-native-safe-area-context';

const perfectSize = create(PREDEF_RES.iphoneX.dp)

class Subscription extends Component {
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
      isWebViewLoading: false,
      paypalUrl: '',
      access_token: '',
      shouldShowWebViewLoading: true
    }
  }
  componentDidMount() {
    if (!global.btoa) {
      global.btoa = encode;
    }

    if (!global.atob) {
      global.atob = decode;
    }
  }

  paymonthly = () => {
    const dataDetail = {
      "intent": "sale",
      "payer": {
        "payment_method": "paypal"
      },
      "transactions": [{
        "amount": {
          "currency": "USD",
          "total": "3.99",
          "details": {
            "shipping": "0",
            "subtotal": "3.99",
            "shipping_discount": "0",
            "insurance": "0",
            "handling_fee": "0",
            "tax": "0"
          }
        },
        "description": "This is the payment transaction description",
        "payment_options": {
          "allowed_payment_method": "IMMEDIATE_PAY"
        }, "item_list": {
          "items": [{
            "name": "Monthly subscription",
            "description": "can use medtitation app",
            "quantity": "1",
            "price": "3.99",
            "tax": "0",
            "sku": "subscription",
            "currency": "USD"
          }]
        }
      }],
      "redirect_urls": {
        "return_url": "https://example.com/",
        "cancel_url": "https://example.com/"
      }
    }
    this.buyBook(dataDetail);
  }

  paysixmonthly = () => {
    const dataDetail = {
      "intent": "sale",
      "payer": {
        "payment_method": "paypal"
      },
      "transactions": [{
        "amount": {
          "currency": "USD",
          "total": "23.5",
          "details": {
            "shipping": "0",
            "subtotal": "23.5",
            "shipping_discount": "0",
            "insurance": "0",
            "handling_fee": "0",
            "tax": "0"
          }
        },
        "description": "This is the payment transaction description",
        "payment_options": {
          "allowed_payment_method": "IMMEDIATE_PAY"
        }, "item_list": {
          "items": [{
            "name": "Monthly subscription",
            "description": "can use medtitation app",
            "quantity": "1",
            "price": "23.5",
            "tax": "0",
            "sku": "subscription",
            "currency": "USD"
          }]
        }
      }],
      "redirect_urls": {
        "return_url": "https://example.com/",
        "cancel_url": "https://example.com/"
      }
    }
    this.buyBook(dataDetail);
  }
  payyearly = () => {
    const dataDetail = {
      "intent": "sale",
      "payer": {
        "payment_method": "paypal"
      },
      "transactions": [{
        "amount": {
          "currency": "USD",
          "total": "47",
          "details": {
            "shipping": "0",
            "subtotal": "47",
            "shipping_discount": "0",
            "insurance": "0",
            "handling_fee": "0",
            "tax": "0"
          }
        },
        "description": "This is the payment transaction description",
        "payment_options": {
          "allowed_payment_method": "IMMEDIATE_PAY"
        }, "item_list": {
          "items": [{
            "name": "Monthly subscription",
            "description": "can use medtitation app",
            "quantity": "1",
            "price": "47",
            "tax": "0",
            "sku": "subscription",
            "currency": "USD"
          }]
        }
      }],
      "redirect_urls": {
        "return_url": "https://example.com/",
        "cancel_url": "https://example.com/"
      }
    }
    this.buyBook(dataDetail);
  }


  buyBook = async (dataDetail) => {

    //Check out https://developer.paypal.com/docs/integration/direct/payments/paypal-payments/# for more detail paypal checkout


    const url = `https://api.sandbox.paypal.com/v1/oauth2/token`;

    const data = {
      grant_type: 'client_credentials'

    };

    const auth = {
      username: "AaAgLALMJWoX-SR1IPhVb9-VvXbAgYV1Tg2bMLrzS2mplnM4yZYUI69K01R4mnyR96KB_g1kbmgDkyBT",  //"your_paypal-app-client-ID",
      password: "EJsGiRqjNrc7u4gHQoOzprfO30YYvT3MjFOHBtzrJUttyj70fa0Og4zcf4ogcUN-fETGwnWocSil1wab"   //"your-paypal-app-secret-ID


    };

    const options = {

      method: 'post',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Credentials': true
      },

      //Make sure you use the qs.stringify for data
      data: qs.stringify(data),
      auth: auth,
      url,
    };

    // Authorise with seller app information (clientId and secret key)
    axios(options).then(response => {
      this.setState({ accessToken: response.data.access_token });
      // console.log('++++++++++++++++++++', response.data.access_token);
      //Resquest payal payment (It will load login page payment detail on the way)
      axios.post(`https://api.sandbox.paypal.com/v1/payments/payment`, dataDetail,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${response.data.access_token}`
          }
        }
      )
        .then(response => {
          const { id, links } = response.data
          const approvalUrl = links.find(data => data.rel == "approval_url").href

          console.log("response", links)
          this.setState({ paypalUrl: approvalUrl });
        }).catch(err => {
          console.log({ ...err })
        })
    }).catch(err => {
      console.log(err)
    })
  };

  /*---End Paypal checkout section---*/

  onWebviewLoadStart = () => {

    if (this.state.shouldShowWebViewLoading) {
      this.setState(
        {
          isWebViewLoading: true,
        }
      )
    }
  }

  _onNavigationStateChange = (webViewState) => {
    console.log("webViewState", webViewState)

    //When the webViewState.title is empty this mean it's in process loading the first paypal page so there is no paypal's loading icon
    //We show our loading icon then. After that we don't want to show our icon we need to set setShouldShowWebviewLoading to limit it
    if (webViewState.title == "") {
      //When the webview get here Don't need our loading anymore because there is one from paypal
      this.setState({ shouldShowWebViewLoading: false })
    }

    if (webViewState.url.includes('https://example.com/')) {

      this.setState({ paypalUrl: null });
      const urlArr = webViewState.url.split(/(=|&)/);

      const paymentId = urlArr[2];
      const payerId = urlArr[10];

      axios.post(`https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`, { payer_id: payerId },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.state.accessToken}`
          }
        }
      )
        .then(response => {
          this.setState({ shouldShowWebViewLoading: true })
          console.log(response)

        }).catch(err => {
          this.setState({ shouldShowWebViewLoading: true })
          console.log({ ...err })
        })

    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container1}>
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
          <Text style={styles.description}>Get unlimited access to all your devices by choosing an auto-renewing subscription plan.</Text>
          <TouchableOpacity style={styles.membership_card} onPress={this.paymonthly}>
            <View style={styles.left_view}>
              <Text style={styles.left_txt}>$ 3.99</Text>
            </View>
            <View style={styles.right_view}>
              <Text style={styles.right_up_txt}>MONTH</Text>
              <Text style={styles.right_down_txt}>0.13 usd / DAY</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.membership_card, { backgroundColor: '#FF334B' }]} onPress={this.paysixmonthly} >
            <View style={styles.left_view}>
              <Text style={styles.left_txt}>$ 23.5</Text>
            </View>
            <View style={[styles.right_view]}>
              <Text style={styles.right_up_txt}>6 MONTHs</Text>
              <Text style={styles.right_down_txt}>0.13 usd / DAY</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.membership_card, { backgroundColor: '#02CB8F' }]} onPress={this.payyearly}>
            <View style={styles.left_view}>
              <Text style={styles.left_txt}>$ 47</Text>
            </View>
            <View style={styles.right_view}>
              <Text style={styles.right_up_txt}>YEAR</Text>
              <Text style={styles.right_down_txt}>0.13 usd / DAY</Text>
            </View>
          </TouchableOpacity>
        </View>
        {this.state.paypalUrl ? (
          <View style={styles.webview}>
            <WebView
              style={{ height: "100%", width: "100%" }}
              source={{ uri: this.state.paypalUrl }}
              onNavigationStateChange={this._onNavigationStateChange}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={false}
              onLoadStart={this.onWebviewLoadStart}
              onLoadEnd={() => this.setState({ isWebViewLoading: false })}
            />
          </View>
        ) : null}
        {this.state.isWebViewLoading ? (
          <View style={{ ...StyleSheet.absoluteFill, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff" }}>
            <ActivityIndicator size="small" color="#A02AE0" />
          </View>
        ) : null}
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


export default connect(mapStateToProps)(Subscription);


const styles = StyleSheet.create({
  container1: {
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
    paddingHorizontal: perfectSize(30),
    paddingTop: perfectSize(10),
    paddingBottom: perfectSize(80),
    borderTopRightRadius: Constants.profile_panel_radius,
    borderTopLeftRadius: Constants.profile_panel_radius,
    borderColor: '#060D1577',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  description: {
    fontFamily: Fonts.semibold,
    fontSize: Constants.normal_font,
    textAlign: 'justify'
  },
  membership_card: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
    width: Constants.button_w,
    height: Constants.button_h * 1.7,
    borderRadius: Constants.button_radius,
    borderBottomRightRadius: 0,
    backgroundColor: '#3369FF'
  },
  left_view: {
    width: Constants.button_w * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'yellow'
  },
  left_txt: {
    fontFamily: Fonts.extrabold,
    fontSize: Constants.big_font,
    color: Colors.fontcolors.white,
  },
  right_view: {
    width: Constants.button_w * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right_up_txt: {
    fontFamily: Fonts.extrabold,
    fontSize: Constants.normal_font,
    color: Colors.fontcolors.white,
  },
  right_down_txt: {
    fontFamily: Fonts.extrabold,
    fontSize: Constants.normal_font,
    color: Colors.fontcolors.white,
  },

  webview: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

