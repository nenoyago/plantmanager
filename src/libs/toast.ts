import Toast, { ToastOptions } from "react-native-tiny-toast";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export const DangerToast = {
  position: Toast.position.TOP,
  duration: 3000,
  textColor: colors.white,
  textStyle: {
    fontFamily: fonts.text
  },
  containerStyle: {
    backgroundColor: colors.red,
    padding: 16
  }
} as ToastOptions;

export const SuccesToast = {
  position: Toast.position.TOP,
  duration: 3000,
  textColor: colors.white,
  textStyle: {
    fontFamily: fonts.text
  },
  containerStyle: {
    backgroundColor: colors.green,
    padding: 16
  }
} as ToastOptions;