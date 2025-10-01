// app/Option2.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
} from "react-native";
import { Stack, useRouter } from "expo-router"; // ✅ dagdag useRouter

const Option2 = () => {
  const router = useRouter(); // ✅ para magamit sa navigation

  return (
    <SafeAreaView style={styles.container}>
      {/* Hide StatusBar (tanggal system bar) */}
      <StatusBar hidden />

      {/* Hide Expo Router / Navigation header */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* Logo */}
      <Image
        source={require("../assets/Icons/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.title}>Choose your specific dashboard</Text>

      {/* Buttons Section */}
      <View style={styles.buttonContainer}>
        {/* Disclaimer Section */}
        <View style={styles.disclaimerSection}>
          <Text style={styles.disclaimerTitle}>Disclaimer</Text>
          <Text style={styles.disclaimer}>
            Any invalid complaint or false accusation is subject to punishment.
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Commuter Dashboard */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/CommuterDashboard")} // <-- dito punta kapag may CommuterDashboard.tsx ka
        >
          <Text style={styles.buttonText}>Commuter Dashboard</Text>
        </TouchableOpacity>

        {/* Driver Dashboard */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/DriverDashboard")} // ✅ pupunta sa DriverDashboard.tsx
        >
          <Text style={styles.buttonText}>Driver Dashboard</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Option2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "flex-start",
  },
  logo: {
    width: 180,
    height: 100,
    alignSelf: "center",
    marginTop: 60,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: 40,
  },
  disclaimerSection: {
    marginBottom: 20,
  },
  disclaimerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "red",
    marginBottom: 5,
  },
  disclaimer: {
    fontSize: 14,
    color: "red",
    textAlign: "left",
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: "auto",
  },
  button: {
    width: "100%",
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
