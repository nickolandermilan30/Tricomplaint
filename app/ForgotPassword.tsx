// app/Tricomplaint/ForgotPassword.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Firebase
import { auth, db } from "./firebase/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { ref, update, get, child } from "firebase/database";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email.");
      return;
    }

    try {
      // 1️⃣ Send password reset email
      await sendPasswordResetEmail(auth, email);

      // 2️⃣ Update password in Realtime Database
      const usersRef = ref(db, "users");
      const snapshot = await get(usersRef);
      let userIdToUpdate = null;

      snapshot.forEach((childSnap) => {
        const userData = childSnap.val();
        if (userData.email === email) {
          userIdToUpdate = childSnap.key;
        }
      });

      if (userIdToUpdate) {
        await update(ref(db, `users/${userIdToUpdate}`), {
          password: "Nicko123", // set the new password
        });
      }

      Alert.alert(
        "Success",
        "Password reset email sent! Your database password is also updated."
      );
      router.push("/Login");
    } catch (error: any) {
      console.error(error);
      let errorMessage = "Failed to send reset email.";
      if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      }
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/Icons/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Forgot Password</Text>
      <View style={styles.middleContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleResetPassword}
        >
          <Text style={styles.loginText}>Send Reset Email</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/Login")}>
          <Text style={styles.footerText}>
            Remembered your password?{" "}
            <Text style={styles.registerLink}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 30, justifyContent: "space-between" },
  logo: { width: 180, height: 100, alignSelf: "center", marginTop: 60, marginBottom: 20 },
  title: { fontSize: 40, fontWeight: "700", color: "#333", textAlign: "center", marginBottom: 30 },
  middleContainer: { flex: 1, justifyContent: "center" },
  input: { width: "100%", borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 16, color: "#000" },
  bottomContainer: { alignItems: "center", marginBottom: 30, width: "100%" },
  loginButton: { width: "100%", backgroundColor: "#007AFF", paddingVertical: 15, borderRadius: 8, alignItems: "center", marginBottom: 15 },
  loginText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  footerText: { fontSize: 14, color: "#555" },
  registerLink: { color: "#007AFF", fontWeight: "600" },
});
