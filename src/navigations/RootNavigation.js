import React from 'react';
import { TouchableHighlight, StyleSheet, Image, Text, View, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { create, PREDEF_RES } from 'react-native-pixel-perfect';
const perfectSize = create(PREDEF_RES.iphoneX.dp);

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import SplashScreen from '../screens/GetStart/SplashScreen';
import StartScreen from '../screens/GetStart/GetStart';
import IntroVideo from '../screens/GetStart/IntroVideo';
import Introslider1 from '../screens/GetStart/Introslider1';
import Introslider2 from '../screens/GetStart/Introslider2';
import Introslider3 from '../screens/GetStart/Introslider3';
import SignInScreen from '../screens/SignIn';
import SignUpScreen from '../screens/Signup';
import WelcomeScreen from '../screens/Welcome';
import SubscriptionScreen from '../screens/Subscription';
import ApplePayScreen from '../screens/ApplePayScreen';
import EmailInputScreen from '../screens/ForgetPassword/EmailInputScreen';
import ConfirmCodeScreen from '../screens/ForgetPassword/ConfirmCodeScreen';
import ResetPasswordScreen from '../screens/ForgetPassword/ResetPasswordScreen';
import TabBarScreen from './TabBarNavigation'

// import { fadeIn, fromLeft  } from 'react-navigation-transitions'; // no working

class NavigationDrawerStructure extends React.Component {
    goBack = () => {
        this.props.navigationProps.goBack();
    };
    render() {
        return (
            <SafeAreaView style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
                <TouchableHighlight onPress={this.goBack.bind(this)} style={styles.btnContainer}>
                    <FontAwesomeIcon icon={faAngleLeft} color={'white'} size={perfectSize(35)} />
                </TouchableHighlight>
                <Text style={{ color: '#fff', fontSize: 25, marginLeft: 20 }}>INNERWONDOERS</Text>
            </SafeAreaView>
        );
    }
}

NavigationDrawerStructure.propTypes = {
    onPress: PropTypes.func,
    source: PropTypes.number,
    title: PropTypes.string
};

const styles = StyleSheet.create({
    btnContainer: {
        width: perfectSize(27),
        height: perfectSize(27),
        alignItems: 'center',
        margin: perfectSize(25),
    },
});

const AppStack = createStackNavigator(
    {
        StartScreen: {
            screen: StartScreen,
            navigationOptions: {
                headerShown: false,
            }
        },
        // IntroVideo: {
        //     screen: IntroVideo,
        //     navigationOptions: {
        //         headerShown: false,
        //     }
        // },
        Introslider1: {
            screen: Introslider1,
            navigationOptions: {
                headerShown: false,
            }
        },
        Introslider2: {
            screen: Introslider2,
            navigationOptions: {
                headerShown: false,
            }
        },
        Introslider3: {
            screen: Introslider3,
            navigationOptions: {
                headerShown: false,
            }
        },
        SignIn: {
            screen: SignInScreen,
            navigationOptions: {
                headerShown: false,
            }
        },
        SignUp: {
            screen: SignUpScreen,
            navigationOptions: {
                headerShown: false,
            }
        },
        Welcome: {
            screen: WelcomeScreen,
            navigationOptions: {
                headerShown: false,
            }
        },
        EmailInputScreen: {
            screen: EmailInputScreen,
            navigationOptions: {
                headerShown: false,
            }
        },
        ConfirmCodeScreen: {
            screen: ConfirmCodeScreen,
            navigationOptions: {
                headerShown: false,
            }
        },
        ResetPasswordScreen: {
            screen: ResetPasswordScreen,
            navigationOptions: {
                headerShown: false,
            }
        },
        WelcomeScreen: {
            screen: WelcomeScreen,
            navigationOptions: {
                headerShown: false,
            }
        },
        SubscriptionScreen: {
            screen: SubscriptionScreen,
            navigationOptions: {
                headerShown: false,
            }
        },
        ApplePayScreen: {
            screen: ApplePayScreen,
            navigationOptions: {
                headerShown: false,
            }
        },
        TabBar: {
            screen: TabBarScreen,
            navigationOptions: {
                headerShown: false,
            }
        },
    },
    {
        initialRouteName: 'Introslider1',
        headerMode: 'none',
        defaultNavigationOptions: {
            // ...TransitionPresets.SlideFromRightIOS,
            // ...TransitionPresets.DefaultTransition,
            gestureEnabled: true,
        },
    }
)

// const App = createAppContainer(FirstNavigation);

// export default App;

export default createAppContainer(
    createSwitchNavigator(
        {
            Splash: SplashScreen,
            App: AppStack
        },
        {
            initialRouteName: 'Splash'
        }
    )
);