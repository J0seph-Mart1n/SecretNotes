import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useTheme } from '@/hooks/ThemeContext';

export default function CustomDrawer(props: any) {
  const { colors } = useTheme();

  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: colors.card }}>
      <View style={[styles.headerContainer, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerText, { color: colors.text }]}>My Notes</Text>
      </View>
      <View style={styles.listContainer}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 30, // Adds space above for the safe area
    paddingHorizontal: 24,
    paddingBottom: 24,
    marginBottom: 8,
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
  },
  listContainer: {
    paddingHorizontal: 8,
  }
});
