import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SelectedNoteProps {
    selectedNoteIds: string[];
    colors: any;
    handleDeleteSelected: () => void;
    setSelectedNoteIds: (ids: string[]) => void;
}

export default function SelectedNote({ selectedNoteIds, colors, handleDeleteSelected, setSelectedNoteIds }: SelectedNoteProps) {
    return (
        <View style={[styles.header, { justifyContent: 'space-between' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => setSelectedNoteIds([])} style={styles.menuIcon}>
                    <Ionicons name="close" size={32} color={colors.text} />
                </TouchableOpacity>
                <Text style={[styles.appTitle, { color: colors.text, fontSize: 24 }]}>
                    {selectedNoteIds.length} Selected
                </Text>
            </View>
            <TouchableOpacity onPress={handleDeleteSelected}>
                <Ionicons name="trash" size={28} color="#ff6b6b" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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
})