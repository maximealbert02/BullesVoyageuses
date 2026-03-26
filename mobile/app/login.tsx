import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { AuthContext } from './services/AuthContext';

const styles = require('./style');

export default function LoginScreen() {
  // 1. Les mémoires locales pour les champs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  

  const auth = useContext(AuthContext);
  if (!auth) {
      throw new Error('Error fetching context : AuthContext');
  }
  const { login } = auth;

  const handleLogin = async () => {
    // Petite vérification de base
    if (!username || !password) {
      alert("Veuillez saisir votre adresse mail et votre mot de passe");
      return;
    }

    setIsSubmitting(true);
    // On lance la requête vers Django via le Context
    await login(username, password);
    setIsSubmitting(false);
  };

  return (
    // KeyboardAvoidingView pousse l'écran vers le haut quand le clavier s'ouvre
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Bulles Voyageuses</Text>
        <Text style={styles.subtitle}>Accédez à votre réservation</Text>

        <TextInput
          style={styles.input}
          placeholder="Nom d'utilisateur"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none" 
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry 
          autoCapitalize="none"
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleLogin}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Se connecter</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// Le style pour rendre ça beau et professionnel
