import React, { useState } from 'react';
import { View, Text, TextInput, Modal, Button, StyleSheet } from 'react-native';

type FilterModalProps = {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
};

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, onApply }) => {
  const [distance, setDistance] = useState('');
  const [storeName, setStoreName] = useState('');
  const [storeClassification, setStoreClassification] = useState('');
  const [rating, setRating] = useState('');

  const applyFilters = () => {
    const filters = {
      distance: distance ? parseFloat(distance) : null,
      storeName,
      storeClassification,
      rating: rating ? parseFloat(rating) : null,
    };
    onApply(filters);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Filter Options</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Maximum Distance"
            value={distance}
            onChangeText={setDistance}
          />
          <TextInput
            style={styles.input}
            placeholder="Store Name"
            value={storeName}
            onChangeText={setStoreName}
          />
          <TextInput
            style={styles.input}
            placeholder="Store Classification"
            value={storeClassification}
            onChangeText={setStoreClassification}
          />
          <TextInput
            style={styles.input}
            placeholder="Minimum Rating"
            value={rating}
            onChangeText={setRating}
          />
          
          <View style={styles.buttonContainer}>
            <Button title="Apply" onPress={applyFilters} />
            <Button title="Cancel" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default FilterModal;
