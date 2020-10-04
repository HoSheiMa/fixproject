import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from './Styles';

export default class SliderEntry extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object,
        navigateTalk: PropTypes.func
    };

    get image () {
        const { data: { thumbnail }, parallax, parallaxProps, even } = this.props;
        return parallax ? (
            <ParallaxImage
              source={{ uri: thumbnail }}
              containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
              style={styles.image}
              parallaxFactor={0.35}
              showSpinner={true}
              spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
              {...parallaxProps}
            />
        ) : (
            <Image
              source={{ uri: thumbnail }}
              style={styles.image}
            />
        );
    }
    formatTime = (time) => {
      time = ~~(time);
      // console.log('time=', time);
      const second = time % 60;
      const minute = Math.floor(time / 60) % 60;
      const hour = Math.floor(time / 3600);
      return this.formatTimeString(hour) + ':' + this.formatTimeString(minute) + ':' + this.formatTimeString(second);
    }
  
    formatTimeString = (num) => {
      return ('00' + String(num)).slice(-2);
    }
  
    formatTextEclips = (text, length = 20) => {
      return text.length > length ? text.slice(0, length) + '...' : text;
    }
  
    render () {
        const { data: { title, time, uploader }, even } = this.props;
        const uppercaseTitle = title ? (
            <Text
              style={[styles.title, even ? styles.titleEven : {}]}
              numberOfLines={2}
            >
                { this.formatTextEclips(title.toUpperCase()) }
            </Text>
        ) : false;
        
        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={this.props.navigateTalk}
            //   onPress={() => {navigate('TalkDetail') }}
              >
                <View style={styles.shadow} />
                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                    { this.image }
                    <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
                </View>
                <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                    { uppercaseTitle }
                    <Text
                      style={[styles.subtitle, even ? styles.subtitleEven : {}]}
                      numberOfLines={2}
                    >
                        { this.formatTime(time) }
                    </Text>
                    <Text
                      style={[styles.subtitle, even ? styles.subtitleEven : {}]}
                      numberOfLines={2}
                    >
                        { uploader.name }
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

}
