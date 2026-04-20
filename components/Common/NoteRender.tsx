import React from 'react';
import { Note } from "@/functions/NoteHandles";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface NoteRenderProps {
    item: Note;
    isSelected: boolean;
    colors: any;
    handleOpenNote: (note: Note) => void;
    toggleSelection: (id: string) => void;
    previewContent: string;
}

export default function NoteRender({ item, isSelected, colors, handleOpenNote, toggleSelection, previewContent }: NoteRenderProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[
                styles.noteTile,
                isSelected && { borderColor: colors.green, borderWidth: 2, backgroundColor: colors.card }
            ]}
            onPress={() => handleOpenNote(item)}
            onLongPress={() => toggleSelection(item.id)}
        >
            <Text style={styles.noteTitle} numberOfLines={1}>
                {item.title}
            </Text>
            <Text style={styles.noteContent} numberOfLines={6}>
                {previewContent}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
})