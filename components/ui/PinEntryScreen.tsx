import { useTheme } from '@/hooks/ThemeContext';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SECRET_PIN = '1234'; // Default PIN

type PinEntryScreenProps = {
  onUnlock: () => void;
};

export default function PinEntryScreen({ onUnlock }: PinEntryScreenProps) {
  const [pinInput, setPinInput] = useState('');
  const [error, setError] = useState('');
  const { colors } = useTheme();

  const handlePinSubmit = () => {
    if (pinInput === SECRET_PIN) {
      setError('');
      onUnlock();
    } else {
      setError('Incorrect PIN. Please try again.');
      setPinInput('');
    }
  };

  return (
    <View style={[styles.container, styles.centerContent]}>
      <Text style={[styles.appTitle, { color: colors.text }]}>Enter PIN</Text>
      <TextInput
        style={styles.pinInput}
        value={pinInput}
        onChangeText={setPinInput}
        keyboardType="numeric"
        secureTextEntry
        maxLength={4}
        placeholder="****"
        placeholderTextColor="#666"
        autoFocus
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.submitButton} onPress={handlePinSubmit}>
        <Text style={styles.submitButtonText}>Unlock</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 20,
  },
  pinInput: {
    backgroundColor: '#1f1f1f',
    color: '#fff',
    fontSize: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2c2c2c',
    width: '60%',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 8,
  },
  submitButton: {
    backgroundColor: '#2b8a3e',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    color: '#ff6b6b',
    marginBottom: 16,
    fontSize: 14,
  },
});
