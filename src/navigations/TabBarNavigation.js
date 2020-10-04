import React from 'react';
import { Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import color from '../utils/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faPhotoVideo, faComment, faUser } from '@fortawesome/free-solid-svg-icons'
import {
  HomeList, HomeCoursesDetail, HomeVideoDetail, HVideoDetail, HVideoReviewDetail,
  CoursesCategoryList, CoursesCourseList, CoursesVideoList, CoursesVideoDetail, VideoDetail, VideoReviewDetail,
  TalkList, TalkDetail, ProfileScreen, Subscription, Progress
} from '../screens/tabBarScreens';
import FavoriteList from '../screens/tabBarScreens/FavoriteTab/FavoriteList'
import Settings from '../screens/tabBarScreens/ProfileTab/Settings'
import About from '../screens/tabBarScreens/ProfileTab/About'
import Privacy from '../screens/tabBarScreens/ProfileTab/Privacy'
import Rate from '../screens/tabBarScreens/ProfileTab/Rate'
import Account from '../screens/tabBarScreens/ProfileTab/Account'
import Purchase from '../screens/tabBarScreens/ProfileTab/Purchase'
import Terms from '../screens/tabBarScreens/ProfileTab/Terms'
import { create, PREDEF_RES } from 'react-native-pixel-perfect';
import Player1Screen from '../screens/tabBarScreens/CoursesTab/Player1'
import Player2Screen from '../screens/tabBarScreens/CoursesTab/Player2'
import Player3Screen from '../screens/tabBarScreens/CoursesTab/Player3'
import CompletedScreen from '../screens/tabBarScreens/CoursesTab/Completed'
import InviteFriendScreen from '../screens/tabBarScreens/ProfileTab/InviteFriend'

const perfectSize = create(PREDEF_RES.iphoneX.dp);
const icon_size = perfectSize(27);

const Home = createStackNavigator(
  {
    HomeList: {
      screen: HomeList,
      navigationOptions: {
        headerShown: false,
      }
    },
    HomeCoursesDetail: { screen: HomeCoursesDetail },
    HomeVideoDetail: { screen: HomeVideoDetail },
    HVideoDetail: { screen: HVideoDetail },
    HVideoReviewDetail: { screen: HVideoReviewDetail },
  },
  {
    initialRouteName: 'HomeList',
  }
);

Home.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === "HomeVideoDetail" || route.routeName === "HVideoDetail" || route.routeName === "HVideoReviewDetail") {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }
  return {
    tabBarVisible
  };
};


const Courses = createStackNavigator(
  {
    CoursesCategoryList: {
      screen: CoursesCategoryList,
      navigationOptions: {
        headerShown: false,
      }
    },
    CoursesCourseList: {
      screen: CoursesCourseList,
      navigationOptions: {
        headerShown: false,
      }
    },
    CoursesVideoList: { screen: CoursesVideoList },
    CoursesVideoDetail: { screen: CoursesVideoDetail },
    Player1: {
      screen: Player1Screen,
      navigationOptions: {
        headerShown: false,
      }
    },
    Player2: {
      screen: Player2Screen,
      navigationOptions: {
        headerShown: false,
      }
    },
    Player3: {
      screen: Player3Screen,
      navigationOptions: {
        headerShown: false,
      }
    },
    Completed: {
      screen: CompletedScreen,
      navigationOptions: {
        headerShown: false,
      }
    },
    VideoDetail: { screen: VideoDetail },
    VideoReviewDetail: { screen: VideoReviewDetail },
  },
  {
    initialRouteName: 'CoursesCategoryList',
  }
);

Courses.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === "CoursesVideoDetail" || route.routeName === "VideoDetail" || route.routeName === "Player1" || route.routeName === "Player2" || route.routeName === "Player3" || route.routeName === "Completed" || route.routeName === "VideoReviewDetail") {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }
  return {
    tabBarVisible
  };
};

const Favorites = createStackNavigator(
  {
    FavoriteList: {
      screen: FavoriteList,
      navigationOptions: {
        headerShown: false,
      }
    }
  },
  {
    initialRouteName: 'FavoriteList',
  }
);

Favorites.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === "FavoriteList") {
        tabBarVisible = true;
      }
      // else {
      //   tabBarVisible = true;
      // }
    });
  }
  return {
    tabBarVisible
  };
};


const Talks = createStackNavigator(
  {
    TalkList: {
      screen: TalkList,
      navigationOptions: {
        headerShown: false,
      }
    },
    TalkDetail: { screen: TalkDetail },
  },
  {
    initialRouteName: 'TalkList',
  }
);

const Profile = createStackNavigator(
  {
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: {
        headerShown: false,
      }
    },
    Subscription: { screen: Subscription },
    Settings: {
      screen: Settings,
      navigationOptions: {
        headerShown: false,
      }
    },
    About: {
      screen: About,
      navigationOptions: {
        headerShown: false,
      }
    },
    Privacy: {
      screen: Privacy,
      navigationOptions: {
        headerShown: false,
      }
    },
    Rate: {
      screen: Rate,
      navigationOptions: {
        headerShown: false,
      }
    },
    Purchase: {
      screen: Purchase,
      navigationOptions: {
        headerShown: false,
      }
    },
    Account: {
      screen: Account,
      navigationOptions: {
        headerShown: false,
      }
    },
    InviteFriend: {
      screen: InviteFriendScreen,
      navigationOptions: {
        headerShown: false,
      }
    },
    Terms: {
      screen: Terms,
      navigationOptions: {
        headerShown: false,
      }
    },
    Progress: { screen: Progress },
  },
  {
    initialRouteName: 'ProfileScreen',
  }
);

Profile.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === "InviteFriend") {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }
  return {
    tabBarVisible
  };
};
const TabNavigation = createBottomTabNavigator(
  {
    Home,
    Courses,
    Favorites,
    Talks,
    Profile,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Icon;
        let iconName;
        var ImageUrl;
        if (routeName === 'Home') {
          iconName = 'faArrowLeft';
          if (focused === true) {
            tintColor = color.home_tab;
          }
          return <FeatherIcon name="home" color={tintColor} size={30} />
        } else if (routeName === 'Courses') {
          iconName = 'faArrowLeft';
          if (focused === true) {
            tintColor = color.courses_tab;
            ImageUrl = require('../Images/flowerIcon_select.png')
          } else {
            ImageUrl = require('../Images/flowerIcon.png')
          }
          return <Image source={ImageUrl} color={tintColor} style={{ width: 40, height: 30 }} />
        } else if (routeName === 'Favorites') {
          if (focused === true) {
            tintColor = color.favorite_tab;
          }
          return <FeatherIcon name="heart" color={tintColor} size={30} />
        }
        else if (routeName === 'Talks') {
          iconName = 'faArrowLeft';
          if (focused === true) {
            tintColor = color.talks_tab;
          }
          return <FontAwesome5Icon name="microphone-alt" color={tintColor} size={30} />
        } else if (routeName === 'Profile') {
          iconName = 'faArrowLeft';
          if (focused === true) {
            tintColor = color.profile_tab;
          }
          return <FeatherIcon name="grid" color={tintColor} size={30} />
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: "#9435D0",
      inactiveTintColor: "white",
      style: {
        backgroundColor: '#38354B',
        //----------add this line------------------------//
        height: perfectSize(70),
      },
      labelStyle: {
        marginTop: perfectSize(-10),
        marginBottom: perfectSize(10),
        fontSize: perfectSize(13),
      },
    },
  },
);

export default createAppContainer(TabNavigation);




