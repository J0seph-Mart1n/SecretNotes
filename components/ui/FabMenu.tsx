import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type FabMenuProps = {
  onNewNote?: () => void;
};

export default function FabMenu({ onNewNote }: FabMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animation, {
      toValue: isMenuOpen ? 1 : 0,
      useNativeDriver: true,
      friction: 6,
      tension: 60,
    }).start();
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {/* Overlay Background */}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 10,
            opacity: animation
          }
        ]}
        pointerEvents={isMenuOpen ? 'auto' : 'none'}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={() => setIsMenuOpen(false)} />
      </Animated.View>

      {/* Separate Option Bubbles */}
      <View style={styles.bubblesContainer} pointerEvents={isMenuOpen ? 'box-none' : 'none'}>
        <Animated.View style={[
          styles.bubbleWrapper,
          {
            opacity: animation,
            transform: [
              { translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) },
              { scale: animation.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }) }
            ]
          }
        ]}>
          <TouchableOpacity style={styles.bubbleItem}>
            <Ionicons name="brush-outline" size={20} color="#fff" />
            <Text style={styles.menuItemText}>Drawing</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[
          styles.bubbleWrapper,
          {
            opacity: animation,
            transform: [
              { translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) },
              { scale: animation.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }) }
            ]
          }
        ]}>
          <TouchableOpacity style={styles.bubbleItem}>
            <Ionicons name="list-outline" size={20} color="#fff" />
            <Text style={styles.menuItemText}>List</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[
          styles.bubbleWrapper,
          {
            opacity: animation,
            transform: [
              { translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [60, 0] }) },
              { scale: animation.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }) }
            ]
          }
        ]}>
          <TouchableOpacity 
            style={styles.bubbleItem} 
            onPress={() => {
              toggleMenu();
              if (onNewNote) onNewNote();
            }}
          >
            <Ionicons name="document-text-outline" size={20} color="#fff" />
            <Text style={styles.menuItemText}>Notes</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={toggleMenu}
      >
        <Animated.View style={{
          transform: [{
            rotate: animation.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '45deg']
            })
          }]
        }}>
          <Ionicons name="add" size={32} color="#121212" />
        </Animated.View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#a8c7fa',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 20,
  },
  bubblesContainer: {
    position: 'absolute',
    bottom: 96,
    right: 24,
    width: 160,
    alignItems: 'flex-end',
    zIndex: 20,
  },
  bubbleWrapper: {
    marginBottom: 12,
  },
  bubbleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#2c2c2c',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  menuItemText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
  },
});
