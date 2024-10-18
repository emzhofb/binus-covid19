import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function InfoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About This App</Text>
      <Text style={styles.info}>Created by: Ikhda Muhammad Wildani</Text>
      <Text style={styles.info}>NIM: 2502089054</Text>
      <Text style={styles.info}>Email: ikhda.wildani@binus.ac.id</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  info: {
    fontSize: 18,
    marginBottom: 8,
  },
});
