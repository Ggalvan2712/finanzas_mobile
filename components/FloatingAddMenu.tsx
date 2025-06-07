import { useRef, useState } from 'react';
import { Animated, View, Pressable, Text, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { Colors } from '@/context/ThemeContext';

interface Props {
  colors: Colors;
  onIngreso: () => void;
  onDeuda: () => void;
  onGasto: () => void;
}

export default function FloatingAddMenu({
  colors,
  onIngreso,
  onDeuda,
  onGasto,
}: Props) {
  const [open, setOpen] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  const toggle = () => {
    Animated.spring(anim, {
      toValue: open ? 0 : 1,
      useNativeDriver: true,
    }).start();
    setOpen(!open);
  };

  const optionStyle = (index: number) => ({
    opacity: anim,
    transform: [
      {
        translateX: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -(64 * (index + 1))],
        }),
      },
      { scale: anim },
    ],
  });

  const debtColor = '#d04545';

  return (
    <View
      pointerEvents="box-none"
      style={[styles.wrapper, { bottom: insets.bottom + 16 }]}
    >
      <Animated.View style={[styles.option, optionStyle(0)]} pointerEvents={open ? 'auto' : 'none'}>
        <Pressable
          style={[styles.optionBtn, { backgroundColor: colors.primary }]}
          onPress={() => {
            toggle();
            onIngreso();
          }}
        >
          <MaterialIcons name="trending-up" size={24} color="#fff" />
        </Pressable>
        <Text style={[styles.label, { color: colors.text }]}>Ingreso</Text>
      </Animated.View>

      <Animated.View style={[styles.option, optionStyle(1)]} pointerEvents={open ? 'auto' : 'none'}>
        <Pressable
          style={[styles.optionBtn, { backgroundColor: debtColor }]}
          onPress={() => {
            toggle();
            onDeuda();
          }}
        >
          <MaterialIcons name="trending-down" size={24} color="#fff" />
        </Pressable>
        <Text style={[styles.label, { color: colors.text }]}>Deuda</Text>
      </Animated.View>

      <Animated.View style={[styles.option, optionStyle(2)]} pointerEvents={open ? 'auto' : 'none'}>
        <Pressable
          style={[styles.optionBtn, { backgroundColor: colors.accent }]}
          onPress={() => {
            toggle();
            onGasto();
          }}
        >
          <MaterialIcons name="receipt-long" size={24} color="#fff" />
        </Pressable>
        <Text style={[styles.label, { color: colors.text }]}>Gasto</Text>
      </Animated.View>

      <Pressable
        style={[styles.addButton, { backgroundColor: colors.primary }]}
        onPress={toggle}
        accessibilityLabel="Agregar"
      >
        <Text style={[styles.addText, { color: '#fff' }]}>{open ? '×' : '＋'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    right: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  option: {
    alignItems: 'center',
    marginRight: 8,
  },
  optionBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    fontSize: 32,
    lineHeight: 32,
    fontWeight: '600',
  },
});
