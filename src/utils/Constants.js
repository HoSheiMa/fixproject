import { Dimensions } from 'react-native';
import { create, PREDEF_RES } from 'react-native-pixel-perfect'

const perfectSize = create(PREDEF_RES.iphoneX.dp)

const width = Dimensions.get('window').width < Dimensions.get('window').height ? Dimensions.get('window').width : Dimensions.get('window').height
const height = Dimensions.get('window').width < Dimensions.get('window').height ? Dimensions.get('window').height : Dimensions.get('window').width

const Constants = {
  screen_w: width,
  screen_h: height,

  Spanel_w: width,// - perfectSize(35),
  Spanel_h: height,// - perfectSize(35),
  Spanel_radius: perfectSize(35),

  logo_w: width * 0.3,
  intro_logo_w: width * 0.07,

  forgot_w: width - perfectSize(60),
  forgot_h: height - perfectSize(60),
  forgot_radius: perfectSize(35),

  big_font: width * 0.09,
  subtittle_font: width * 0.07,
  description_font: width * 0.05,
  normal_font: width * 0.04,
  small_font: width * 0.03,
  // big_font: perfectSize(40),
  // subtittle_font: perfectSize(30),
  // description_font: perfectSize(20),
  // normal_font: perfectSize(17),
  // small_font: perfectSize(15),

  input_w: width * 0.7,
  input_h: height * 0.06,
  input_radius: perfectSize(20),

  button_w: width * 0.7,
  button_h: height * 0.06,
  button_radius: height * 0.03,

  homecard_size: width * 0.4,
  homecard_margin: (width - 2 * width * 0.4) / 3,
  homecard_radius: perfectSize(30),
  homecard_border: 2 * perfectSize(0.5),

  // coursecard_size: width * 0.38,
  // coursecard_margin: (width - 2 * width * 0.38) / 6,
  // coursecard_radius: perfectSize(30),


  search_h: height * 0.06,
  search_w: width * 0.7,

  category_w: width * 0.9,
  category_h: width * 0.9 * 0.6,
  category_radius: perfectSize(40),
  category_border: 2 * perfectSize(1),

  course_w: width * 0.9,
  course_h: width * 0.9 * 0.5,
  course_radius: perfectSize(40),
  course_border: 2 * perfectSize(1),


  course_vw: width * 0.9,
  course_vh: height * 0.15,
  course_vradius: perfectSize(30),

  talks_bottom_w: width * 0.9,
  talks_bottom_h: height - perfectSize(550),
  talks_bottom_radius: perfectSize(35),
  talks_card_size: width * 0.2,
  talks_card_radius: perfectSize(20),
  talks_card_margin: (width * 0.9 - width * 0.2 * 3) / 4,

  profile_panel_w: width * 0.9,
  profile_panel_th: height * 0.33,
  profile_panel_sh: height * 0.02,
  profile_panel_bh: height * 0.6,
  profile_panel_radius: perfectSize(35),


  review_avartar_size: width * 0.2,

  video_w: width,
  video_h: width * (9 / 16),

}

export default Constants;
