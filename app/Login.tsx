// app/Login.tsx
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

// ✅ Import Firebase
import { auth } from "./firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password.");
      return;
    }

    try {
      // ✅ Firebase login
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Logged in successfully!");
      router.push("/Option2"); // redirect to Option2 page
    } catch (error: any) {
      console.error(error);

      // 🔹 Handle Firebase error messages
      let errorMessage = "Login failed. Please try again.";

      if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Wrong password. Please try again.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email format.";
      } else if (error.code === "auth/invalid-credential") {
        errorMessage = "Invalid email or password.";
      }

      Alert.alert("Login Error", errorMessage);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/Icons/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.title}>Log In</Text>

      {/* Middle Section - Inputs */}
      <View style={styles.middleContainer}>
        {/* Email */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons
              name={passwordVisible ? "eye-off" : "eye"}
              size={22}
              color="#6CCFC4"
            />
          </TouchableOpacity>
        </View>

       {/* Remember Me + Forgot Password */}
<View style={styles.optionsRow}>
  <TouchableOpacity
    style={styles.rememberMe}
    onPress={() => setRememberMe(!rememberMe)}
  >
    <Ionicons
      name={rememberMe ? "checkbox" : "square-outline"}
      size={20}
      color="#6CCFC4"
    />
    <Text style={styles.rememberText}>Remember Me</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => router.push("/ForgotPassword")}>
    <Text style={styles.forgotPassword}>Forgot Password?</Text>
  </TouchableOpacity>
</View>


        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomContainer}>
        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        {/* Google Button */}
        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={require("../assets/Icons/google.png")}
            style={styles.googleIcon}
          />
          <Text style={styles.googleText}>Sign in with Google</Text>
        </TouchableOpacity>

        {/* Footer - Register */}
        <TouchableOpacity onPress={() => router.push("/Register")}>
          <Text style={styles.footerText}>
            Don’t have an account?{" "}
            <Text style={styles.registerLink}>Register Now</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    justifyContent: "space-between",
  },
  logo: {
    width: 180,
    height: 100,
    alignSelf: "center",
    marginTop: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
  middleContainer: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: "#000",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  inputPassword: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    color: "#000",
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#333",
  },
  forgotPassword: {
    fontSize: 14,
    color: "#6CCFC4",
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    marginHorizontal: 10,
    color: "#555",
    fontWeight: "500",
  },
  bottomContainer: {
    alignItems: "center",
    marginBottom: 30,
    width: "100%",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 15,
    width: "100%",
    justifyContent: "center",
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  footerText: {
    fontSize: 14,
    color: "#555",
  },
  registerLink: {
    color: "#007AFF",
    fontWeight: "600",
  },
});
