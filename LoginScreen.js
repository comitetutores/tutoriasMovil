import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { UserContext } from './UserContext';

export default function LoginScreen({ navigation }) {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Por favor, completa ambos campos');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://192.168.3.212:3300/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matricula: username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);  
        if (data.id_rol === 1) {
          navigation.navigate('InicioAlumno');  
        } else if (data.id_rol === 2) {
          navigation.navigate('Inicio');  
        } else {
          Alert.alert('Error', 'Rol no reconocido');
        }
      } else {
        Alert.alert('Error', data.error || 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor. Por favor, inténtalo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Image 
          source={require('./Imagenes/LogoUni.png')}
          style={styles.logo}
        />
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu matrícula"
            placeholderTextColor="#D7CDCD"
            value={username}
            onChangeText={setUsername}
            editable={!loading}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu contraseña"
            placeholderTextColor="#D7CDCD"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Iniciando...' : 'Iniciar Sesión'}</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#62152D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainer: {
    backgroundColor: 'white',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#58DC96',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
