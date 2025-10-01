// app/Tricomplaint/Done.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Done = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Hide the default navbar */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* Check icon at the top */}
      <Ionicons name="checkmark-circle" size={120} color="#4BB543" style={styles.icon} />

      {/* Thank you text */}
      <Text style={styles.thankText}>THANK YOU!!!</Text>

      {/* Subtext */}
      <Text style={styles.subText}>
        Your complaint has{"\n"}been successfully{"\n"}submitted and is now{"\n"}under review.
      </Text>

      {/* Spacer to push button to bottom */}
      <View style={{ flex: 1 }} />

      {/* Home Button */}
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => router.push("/Option2")}
      >
        <Ionicons name="home-outline" size={22} color="#fff" style={{ marginRight: 10 }} />
        <Text style={styles.homeButtonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Done;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  icon: {
    marginTop: 80,
    marginBottom: 30,
  },
  thankText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  subText: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    lineHeight: 28,
  },
  homeButton: {
    flexDirection: "row",
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 50,
  },
  homeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
