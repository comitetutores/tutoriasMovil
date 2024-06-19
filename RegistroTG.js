import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const RegistroTG = () => {
  const [carrera, setCarrera] = useState('');
  const [grupo, setGrupo] = useState('');
  const [tutor, setTutor] = useState('');
  const [fechaSesion, setFechaSesion] = useState('');
  const [tema, setTema] = useState('');
  const [alumnos, setAlumnos] = useState([{ nombre: '', asistencia: false }]);

  const agregarFila = () => {
    setAlumnos([...alumnos, { nombre: '', asistencia: false }]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Registro de T.G.</Text>
      </View>

      <View style={styles.formGroup}>
        <TextInput
          placeholder="Carrera"
          value={carrera}
          onChangeText={setCarrera}
          style={styles.input}
        />
        <TextInput
          placeholder="Grupo"
          value={grupo}
          onChangeText={setGrupo}
          style={styles.input}
        />
        <TextInput
          placeholder="Tutor"
          value={tutor}
          onChangeText={setTutor}
          style={styles.input}
        />
        <TextInput
          placeholder="Fecha de Sesión"
          value={fechaSesion}
          onChangeText={setFechaSesion}
          style={styles.input}
        />
        <TextInput
          placeholder="Tema"
          value={tema}
          onChangeText={setTema}
          style={styles.input}
        />
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Alumnos</Text>
          <Text style={styles.tableHeaderText}>Asistencia</Text>
        </View>
        {alumnos.map((alumno, index) => (
          <View key={index} style={styles.tableRow}>
            <TextInput
              placeholder="Nombre del Alumno"
              value={alumno.nombre}
              onChangeText={(text) => {
                const newAlumnos = [...alumnos];
                newAlumnos[index].nombre = text;
                setAlumnos(newAlumnos);
              }}
              style={styles.tableInput}
            />
            <CheckBox
              value={alumno.asistencia}
              onValueChange={(newValue) => {
                const newAlumnos = [...alumnos];
                newAlumnos[index].asistencia = newValue;
                setAlumnos(newAlumnos);
              }}
              style={styles.checkBox}
            />
          </View>
        ))}
        <Button title="Agregar Alumno" onPress={agregarFila} style={styles.addButton} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#990634', // Color de fondo actualizado
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
    color: 'white',
    fontSize: 30,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  formGroup: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  tableContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    padding: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    width: '40%',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tableInput: {
    width: '70%',
    borderWidth: 1,
    padding: 10,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  checkBox: {
    alignSelf: 'center',
  },
  addButton: {
    marginTop: 20,
  },
});

export default RegistroTG;
