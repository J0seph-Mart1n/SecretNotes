import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import FabMenu from '@/components/Common/FabMenu';
import { useTheme } from '@/hooks/ThemeContext';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

// Extracted Theme Colors
const colors = {
  surface: '#f9f6f5',
  onSurface: '#2f2f2e',
  onSurfaceVariant: '#5c5b5b',
  surfaceContainerLow: '#f3f0ef',
  surfaceContainerHighest: '#dfdcdc',
  surfaceContainerLowest: '#ffffff',
  primary: '#0058bc',
  accent: '#6750A4',
  accentLight: 'rgba(103, 80, 164, 0.1)',
  outlineVariant: '#afadac',
  highlightBg: 'rgba(109, 159, 255, 0.2)', // #6d9fff/20
  highlightText: '#00214f',
  text: '#ffffff'
};

// Mock Data
const journalEntries =[
  {
    id: '1',
    emoji: '🌿',
    emojiBg: 'rgba(134, 248, 152, 0.3)', // secondary-container/30
    title: 'Forest Walk',
    date: 'October 8, 2023 • 04:20 PM',
    snippet: 'The light filtering through the canopy was ethereal today. I spent nearly two hours just listening to the rustle of leaves. Feeling much more grounded than this morning...',
    tags: ['Nature', 'Reflection'],
  },
  {
    id: '2',
    emoji: '✨',
    emojiBg: 'rgba(251, 188, 5, 0.3)', // tertiary-container/30
    title: 'Creative Breakthrough',
    date: 'October 4, 2023 • 11:30 PM',
    snippet: 'Finally figured out the structure for the new Atelier project. It needs to breathe. No borders, just tonal shifts. The concept of a digital vellum is starting to click...',
    tags: ['Work', 'Ideas'],
  },
];

export default function DiaryScreen() {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Sticky Top Gradient Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <Ionicons name="menu" size={32} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.appTitle, { color: colors.text }]}>My Diary</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* Calendar Section */}
        <View style={styles.section}>
          <View style={styles.calendarHeader}>
            <View>
              <Text style={styles.timelineLabel}>TIMELINE</Text>
              <Text style={styles.monthTitle}>
                {date.toLocaleDateString(undefined, {day: '2-digit', month: 'long', year: 'numeric' })}
              </Text>
            </View>
            <TouchableOpacity style={styles.dateSelectorButton} onPress={() => setShowPicker(true)}>
              <MaterialIcons name="calendar-today" size={20} color={colors.surfaceContainerLowest} />
              <Text style={styles.dateSelectorText}>Pick Date</Text>
            </TouchableOpacity>
          </View>

          
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}
        </View>

        {/* Journal Entries Section */}
        <View style={styles.section}>

          <View style={styles.entriesGrid}>
            {/* Standard Entries */}
            {journalEntries.map((entry) => (
              <View key={entry.id} style={styles.entryCard}>
                <View style={styles.entryHeader}>
                  <View style={styles.entryHeaderLeft}>
                    <View style={[styles.emojiBox, { backgroundColor: entry.emojiBg }]}>
                      <Text style={styles.emojiText}>{entry.emoji}</Text>
                    </View>
                    <View>
                      <Text style={styles.entryTitle}>{entry.title}</Text>
                      <Text style={styles.entryDate}>{entry.date}</Text>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <MaterialIcons name="more-vert" size={20} color={colors.onSurfaceVariant} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.entrySnippet} numberOfLines={3}>{entry.snippet}</Text>

                <View style={styles.tagsRow}>
                  {entry.tags.map((tag, i) => (
                    <View key={i} style={styles.tagPill}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}

            {/* Featured Image Entry */}
            <View style={styles.entryCard}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeokeFzMFTuJpTLHiF6oheFwqpCdryZzSjZjd-YRKVa-_2vuGR2mEewS7ToLo9QcKfY-INmoI2D886ccAnaFOfR3SY3ZmVOWdeFJWu-qGssPK4rbeSI4RMyF7QLnziFgW7ymo-FcxC9DMDO9qStUtnY44wnneXhAuUqsDwkkoxVwZ3cNoQ-3jtM6DG6t_d11IH_78Afx0KZAF_Ui6E50FngVGewvZZ8t5g7gcKGQQCu4P-yQAC4_h701HHTP4nHyWQtXwfVpRMJMhU' }}
                style={styles.featuredImage}
              />
              <View style={styles.entryHeader}>
                <View style={styles.entryHeaderLeft}>
                  <View style={[styles.emojiBox, { backgroundColor: 'rgba(109, 159, 255, 0.3)' }]}>
                    <Text style={styles.emojiText}>☕</Text>
                  </View>
                  <View>
                    <Text style={styles.entryTitle}>Quiet Morning</Text>
                    <Text style={styles.entryDate}>October 1, 2023 • 09:00 AM</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.entrySnippet}>
                The city is still waking up. There's something incredibly precious about these early moments with a warm cup and a blank page. The steam from the coffee looks like ghosts in the morning light.
              </Text>

              <View style={styles.entryFooter}>
                <View style={styles.tagsRow}>
                  <View style={styles.tagPill}>
                    <Text style={styles.tagText}>SOLITUDE</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.editButton}>
                  <MaterialIcons name="edit" size={18} color={colors.accent} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button (FAB) */}
      <FabMenu onNewNote={() => { }} onNewListNote={() => { }} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 16,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
  },
  scrollContent: {
    paddingTop: 20, // Avoid overlap with sticky header
    paddingHorizontal: 24,
    paddingBottom: 140, // Avoid overlap with FAB and Bottom Nav
  },
  section: {
    marginBottom: 40,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  timelineLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.text,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  monthTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.5,
  },
  dateSelectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  dateSelectorText: {
    color: colors.surfaceContainerLowest,
    fontSize: 14,
    fontWeight: '600',
  },
  selectedDateContainer: {
    backgroundColor: colors.surfaceContainerLow,
    padding: 16,
    borderRadius: 16,
    marginTop: -10,
  },
  selectedDateText: {
    fontSize: 16,
    fontWeight: '500',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  dividerLine: {
    width: 48,
    height: 1,
    backgroundColor: 'rgba(175, 173, 172, 0.3)',
  },
  dividerText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  entriesGrid: {
    gap: 24,
  },
  entryCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#2f2f2e',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 3,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  entryHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emojiBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiText: {
    fontSize: 18,
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 2,
  },
  entryDate: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  entrySnippet: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.onSurfaceVariant,
    marginBottom: 16,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tagPill: {
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  featuredImage: {
    width: '100%',
    height: 192,
    borderRadius: 16,
    marginBottom: 24,
  },
  entryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: colors.accentLight,
    padding: 8,
    borderRadius: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 110, // Above bottom nav
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
    zIndex: 50,
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    zIndex: 40,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 32 : 24,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
  },
  navItemActive: {
    backgroundColor: colors.accentLight,
    transform: [{ scale: 1.1 }],
  },
  navItemText: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    marginTop: 4,
    letterSpacing: 0.5,
  },
  navItemTextActive: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.accent,
    marginTop: 4,
    letterSpacing: 0.5,
  },
});