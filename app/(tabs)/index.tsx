import FabMenu from '@/components/ui/FabMenu';
import NoteEditorOverlay from '@/components/ui/NoteEditorOverlay';
import { useTheme } from '@/hooks/ThemeContext';
import { useNavigation, useFocusEffect } from 'expo-router';
import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { initDB, fetchNotes, insertNotes, updateNotesDB, deleteNotesDB } from '@/util/database';

type Note = {
  id: string;
  title: string;
  content: string;
};

export default function HomeScreen() {
  const [notes, setNotes] = useState<Note[]>([]);

  const navigation = useNavigation();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const { colors } = useTheme();

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: selectedNote ? { display: 'none' } : {
        backgroundColor: colors.card,
        borderTopColor: colors.border,
      },
    });
  }, [selectedNote, navigation, colors]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    try {
      const data = await fetchNotes();
      setNotes(data); 
    } catch (e) {
      console.error("Failed to load notes", e);
    }
  };

  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const handleOpenNote = (note: Note) => {
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

  const handleCloseNote = async () => {
      if (!selectedNote) return;
      const exists = notes.some((n) => n.id === selectedNote.id);
      const isBlank = !editTitle.trim() && !editContent.trim();
      if (exists) {
        if (isBlank) {
          await deleteNotesDB(selectedNote.id);
        } 
        await updateNotesDB(selectedNote.id, editTitle, editContent);
      } else {
        if (!isBlank) {
          await insertNotes(editTitle, editContent);
        } 
      }
      loadData();
      setSelectedNote(null);
  };

  const renderNote = ({ item }: { item: Note }) => {
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



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.appTitle, { color: colors.text }]}>Notes</Text>
      </View>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={renderNote}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Fab Menu */}
      <FabMenu onNewNote={handleNewNote} />

      {/* Full Screen Editable Note Overlay */}
      <NoteEditorOverlay
        selectedNote={selectedNote}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        editContent={editContent}
        setEditContent={setEditContent}
        onClose={handleCloseNote}
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
