import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';

export default function InformeT() {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [cuatrimestre, setCuatrimestre] = useState('');
  const [carrera, setCarrera] = useState('');
  const [tutor, setTutor] = useState('');
  const [grupo, setGrupo] = useState('');
  const [programadas, setProgramadas] = useState(Array(6).fill({ no: '', tema: '', semana: '', fecha: '', observaciones: '' }));
  const [noProgramadas, setNoProgramadas] = useState(Array(3).fill({ no: '', tema: '', fecha: '', motivo: '', observaciones: '' }));

  const handleChange = (index, field, value, tipo) => {
    if (tipo === 'programadas') {
      const newProgramadas = [...programadas];
      newProgramadas[index][field] = value;
      setProgramadas(newProgramadas);
    } else {
      const newNoProgramadas = [...noProgramadas];
      newNoProgramadas[index][field] = value;
      setNoProgramadas(newNoProgramadas);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerText}>TUTORÍAS GRUPALES</Text>
      </View>

      {/* Formulario */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio del cuatrimestre"
          value={fechaInicio}
          onChangeText={setFechaInicio}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de Entrega del informe"
          value={fechaEntrega}
          onChangeText={setFechaEntrega}
        />
        <TextInput
          style={styles.input}
          placeholder="Cuatrimestre"
          value={cuatrimestre}
          onChangeText={setCuatrimestre}
        />
        <TextInput
          style={styles.input}
          placeholder="Carrera"
          value={carrera}
          onChangeText={setCarrera}
        />
        <TextInput
          style={styles.input}
          placeholder="Tutor"
          value={tutor}
          onChangeText={setTutor}
        />
        <TextInput
          style={styles.input}
          placeholder="Grupo"
          value={grupo}
          onChangeText={setGrupo}
        />
      </View>

      {/* Tabla de Tutorías Programadas */}
      <View style={styles.tableContainer}>
        <Text style={styles.sectionHeader}>Programadas en la planeación</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>No</Text>
          <Text style={styles.tableHeaderText}>Tema o Título de la Tutoría</Text>
          <Text style={styles.tableHeaderText}>Número de semana programada</Text>
          <Text style={styles.tableHeaderText}>Fecha Realizada (dd/mm/aaaa)</Text>
          <Text style={styles.tableHeaderText}>Observaciones</Text>
        </View>
        {programadas.map((fila, index) => (
          <View key={index} style={styles.tableRow}>
            <TextInput
              style={styles.tableInput}
              placeholder="No"
              value={fila.no}
              onChangeText={(text) => handleChange(index, 'no', text, 'programadas')}
            />
            <TextInput
              style={styles.tableInput}
              placeholder="Tema o Título de la Tutoría"
              value={fila.tema}
              onChangeText={(text) => handleChange(index, 'tema', text, 'programadas')}
            />
            <TextInput
              style={styles.tableInput}
              placeholder="Número de semana programada"
              value={fila.semana}
              onChangeText={(text) => handleChange(index, 'semana', text, 'programadas')}
            />
            <TextInput
              style={styles.tableInput}
              placeholder="Fecha Realizada"
              value={fila.fecha}
              onChangeText={(text) => handleChange(index, 'fecha', text, 'programadas')}
            />
            <TextInput
              style={styles.tableInput}
              placeholder="Observaciones"
              value={fila.observaciones}
              onChangeText={(text) => handleChange(index, 'observaciones', text, 'programadas')}
            />
          </View>
        ))}
      </View>

      {/* Tabla de Tutorías No Programadas */}
      <View style={styles.tableContainer}>
        <Text style={styles.sectionHeader}>Tutorías no programadas en la planeación</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>No</Text>
          <Text style={styles.tableHeaderText}>Tema o Título de la Tutoría</Text>
          <Text style={styles.tableHeaderText}>Fecha Realizada (dd/mm/aaaa)</Text>
          <Text style={styles.tableHeaderText}>Motivo por el que surgió la tutoría</Text>
          <Text style={styles.tableHeaderText}>Observaciones</Text>
        </View>
        {noProgramadas.map((fila, index) => (
          <View key={index} style={styles.tableRow}>
            <TextInput
              style={styles.tableInput}
              placeholder="No"
              value={fila.no}
              onChangeText={(text) => handleChange(index, 'no', text, 'noProgramadas')}
            />
            <TextInput
              style={styles.tableInput}
              placeholder="Tema o Título de la Tutoría"
              value={fila.tema}
              onChangeText={(text) => handleChange(index, 'tema', text, 'noProgramadas')}
            />
            <TextInput
              style={styles.tableInput}
              placeholder="Fecha Realizada"
              value={fila.fecha}
              onChangeText={(text) => handleChange(index, 'fecha', text, 'noProgramadas')}
            />
            <TextInput
              style={styles.tableInput}
              placeholder="Motivo por el que surgió la tutoría"
              value={fila.motivo}
              onChangeText={(text) => handleChange(index, 'motivo', text, 'noProgramadas')}
            />
            <TextInput
              style={styles.tableInput}
              placeholder="Observaciones"
              value={fila.observaciones}
              onChangeText={(text) => handleChange(index, 'observaciones', text, 'noProgramadas')}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#990634',
    padding: 20,
  },
  header: {
    backgroundColor: '#62152D',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#62152D',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#62152D',
    borderRadius: 5,
    marginBottom: 10,
  },
  tableHeaderText: {
    flex: 1,
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tableInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 2,
  },
});
