// app/DriverDashboard.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Stack, useRouter } from "expo-router";

// Firebase
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as dbRef, set, push } from "firebase/database";
import { app } from "./firebase/firebaseConfig";

// Modal DateTime Picker
import DateTimePickerModal from "react-native-modal-datetime-picker";

const storage = getStorage(app);
const database = getDatabase(app);

const DriverDashboard = () => {
  const router = useRouter();
  const [timeDate, setTimeDate] = useState(""); 
  const [stickerNo, setStickerNo] = useState("");
  const [destination, setDestination] = useState("");
  const [violation, setViolation] = useState("");
  const [localFiles, setLocalFiles] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  // Date & Time Picker States
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  // Pick file
  const pickFile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setLocalFiles((prev) => [...prev, uri]);
    }
  };

  // Upload all files
  const uploadAllFiles = async () => {
    const urls: string[] = [];
    for (const uri of localFiles) {
      const response = await fetch(uri);
      const blob = await response.blob();
      const filename = uri.substring(uri.lastIndexOf("/") + 1);
      const storageRef = ref(storage, `driver/driver1/${filename}`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      urls.push(downloadURL);
    }
    return urls;
  };

  // Handle submit
  const handleSubmit = async () => {
    if (!timeDate || !stickerNo || !destination || !violation) {
      Alert.alert("Error", "Please complete all fields.");
      return;
    }
    if (localFiles.length === 0) {
      Alert.alert("Error", "Please attach at least one file.");
      return;
    }

    try {
      setUploading(true);
      const uploadedUrls = await uploadAllFiles();

      const complainData = {
        timeDate,
        stickerNo,
        destination,
        violation,
        files: uploadedUrls,
        createdAt: new Date().toISOString(),
      };

      await set(push(dbRef(database, "driverComplain/driver1")), complainData);

      router.push("/Done");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to submit complaint.");
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleConfirmDate = (date: Date) => {
    setSelectedDate(date);
    setDatePickerVisible(false);
    updateTimeDateText(date, selectedTime);
  };

  const handleConfirmTime = (time: Date) => {
    setSelectedTime(time);
    setTimePickerVisible(false);
    updateTimeDateText(selectedDate, time);
  };

  const updateTimeDateText = (date: Date, time: Date) => {
    const timeStr = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const dateStr = date.toLocaleDateString();
    setTimeDate(`${timeStr} | ${dateStr}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1 }}>
          {/* Logo */}
          <Image
            source={require("../assets/Icons/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          {/* Title */}
          <Text style={styles.title}>Driver Dashboard</Text>
          {/* Submit Complaint Label */}
          <Text style={styles.submitLabel}>Submit Complaint</Text>

          {/* Time & Date Picker Row */}
          <View style={styles.timeDateRow}>
            <TouchableOpacity
              style={styles.timeDateButton}
              onPress={() => setTimePickerVisible(true)}
            >
              <Text style={styles.timeDateText}>
                {selectedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.timeDateButton}
              onPress={() => setDatePickerVisible(true)}
            >
              <Text style={styles.timeDateText}>
                {selectedDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
          </View>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={() => setDatePickerVisible(false)}
          />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmTime}
            onCancel={() => setTimePickerVisible(false)}
          />

          {/* Other Inputs */}
          <TextInput
            style={styles.input}
            placeholder="Sticker No."
            value={stickerNo}
            onChangeText={setStickerNo}
          />
          <TextInput
            style={styles.input}
            placeholder="Destination"
            value={destination}
            onChangeText={setDestination}
          />
          <TextInput
            style={styles.input}
            placeholder="Violation"
            value={violation}
            onChangeText={setViolation}
          />

          {/* Attach File */}
          <TouchableOpacity
            style={styles.attachButton}
            onPress={pickFile}
            disabled={uploading}
          >
            <Text style={styles.attachText}>
              {uploading
                ? "Uploading..."
                : `Attach File (Image/Video) (${localFiles.length})`}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footerSection}>
          <Text style={styles.disclaimerTitle}>Disclaimer</Text>
          <Text style={styles.disclaimer}>
            Any invalid complaint or false accusation is subject to punishment.
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={uploading}
            >
              {uploading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Submit</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DriverDashboard;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  logo: { width: 160, height: 90, alignSelf: "center", marginTop: 30 },
  title: { fontSize: 24, fontWeight: "700", color: "#333", textAlign: "center", marginVertical: 10 },
  submitLabel: { fontSize: 18, fontWeight: "700", color: "#333", textAlign: "center", marginBottom: 15 },
  timeDateRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  timeDateButton: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginHorizontal: 5 },
  timeDateText: { fontSize: 16 },
  input: { width: "100%", borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 15, fontSize: 16, marginBottom: 30 },
  attachButton: { width: "100%", borderWidth: 1, borderColor: "#007AFF", borderRadius: 8, padding: 14, alignItems: "center", marginBottom: 25 },
  attachText: { color: "#007AFF", fontSize: 16, fontWeight: "600" },
  footerSection: { marginTop: "auto", paddingTop: 20 },
  disclaimerTitle: { fontSize: 18, fontWeight: "700", color: "red", marginBottom: 5 },
  disclaimer: { fontSize: 14, color: "red", marginBottom: 20 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", gap: 15 },
  submitButton: { flex: 1, backgroundColor: "#007AFF", paddingVertical: 14, borderRadius: 10, alignItems: "center" },
  cancelButton: { flex: 1, backgroundColor: "#FF3B30", paddingVertical: 14, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
