import React from 'react';
import { View, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import { PLAYER_STATES } from 'react-native-media-controls';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';
import { Images, Colors, Constants, Fonts, Layoutsd } from '@utils'
import { create, PREDEF_RES } from 'react-native-pixel-perfect';

const perfectSize = create(PREDEF_RES.iphoneX.dp);

export default class VideoPlayer extends React.Component {
    videoPlayer;
    constructor(props) {
        super(props)
        this.state = {
            video_url: this.props.video_url,
            fullscreen: false,
            currentTime: 0,
            duration: 0,
            showControls: true,
            isLoading: true,
            paused: true,
            playerState: PLAYER_STATES.PLAYING,
            screenType: 'contain'
        }
    }

    _onOrientationDidChange = (orientation) => {
        if (orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT') {
            //do something with landscape left layout
            this.setState({ fullscreen: true });
            StatusBar.setHidden(true);
        } else {
            //do something with portrait layout
            this.setState({ fullscreen: false });
            StatusBar.setHidden(false);
        }
    };

    componentDidMount() {
        Orientation.addOrientationListener(this._onOrientationDidChange);
    }

    componentWillUnmount() {
        Orientation.removeOrientationListener(this._onOrientationDidChange);
    }

    onSeek = (seek) => {
        this.videoPlayer.seek(seek);
    };
    onPaused = (playerState) => {
        this.setState({
            paused: !this.state.paused,
            playerState,
        });
    };
    onReplay = () => {
        this.setState({ playerState: PLAYER_STATES.PLAYING });
        this.videoPlayer.seek(0);
    };
    onProgress = data => {
        const { isLoading, playerState } = this.state;
        // Video Player will continue progress even if the video already ended
        if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
            this.setState({ currentTime: data.currentTime });
        }
    };
    onLoad = (data) => {
        this.setState({ duration: data.duration, isLoading: false });
    }
    onLoadStart = (data) => {
        this.setState({ isLoading: true });
    }
    onEnd = () => {
        this.setState({ playerState: PLAYER_STATES.ENDED });
    }
    onError = () => {
        alert('Oh! ', error);
    }
    exitFullScreen = () => {
        alert("Exit full screen");
    };

    enterFullScreen = () => { };

    onFullScreen = () => {
        console.log('on fullscreen');
    };

    onSeeking = currentTime => this.setState({ currentTime });

    handleFullscreen = () => {
        this.state.fullscreen
            ? Orientation.unlockAllOrientations()
            : Orientation.lockToLandscapeLeft();
    }

    render() {
        return (

            <View>
                <Video
                    onEnd={this.onEnd}
                    onLoad={this.onLoad}
                    onLoadStart={this.onLoadStart}
                    onProgress={this.onProgress}
                    controls={true}
                    paused={this.state.paused}
                    ref={videoPlayer => (this.videoPlayer = videoPlayer)}
                    resizeMode={this.state.screenType}
                    onFullScreen={this.state.fullscreen}
                    source={{ uri: this.props.video_url }}
                    style={this.state.fullscreen ? styles.fullscreenVideo : styles.video}
                    volume={100}
                />
                <View style={styles.controlOverlay}>
                    <TouchableOpacity
                        onPress={this.handleFullscreen}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        style={styles.fullscreenButton}>
                        {this.state.fullscreen ?
                            <FontAwesomeIcon style={styles.iconstyle} icon={faExpand} color={'#898F97'} size={perfectSize(30)} />
                            : <FontAwesomeIcon style={styles.iconstyle} icon={faCompress} color={'#898F97'} size={perfectSize(30)} />}
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    video: {
        height: Constants.video_h,
        width: Constants.video_w,
        backgroundColor: 'black',
    },
    fullscreenVideo: {
        height: Constants.screen_w,
        width: Constants.screen_h,
        backgroundColor: 'black',
    },
    fullscreenButton: {
        alignSelf: 'flex-end',
        marginTop: perfectSize(20),
        marginRight: perfectSize(20),
    },
    controlOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        // backgroundColor: '#000000c4',
        justifyContent: 'space-between',
    },
});

