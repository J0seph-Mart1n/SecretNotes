import FabMenu from '@/components/ui/FabMenu';
import { useNavigation } from 'expo-router';
import NoteEditorOverlay from '@/components/ui/NoteEditorOverlay';
import { useTheme } from '@/hooks/ThemeContext';
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Note = {
  id: string;
  title: string;
  content: string;
};

export default function HomeScreen() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Grocery list',
      content: 'Milk, eggs, bread, fruit, vegetables, snacks, coffee',
    },
    {
      id: '2',
      title: 'Workout plan',
      content: 'Mon: Chest & triceps\nWed: Back & biceps\nFri: Legs & shoulders',
    },
    {
      id: '3',
      title: 'Ideas',
      content: 'Build a notes app clone with colorful tiles and simple UX.',
    },
    {
      id: '4',
      title: 'Meeting notes',
      content: 'Discuss roadmap, priorities, and deadlines for Q2 features.',
    },
    {
      id: '5',
      title: 'Books to read',
      content: 'Atomic Habits, Deep Work, Clean Code, The Pragmatic Programmer',
    },
    {
      id: '6',
      title: 'Travel checklist',
      content: 'Passport, tickets, charger, headphones, toiletries, camera',
    },
  ]);

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

  const handleCloseNote = () => {
    if (!selectedNote) return;
    setNotes((prevNotes) => {
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
