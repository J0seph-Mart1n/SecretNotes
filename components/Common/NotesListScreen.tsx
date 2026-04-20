import FabMenu from '@/components/Common/FabMenu';
import ListEditorOverlay from '@/components/Common/ListEditorOverlay';
import NoteEditorOverlay from '@/components/Common/NoteEditorOverlay';
import { useTheme } from '@/hooks/ThemeContext';
import { useFocusEffect, useNavigation } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SelectedNote from './SelectedNote';
import PageHeader from './PageHeader';
import NoteRender from './NoteRender';
import { useNoteHandles, Note } from '@/functions/NoteHandles';

type NotesListScreenProps = {
  title: string;
  isSecret: boolean;
  contentPlaceholder?: string;
};

export default function NotesListScreen({ title, isSecret, contentPlaceholder }: NotesListScreenProps) {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const {
    notes,
    selectedNote,
    selectedNoteIds,
    setSelectedNoteIds,
    editTitle,
    setEditTitle,
    editContent,
    setEditContent,
    editTasks,
    setEditTasks,
    loadData,
    toggleSelection,
    handleDeleteSelected,
    handleOpenNote,
    handleNewTextNote,
    handleNewListNote,
    handleCloseNote
  } = useNoteHandles(isSecret);

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
    }, [isSecret])
  );

  const renderNote = ({ item }: { item: Note }) => {
    let previewContent = '';
    if (item.isList && Array.isArray(item.content)) {
      // Create a nice preview of the checklist items
      previewContent = item.content.map(task => `${task.isCompleted ? '✓' : '○'} ${task.text}`).join('\n');
    } else {
      previewContent = String(item.content || '');
    }

    const isSelected = selectedNoteIds.includes(item.id);

    return (
      <NoteRender 
        item={item}
        isSelected={isSelected}
        colors={colors}
        handleOpenNote={handleOpenNote}
        toggleSelection={toggleSelection}
        previewContent={previewContent}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {selectedNoteIds.length > 0 ? (
        <SelectedNote selectedNoteIds={selectedNoteIds} colors={colors} handleDeleteSelected={handleDeleteSelected} setSelectedNoteIds={setSelectedNoteIds} />
      ) : (
        <PageHeader title={title} navigation={navigation} />
      )}

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={renderNote}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <FabMenu onNewNote={handleNewTextNote} onNewListNote={handleNewListNote} />

      <NoteEditorOverlay
        selectedNote={selectedNote && !selectedNote.isList ? (selectedNote as any) : null}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        editContent={editContent}
        setEditContent={setEditContent}
        onClose={handleCloseNote}
        contentPlaceholder={contentPlaceholder || "Note"}
      />

      <ListEditorOverlay
        isOpen={!!selectedNote && selectedNote.isList}
        listTitle={editTitle}
        setListTitle={setEditTitle}
        tasks={editTasks}
        setTasks={setEditTasks}
        onClose={handleCloseNote}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
});