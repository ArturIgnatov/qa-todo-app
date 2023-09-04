import { StyleSheet } from "react-native";
import {MD3Colors} from "react-native-paper";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: MD3Colors.neutralVariant95,
  },

  task: {
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'white',
  },

  task__mask: {
    height: 55
  }
})
