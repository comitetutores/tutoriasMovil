import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native'; // Importar useNavigation

export default function FormularioRTI() {
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [correo, setCorreo] = useState('');
  const [matricula, setMatricula] = useState('');
  const [tipoTutoria, setTipoTutoria] = useState('Ninguna');
  const [comentarios, setComentarios] = useState('');

  const navigation = useNavigation(); // Obtener la instancia de navigation

  const handleSubmit = () => {
    // Lógica para manejar el envío del formulario
    console.log({
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      correo,
      matricula,
      tipoTutoria,
      comentarios,
    });
  };

  const handleAtras = () => {
    navigation.navigate('Solicitudes'); // Usar navigation para navegar
  };

  return (
    <ImageBackground
      source={require('./Imagenes/FondoPantalla2.jpg')}
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
          <Text style={styles.title}>Registro de Tutoría</Text>
        </View>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <View style={styles.form}>
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
            <TextInput
              style={styles.input}
              placeholder="Correo Electrónico"
              value={correo}
              onChangeText={setCorreo}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
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
                <Picker.Item label="Solicitar Tutoría" value="SolicitarTutoría" />
                <Picker.Item label="Solicitar Asesoría" value="TutoriaIndividual" />
                <Picker.Item label="Solicitud de Baja" value="SolicituddeBaja" />
                <Picker.Item label="Apoyo Información Becas y Trámites" value="ApoyoInformacionBecasyTramites" />
                <Picker.Item label="Apoyo Servicios al Estudiante" value="ApoyoServiciosalEstudiante" />
              </Picker>
            </View>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Comentarios"
              value={comentarios}
              onChangeText={setComentarios}
              multiline
              numberOfLines={4}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>
          </View>
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
    paddingVertical: 20,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
  },
  picker: {
    height: 40,
    width: '100%',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#62152D',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
