import React, { useState } from "react";
import { Modal, View, Text, TextInput, Button, StyleSheet } from "react-native";

type RecommendFilterModalProps = {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: {
    distance: string;
    storeName: string;
    storeClassification: string;
    rating: string;
    username: string;
    userrank: string;
  }) => void;
};

export default function RecommendFilterModal({ visible, onClose, onApply }: RecommendFilterModalProps) {
  const [distance, setDistance] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeClassification, setStoreClassification] = useState("");
  const [rating, setRating] = useState("");
  const [username, setUsername] = useState("");
  const [userrank, setUserrank] = useState("");

  const handleApply = () => {
    onApply({ distance, storeName, storeClassification, rating, username, userrank });
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filter</Text>
          <TextInput
            style={styles.input}
            placeholder="Distance"
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
            placeholder="Rating"
            value={rating}
            onChangeText={setRating}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="User Rank"
            value={userrank}
            onChangeText={setUserrank}
          />
          <Button title="Apply Filters" onPress={handleApply} />
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
});
