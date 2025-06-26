// components/TextInputWithValidation.tsx
import React, { useState } from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';

export default function TextInputWithValidation({ label, value, onChangeText, maxLength, multiline = false }) {
  const [touched, setTouched] = useState(false);
  const error = touched && !value ? `${label} is required` : null;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onBlur={() => setTouched(true)}
        maxLength={maxLength}
        multiline={multiline}
        style={[styles.input, multiline && styles.multiline]}
        placeholder={`Enter ${label.toLowerCase()}`}
        placeholderTextColor="#777"
      />
      <View style={styles.infoRow}>
        {error && <Text style={styles.error}>{error}</Text>}
        <Text style={styles.charCount}>{value.length}/{maxLength}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { color: '#a855f7', marginBottom: 4, fontWeight: '600' },
  input: {
    backgroundColor: '#222',
    color: '#eee',
    padding: 10,
    borderRadius: 6,
    fontSize: 16,
  },
  multiline: { height: 100, textAlignVertical: 'top' },
  error: { color: '#f87171', flex: 1 },
  charCount: { color: '#888' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
});
