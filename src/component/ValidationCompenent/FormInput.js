import React, { useState, useEffect } from 'react'
import { Input } from 'react-native-elements'
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base';
import { Images, Colors, Constants, Fonts, Layoutsd } from '@utils'
import { create, PREDEF_RES } from 'react-native-pixel-perfect'
import OcticonsIcon from 'react-native-vector-icons/Octicons'
const perfectSize = create(PREDEF_RES.iphoneX.dp)
// screen sizing
const { width, height } = Dimensions.get('window');

// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
const SCREEN_HEIGHT = width < height ? height : width;

export default function FormInput({
  iconName,
  iconColor,
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  value,
  inputStyle,
  inputContainerStyle,
  ShowIcon,
  ...rest
}) {
  const m=1;
  const [post, setpost] = useState(false);
  useEffect(() => {
    if (ShowIcon == true) {
      setpost(true)
      // alert("sdfsdsdfsdfsdf")
    }
  },[m])
  // const [ShowIcon, setShowIcon] = useState(true);
  return (
    <View style={styles.inputContainer}>
      <Input
        {...rest}
        // rightIcon={<Icon name={iconName} style={{ fontSize: perfectSize(25), color: iconColor}} />}
        leftIconContainerStyle={styles.iconStyle}
        placeholderTextColor="grey"
        name={name}
        value={value}
        secureTextEntry={post}
        placeholder={placeholder}
        inputStyle={inputStyle}
        inputContainerStyle={inputContainerStyle}
      />
      {ShowIcon == true ?
        <TouchableOpacity style={{ zIndex: 1000, marginLeft: -30, width: 30, }} onPress={() => { setpost(!post) }}>
          <OcticonsIcon name={post == false ? "eye" : "eye-closed"} resizeMode='stretch' size={18} style={{ color: "gray", marginTop: 20, marginLeft: 8 }} />
        </TouchableOpacity> : null
      }

    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    // backgroundColor:'#f3f0eb', 
    borderColor: '#2E353E',
    // borderWidth: 1,
    // borderRadius: Constants.input_radius,
    borderBottomWidth: 1,
    borderBottomRightRadius: 0,
    flexDirection: 'row'
  },
  iconStyle: {
    marginRight: perfectSize(10)
  },
})

