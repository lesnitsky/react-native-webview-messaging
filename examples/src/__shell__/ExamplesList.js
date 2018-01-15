import React from 'react';
import { TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';

const Item = ({ title, id, onPress }) => (
  <TouchableOpacity onPress={() => onPress(id)} style={styles.listItem}>
    <Text style={styles.listItemText}>{ title }</Text>
  </TouchableOpacity>
);

export const ExamplesList = ({ examples, onPress }) => {
  const items = examples.map(example => (
    <Item
      id={example.id}
      key={example.id}
      title={example.title}
      onPress={onPress}
    />
  ));

  return (
    <ScrollView>
      { items }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'silver',
  },
  listItemText: {
    fontSize: 16,
  },
});
