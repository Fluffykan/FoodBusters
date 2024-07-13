import React, { useState } from 'react';
import { View, Text, TextInput, Modal, Button, StyleSheet } from 'react-native';

type UserFilterModalProps = {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
};

const UserFilterModal: React.FC<UserFilterModalProps> = ({ visible, onClose, onApply }) => {
  const [username, setUsername] = useState('');
  const [preference, setPreference] = useState('');
  const [userrank, setUserrank] = useState('');

  const applyFilters = () => {
    const filters = {
      username,
      preference,
      userrank,
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
          <Text style={styles.modalTitle}>Filter Users</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Preference"
            value={preference}
            onChangeText={setPreference}
          />
          <TextInput
            style={styles.input}
            placeholder="User Rank"
            value={userrank}
            onChangeText={setUserrank}
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

export default UserFilterModal;
