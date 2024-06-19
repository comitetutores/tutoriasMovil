import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native'; 
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';  // Importar useNavigation

export default function FormularioRTI() {
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [correo, setCorreo] = useState('');
  const [matricula, setMatricula] = useState('');
  const [tipoTutoria, setTipoTutoria] = useState('Ninguna');
  const [comentarios, setComentarios] = useState('');

  const navigation = useNavigation();  // Obtener la instancia de navigation

  const handleSubmit = () => {
    // Lógica para manejar el envío del formulario
    console.log({
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      correo,
      matricula,
      tipoTutoria,
      comentarios
    });
  };

  const handleAtras = () => {
    navigation.navigate('Solicitudes');  // Usar navigation para navegar
  };

  return (
    <ImageBackground 
      source={require('./Imagenes/FondoPantalla.jpg')} 
      style={styles.background}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        {/* Encabezado */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} onPress={handleAtras}>
            <Image 
              source={require('./Imagenes/atras.png')}
              style={styles.menuIcon}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Registro de Tutoría </Text>
        </View>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Apellido Paterno"
              value={apellidoPaterno}
              onChangeText={setApellidoPaterno}
            />
            <TextInput
              style={styles.input}
              placeholder="Apellido Materno"
              value={apellidoMaterno}
              onChangeText={setApellidoMaterno}
            />
          </View>
          <TextInput
            style={styles.singleInput}
            placeholder="Correo Electrónico"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.singleInput}
            placeholder="Matrícula"
            value={matricula}
            onChangeText={setMatricula}
          />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={tipoTutoria}
              style={styles.picker}
              onValueChange={(itemValue) => setTipoTutoria(itemValue)}
            >
              <Picker.Item label="Ninguna" value="Ninguna" />
              <Picker.Item label="Tutoría Individual" value="TutoriaIndividual" />
            </Picker>
          </View>
          <TextInput
            style={styles.textArea}
            placeholder="Comentarios"
            value={comentarios}
            onChangeText={setComentarios}
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#62152D',
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    position: 'relative',
  },
  menuButton: {
    position: 'absolute',
    left: 10,
    top: 30,
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  formContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#990634', // Color de fondo actualizado
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white', // Para que el campo de texto sea visible con el nuevo fondo
  },
  singleInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white', // Para que el campo de texto sea visible con el nuevo fondo
  },
  pickerContainer: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white', // Para que el Picker sea visible con el nuevo fondo
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    height: 50,
  },
  textArea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    textAlignVertical: 'top',
    backgroundColor: 'white', // Para que el área de texto sea visible con el nuevo fondo
  },
  button: {
    backgroundColor: '#20FF0D',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
