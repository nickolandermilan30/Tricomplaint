// app/Option.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";

const Option = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/Icons/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Icon image */}
      <Image
        source={require("../assets/Icons/image.png")}
        style={styles.icon}
        resizeMode="contain"
      />

      {/* Note Box */}
      <View style={styles.noteBox}>
        <Text style={styles.noteText}>
          NOTE:{"\n"}
          Before Register or Login and submit {"\n"}
          complaints, look for the sticker number of {"\n"}
          the driver in front of the tricycle, look for the {"\n"}
          latest year “2025” sticker.
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#007AFF" }]}
          onPress={() => router.push("/Register")}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#007AFF" }]}
          onPress={() => router.push("/Login")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Option;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 30,
  },
  logo: {
    width: 220,
    height: 120,
    marginTop: 20,
  },
  icon: {
    width: 300,
    height: 280, // medyo liit para magkasya mas maayos
    marginVertical: 10,
  },
  noteBox: {
    backgroundColor: "#6CCFC4",
    borderRadius: 6,
    padding: 12, // lumiit padding
    marginTop: -10, // konting taas lang
    marginBottom: 20, // dagdag space sa pagitan ng note at buttons
    width: "80%",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  noteText: {
    fontSize: 15, // lumiit ng konti
    color: "#000",
    textAlign: "left",
    fontWeight: "500",
    lineHeight: 21,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 30,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
