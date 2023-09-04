import { FC, memo, useRef } from "react";
import { Animated, Easing, PanResponder, View } from 'react-native';
import { ITodo } from "../../../../models/todo";
import { IconButton, List, MD3Colors } from "react-native-paper";
import { styles } from "./styles";
import { TRemoveTodo, TUpdateTodo } from "../../../../interfaces/actions";

interface IProps extends  ITodo {
  onPress: TUpdateTodo;
  onPressRemove: TRemoveTodo;
  onPressEdit: (todo: ITodo) => void;
}

const TARGET = 70;

export const TodoItem: FC<IProps> = memo(({ onPress, onPressRemove, onPressEdit, ...todo }) => {
  const { id, list_id, checked, text} = todo;

  const translateX = useRef(new Animated.Value(0)).current
  const offset = useRef(0);

  const animate = (toValue: number) => {
    offset.current = toValue;
    Animated.timing(translateX, {
      toValue,
      duration: 200,
      delay: 0,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease)
    }).start();
  }

  const responder = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dx > 5 || gestureState.dx < -5,
    onPanResponderMove: (e, gestureState) => {
      Animated.event([null, { dx: translateX }], { useNativeDriver: false })(e, gestureState);
    },
    onPanResponderRelease: (_, gestureState) => {
      const val = gestureState.dx

      if (val < 0) {
        if (val < -TARGET) {
          animate(-TARGET);
        } else {
          animate(0)
        }
      } else {
        if (val > TARGET) {
          animate(TARGET);
        } else {
          animate(0)
        }
      }
    },
  })).current

  return (
    <View style={styles.container}>
      <IconButton icon="delete" iconColor={MD3Colors.error60} onPress={() => onPressRemove(list_id, id)} />
      <IconButton icon="pencil" iconColor={MD3Colors.primary40} onPress={() => onPressEdit(todo)} />
      <Animated.View style={[styles.task, { transform: [{ translateX }]}]} {...responder.panHandlers}>
        <List.Item
          title={text}
          onPress={() => onPress(list_id, id, { checked: !checked })}
          style={styles.task__mask}
          titleStyle={{ textDecorationLine: checked ? 'line-through' : 'none' }}
        />
      </Animated.View>
    </View>
  )
})
