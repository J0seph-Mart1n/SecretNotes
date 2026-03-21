import FabMenu from '@/components/ui/FabMenu';
import { useTheme } from '@/hooks/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { usePreventScreenCapture } from 'expo-screen-capture';
import NoteEditorOverlay from '@/components/ui/NoteEditorOverlay';
import React, { useCallback, useEffect, useState } from 'react';
import { AppState, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type SecretNote = {
  id: string;
  title: string;
  content: string;
};

import PinEntryScreen from '@/components/ui/PinEntryScreen';

export default function SecretsScreen() {
  usePreventScreenCapture();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  const { colors } = useTheme();

  useFocusEffect(
    useCallback(() => {
      return () => {
        // Run when switching tabs (unfocusing screen)
        setIsAuthenticated(false);
      };
    }, [])
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      setAppState(nextAppState);
      // Lock if app goes to background or becomes inactive
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        setIsAuthenticated(false);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // Provide a completely blank screen when the app is inactive (recent apps menu)
  if (appState !== 'active') {
    return <View style={styles.container} />;
  }

  const [secretNotes, setSecretNotes] = useState<SecretNote[]>([
    {
      id: '1',
      title: 'Bank Passwords',
      content: 'Chase: 1234\nBoA: 5678',
    },
    {
      id: '2',
      title: 'Crypto Seed Phrase',
      content: 'apple banana cherry dog elephant fox grape hat ice jelly kite lemon',
    },
    {
      id: '3',
      title: 'Private Journal',
      content: 'Today was a productive day. I finally managed to finish that app I was working on.',
    },
  ]);

  const [selectedNote, setSelectedNote] = useState<SecretNote | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const handleOpenNote = (note: SecretNote) => {
    setEditTitle(note.title);
    setEditContent(note.content);
    setSelectedNote(note);
  };

  const handleNewNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: '',
      content: '',
    };
    handleOpenNote(newNote);
  };

  const handleCloseNote = () => {
    if (!selectedNote) return;
    setSecretNotes((prevNotes) => {
      const exists = prevNotes.some((n) => n.id === selectedNote.id);
      const isBlank = !editTitle.trim() && !editContent.trim();
      if (exists) {
        if (isBlank) return prevNotes.filter((n) => n.id !== selectedNote.id);
        return prevNotes.map((n) =>
          n.id === selectedNote.id ? { ...n, title: editTitle, content: editContent } : n
        );
      } else {
        if (!isBlank) return [{ id: selectedNote.id, title: editTitle, content: editContent }, ...prevNotes];
        return prevNotes;
      }
    });
    setSelectedNote(null);
  };

  const renderNote = ({ item }: { item: SecretNote }) => {
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.noteTile} onPress={() => handleOpenNote(item)}>
        <Text style={styles.noteTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.noteContent} numberOfLines={6}>
          {item.content}
        </Text>
      </TouchableOpacity>
    );
  };

  if (!isAuthenticated) {
    return <PinEntryScreen onUnlock={() => setIsAuthenticated(true)} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.appTitle, { color: colors.text }]}>Secrets</Text>
      </View>

      <FlatList
        data={secretNotes}
        keyExtractor={(item) => item.id}
        renderItem={renderNote}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Fab Menu */}
      <FabMenu onNewNote={handleNewNote} />

      {/* Full Screen Editable Secret Overlay */}
      <NoteEditorOverlay
        selectedNote={selectedNote}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        editContent={editContent}
        setEditContent={setEditContent}
        onClose={handleCloseNote}
        contentPlaceholder="Secret Content"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  noteTile: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 14,
    padding: 12,
    backgroundColor: '#1f1f1f',
    borderWidth: 1,
    borderColor: '#2c2c2c',
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 6,
  },
  noteContent: {
    fontSize: 14,
    color: '#d0d0d0',
    lineHeight: 20,
  },
});
