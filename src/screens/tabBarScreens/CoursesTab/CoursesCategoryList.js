import React from 'react';
import { RefreshControl, View, Text, Image, ScrollView, TouchableOpacity, TouchableHighlight, ImageBackground, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faBook, faVideo } from '@fortawesome/free-solid-svg-icons';
import Firebase from '../../../../config/Firebase';
import { Images, Colors, Constants, Fonts, Layoutsd } from '@utils'
import Logo from '../../../component/Logo'
import TrialButton from '../../../component/TrialButton'
import Loader from "react-native-modal-loader";
import { create, PREDEF_RES } from 'react-native-pixel-perfect';
import LinearGradient from 'react-native-linear-gradient';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';


const perfectSize = create(PREDEF_RES.iphoneX.dp);

class CoursesCategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search_text: '',
      // Category List
      categoriesList: [],
      disp_List: [],
      refreshing: false,
      isLoading: false,
    };
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.load_categories();
  }

  showLoader = () => {
    this.setState({ isLoading: true });
  };

  load_categories = () => {
    const self = this;
    const ref = Firebase.database().ref('categories/');
    ref.on('value', function (snapshot) {
      let categories = [];
      snapshot.forEach(function (childSnapshot) {
        if (childSnapshot.val().status) {
          categories.push({
            key: childSnapshot.key,
            ...childSnapshot.val()
          });
        }
      });
      self.setState({
        categoriesList: categories.reverse(),
        disp_List: categories,
        refreshing: false,
        isLoading: false
      });
    });
  }

  componentDidMount() {
    this.showLoader();
    this.load_categories();
  }

  componentWillUnmount() {
    // this.categoriesRef.off();
  }

  makeCategories = () => {
    const { paid } = this.props;
    const { navigate } = this.props.navigation;
    const categories_card = this.state.disp_List.map((category, index) => {
      return (
        <TouchableOpacity key={index} onPress={() => { navigate('CoursesCourseList', { categoryId: category.key }) }}>
          <View style={styles.cardContainer}>
            <Image style={styles.cardPhoto} source={{ uri: category.thumbnailUrl }} />
            <View style={styles.cardTextContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                <View style={styles.courses_view}>
                  {/* <FontAwesomeIcon icon={faBook} color={'#979797'} size={10} />
                  <Text style={styles.cardcourses}>courses: {Object.keys(category.cources).length}</Text> */}
                </View>
              </View>
              <View>
                <View style={styles.card_title_view}>
                  <Text style={styles.card_title}>{this.formatTextEclips(category.name, 20)}</Text>
                </View>
                <View style={styles.card_description_view}>
                  {/* <Text style={styles.card_description}>{this.formatTextEclips(category.description, 30)}</Text> */}
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
    // if (!paid) { categories_card.splice(1, 0, <TrialButton onPress={() => { navigate('Subscription') }} />); }
    return categories_card;
  }

  filterSearch(text) {
    //passing the inserted text in textinput
    const newData = this.state.categoriesList.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      disp_List: newData,
      search_text: text,
    });
  }
  formatTextEclips = (text, length = 20) => {
    return text.length > length ? text.slice(0, length) + '...' : text;
  }

  render() {
    return (
      <>
        {this.state.isLoading ?
          <Loader loading={this.state.isLoading} color="#ff66be" /> :
          <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#000000', '#0e0314', '#230633']} style={styles.linearGradient}>
              <LinearGradient colors={['#000000', '#561E98']} style={styles.linearGradient1}>
                <View style={styles.HeaderArea}>
                  <TouchableHighlight onPress={() => this.props.navigation.goBack()} style={styles.btnContainer}>
                    <FontAwesomeIcon icon={faAngleLeft} color="#561E98" size={perfectSize(25)} />
                  </TouchableHighlight>
                  <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', position: 'absolute', left: 60 }}>MEDITATION COURSES</Text>
                </View>
              </LinearGradient>
              {/* <View style={styles.topContainer}>
                <View style={styles.searchcontainer}>
                  <TextInput style={styles.searchinput}
                    underlineColorAndroid="transparent"
                    placeholder="Search for categories ..."
                    placeholderTextColor="#898F97"
                    autoCapitalize="none"
                    onChangeText={text => this.filterSearch(text)} />
                  <FontAwesomeIcon icon={faSearch} color={'#09121C'} size={perfectSize(20)} />
                </View>
              </View> */}
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                  />
                }
              >
                <View style={styles.centerContainer}>
                  {this.makeCategories()}
                </View>
              </ScrollView>
            </LinearGradient>
          </SafeAreaView>
        }
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.user.email,
    username: state.user.username,
    paid: state.user.paidState
  }
}
export default connect(mapStateToProps)(CoursesCategoryList)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.courses_tab_backgroud,
  },
  topContainer: {
    flexDirection: 'column',
    paddingVertical: perfectSize(10),
  },
  linearGradient: {
    height: '100%',
    width: '100%'
  },
  subtittleText: {
    fontFamily: Fonts.extrabold,
    fontSize: Constants.subtittle_font,
    color: Colors.basic,
    marginLeft: perfectSize(20),
  },

  searchcontainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: Constants.search_h,
    width: Constants.search_w,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderTopRightRadius: Constants.search_h / 2,
    borderBottomRightRadius: Constants.search_h / 2,
    marginTop: perfectSize(5),
  },
  searchinput: {
    width: Constants.search_w - perfectSize(40),
    height: Constants.search_h,
    fontSize: Constants.normal_font,
    textAlign: 'center',
  },

  cardContainer: {
    marginTop: perfectSize(30),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: Constants.category_w + Constants.category_border,
    height: 111,
    borderRadius: 20,
    backgroundColor: Colors.courses_tab,
  },
  cardPhoto: {
    resizeMode: 'cover',
    width: Constants.category_w,
    height: 111,
    borderRadius: 20,
    opacity: 1
  },
  cardTextContainer: {
    width: Constants.category_w,
    height: Constants.category_h,
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  courses_view: {
    marginTop: perfectSize(20),
    marginLeft: perfectSize(10),
    paddingVertical: perfectSize(2),
    paddingHorizontal: perfectSize(5),
    alignSelf: 'flex-end',
    flexDirection: 'row',
    backgroundColor: Colors.category_text_backcolor,
    alignItems: 'center',
    borderRadius: Constants.category_radius * 0.3,
    borderBottomRightRadius: 0,
  },
  cardcourses: {
    marginLeft: perfectSize(5),
    fontFamily: Fonts.extrabolditalic,
    fontSize: Constants.normal_font,
    color: Colors.fontcolors.white,
  },
  card_title_view: {
    paddingHorizontal: perfectSize(15),
    paddingVertical: perfectSize(5),
    // alignSelf: 'center',
    borderRadius: Constants.category_radius * 0.4,
    marginTop: -90
  },
  card_title: {
    fontFamily: Fonts.black,
    fontSize: 18,
    fontWeight: 'bold',
    color: "white",
    marginLeft: 10
  },
  card_description_view: {
    paddingHorizontal: perfectSize(20),
    paddingVertical: perfectSize(5),
    alignSelf: 'center',
    marginTop: perfectSize(5),
    marginBottom: perfectSize(20),
    backgroundColor: Colors.category_text_backcolor,
    borderRadius: Constants.category_radius * 0.3,
    borderBottomRightRadius: 0,
  },
  card_description: {
    fontFamily: Fonts.semibold,
    textAlign: 'center',
    fontSize: Constants.normal_font,
    color: Colors.fontcolors.white,
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
    justifyContent: "center",
  },
  linearGradient1: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
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

