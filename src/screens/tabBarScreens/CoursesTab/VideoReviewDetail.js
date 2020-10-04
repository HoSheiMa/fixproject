import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faSearch, faThumbsUp, faThumbsDown, faAngleDown, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import BackButton from '../../../component/BackButton';
import { Images, Colors, Constants, Fonts, Layoutsd } from '@utils'
import Stars from 'react-native-stars';
import { create, PREDEF_RES } from 'react-native-pixel-perfect'

const perfectSize = create(PREDEF_RES.iphoneX.dp)

class VideoReviewDetail extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Video Review Detial',
            headerLeft: () => <BackButton onPress={() => { navigation.goBack(); }} />
        };
    };
    constructor(props) {
        super(props);
        this.state = {
        }

    }

    componentDidMount = () => {

    }

    make_star_group = (ranking, spacing) => {
        return (
            <Stars
                default={ranking}
                // display={ranking}
                spacing={spacing}
                count={5}
                half={true}
                disabled={true}
                starSize={30}
                fullStar={<Icon name={'star'} style={[styles.myStarStyle]} />}
                halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]} />}
                emptyStar={<Icon name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />} />
        )
    }
    make_review_groups = () => {
        const { reviews, avg_review, review_count } = this.props.navigation.state.params;
        console.log('reviews', reviews);
        const review_groups = reviews.map((review, index) => {
            return (
                <View>
                    <View style={styles.review_part}>
                        <View style={styles.cardImagecontainer}>
                            <Image source={Images.user_image} style={styles.cardImage} />
                        </View>
                        <View style={styles.txt_view}>
                            <Text style={styles.review_name_txt}>{review.uploader.name}</Text>
                            <Text style={styles.review_date_txt}>{review.date}</Text>
                            <Text style={styles.review_content_txt}>{review.contents}</Text>
                            <View style={{ alignSelf: 'flex-start' }}>
                                {this.make_star_group(review.score, 3)}
                            </View>
                        </View>
                    </View>
                    <View style={styles.line} />
                </View>
            );
        })
        return review_groups;
    }

    render() {
        const { navigate } = this.props.navigation;
        const { make_star_group, formatTextEclips, make_review_groups } = this;
        const { reviews, avg_review, review_count } = this.props.navigation.state.params;
        // const mark = parseInt(this.state.r_avg, 10);
        // console.log('mark', mark);
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.star_ranking}>
                    {make_star_group(avg_review, 6)}
                    <Text style={styles.review_avg}>{avg_review}</Text>
                </View>
                <Text style={styles.review_count_txt}>{review_count} reviews</Text>
                <View style={styles.shortline} />
                <ScrollView>
                    {make_review_groups()}
                </ScrollView>
            </SafeAreaView>
        );
    }
}


export default (VideoReviewDetail);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.courses_tab_background,
    },
    myStarStyle: {
        color: 'yellow',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    myEmptyStarStyle: {
        color: 'white',
    },

    star_ranking: {
        paddingVertical: perfectSize(10),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },

    review_avg: {
        fontFamily: Fonts.semibold,
        fontSize: Constants.description_font,
        color: Colors.fontcolors.little,
        paddingHorizontal: perfectSize(20)
    },
    review_count_txt: {
        alignSelf: 'center',
        fontFamily: Fonts.bold,
        fontSize: Constants.normal_font,
    },
    shortline: {
        marginVertical: perfectSize(20),
        width: perfectSize(100),
        height: perfectSize(3),
        alignSelf: 'center',
        backgroundColor: 'gray'
    },
    line: {
        marginVertical: perfectSize(20),
        width: Constants.screen_w - perfectSize(100),
        height: perfectSize(1),
        alignSelf: 'center',
        backgroundColor: 'gray'
    },
    review_part: {
        alignSelf: 'center',
        flexDirection: 'row',
        paddingVertical: perfectSize(10),
    },
    cardImagecontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Constants.review_avartar_size + perfectSize(2),
        height: Constants.review_avartar_size + perfectSize(2),
        borderRadius: Constants.review_avartar_size * 0.5 + perfectSize(1),
        backgroundColor: Colors.primary_text,
    },
    cardImage: {
        width: Constants.review_avartar_size,
        height: Constants.review_avartar_size,
        borderRadius: Constants.review_avartar_size * 0.5,
    },
    txt_view: {
        width: Constants.screen_w * 0.7,
        paddingHorizontal: perfectSize(10),
    },
    review_name_txt: {
        fontFamily: Fonts.extrabold,
        fontSize: Constants.description_font,
        color: Colors.fontcolors.strong,
    },
    review_date_txt: {
        fontFamily: Fonts.semibolditalic,
        fontSize: Constants.small_font,
        color: Colors.fontcolors.little,
    },
    review_content_txt: {
        marginVertical: perfectSize(10),
        fontFamily: Fonts.semibold,
        fontSize: Constants.normal_font,
        color: Colors.fontcolors.strong,
        textAlign: 'justify'
    },

});

