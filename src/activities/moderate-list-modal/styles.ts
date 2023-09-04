import { StyleSheet } from "react-native";
import { MD3Colors } from "react-native-paper";

export const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
    padding: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  container: {
    width: '100%',
    maxHeight: 500,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: MD3Colors.secondary95,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'column'
  },

  categories: {
    height: 'auto',
    backgroundColor: 'red',
  },

  category: {
    paddingVertical: 0,
    paddingRight: 3,
    borderRadius: 6,
    overflow: 'hidden'
  },

  controls: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    width: '100%',
  },

  controls__input: {
    width: '80%',
  }
})
