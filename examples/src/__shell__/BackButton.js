import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export const BackButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.backButton}>
    <Text style={styles.backButtonText}>Back</Text>
  </TouchableOpacity>
);

const styles = {
  backButton: {
    paddingHorizontal: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#2d7bf6',
  },
};
