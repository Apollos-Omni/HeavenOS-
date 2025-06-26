import React from 'react';
import { View, Text, Switch, StyleSheet, Pressable, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useMPHDevice from '../../hooks/useMPHDevice';
import useMPHStore from '../../store/useMPHStore';

const AnimatedSwitch = Animated.createAnimatedComponent(Switch);

export default function MPHControlPanel({ route }: any) {
  const { deviceId } = route.params;
  useMPHDevice(deviceId);

  const { hingeLocked, doorOpen, childLockEnabled } = useMPHStore();

  const statusColor = doorOpen ? '#ef4444' : '#10b981';
  const statusText = doorOpen ? 'DOOR OPEN' : 'SECURE';

  return (
    <LinearGradient colors={['#0e0e10', '#1f1f23']} style={styles.container}>
      <Text style={styles.heading}>MPH Control Hub</Text>

      <View style={styles.statusBox}>
        <Text style={[styles.statusText, { color: statusColor }]}>{statusText}</Text>
      </View>

      <View style={styles.controlCard}>
        <Text style={styles.label}>Hinge Lock</Text>
        <Switch
          trackColor={{ false: '#555', true: '#a855f7' }}
          thumbColor={hingeLocked ? '#f4f4f5' : '#ccc'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {}}
          value={hingeLocked}
        />
      </View>

      <View style={styles.controlCard}>
        <Text style={styles.label}>Child Lock</Text>
        <Switch
          trackColor={{ false: '#555', true: '#a855f7' }}
          thumbColor={childLockEnabled ? '#f4f4f5' : '#ccc'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {}}
          value={childLockEnabled}
        />
      </View>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Sync Device Status</Text>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    color: '#a855f7',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  statusBox: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
    borderColor: '#333',
    borderWidth: 1,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
  },
  controlCard: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    borderColor: '#333',
    borderWidth: 1,
  },
  label: {
    fontSize: 16,
    color: '#eee',
  },
  button: {
    backgroundColor: '#a855f7',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
