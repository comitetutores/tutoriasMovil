import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SolicitudesP() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Solicitudes Pendientes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
  },
});
