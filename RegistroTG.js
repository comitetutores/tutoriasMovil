import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

export default function RegistroTG() {
  const [carrera, setCarrera] = useState('');
  const [grupo, setGrupo] = useState('');
  const [tutor, setTutor] = useState('');
  const [cuatrimestre, setCuatrimestre] = useState('');
  const [fechaSesion, setFechaSesion] = useState(new Date());
  const [tema, setTema] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [alumnos, setAlumnos] = useState([{ id: 1, nombre: '', asistencia: false }]);
  const [riesgos, setRiesgos] = useState([{ academico: '', personal: '', socioeconomico: '' }]); 

  const navigation = useNavigation();

  const handleFechaSesionChange = (event, selectedDate) => {
    setShowDatePicker(false);
    const currentDate = selectedDate || fechaSesion;
    setFechaSesion(currentDate);
  };

  const handleAddFila = () => {
    setAlumnos([...alumnos, { id: alumnos.length + 1, nombre: '', asistencia: false }]);
  };

  const handleAtras = () => {
    navigation.navigate('Solicitudes');
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={handleAtras}>
          <Image 
            source={require('./Imagenes/atras.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Registro de T.G.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Carrera"
            value={carrera}
            onChangeText={setCarrera}
          />
          <TextInput
            style={styles.input}
            placeholder="Grupo"
            value={grupo}
            onChangeText={setGrupo}
          />
          <TextInput
            style={styles.input}
            placeholder="Tutor"
            value={tutor}
            onChangeText={setTutor}
          />
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{fechaSesion.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={fechaSesion}
              mode="date"
              display="default"
              onChange={handleFechaSesionChange}
              style={styles.datePicker}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Tema"
            value={tema}
            onChangeText={setTema}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Comentarios"
            value={comentarios}
            onChangeText={setComentarios}
            multiline
            numberOfLines={4}
          />
        </View>


        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <View style={[styles.columnHeader, { flex: 2 }]}>
              <Text style={styles.headerText}>Nombre del Alumno</Text>
            </View>
            <View style={styles.columnHeader}>
              <Text style={styles.headerText}>Asistencia</Text>
            </View>
          </View>
          {alumnos.map((alumno, index) => (
            <View key={alumno.id} style={styles.tableRow}>
              <View style={[styles.tableCell, { flex: 2 }]}>
                <TextInput
                  style={styles.tableInput}
                  placeholder="Nombre del Alumno"
                  value={alumno.nombre}
                  onChangeText={(text) => {
                    const newAlumnos = [...alumnos];
                    newAlumnos[index].nombre = text;
                    setAlumnos(newAlumnos);
                  }}
                />
              </View>
              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  onPress={() => {
                    const newAlumnos = [...alumnos];
                    newAlumnos[index].asistencia = !newAlumnos[index].asistencia;
                    setAlumnos(newAlumnos);
                  }}
                  style={[
                    styles.checkbox,
                    alumno.asistencia && styles.checkboxChecked,
                  ]}
                />
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={handleAddFila}>
            <Text style={styles.addButtonText}>Agregar Fila</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.tableContainer}>
          <Text style={styles.riskHeader}>Total de alumnos que se detectaron en riesgo:</Text>
          <View style={styles.tableHeader}>
            <View style={styles.columnHeader}>
              <Text style={styles.headerText}>Académico</Text>
            </View>
            <View style={styles.columnHeader}>
              <Text style={styles.headerText}>Personal</Text>
            </View>
            <View style={styles.columnHeader}>
              <Text style={styles.headerText}>Socioeconómico</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <TextInput
                style={styles.tableInput}
                placeholder="Número Académico"
                value={riesgos[0].academico}
                onChangeText={(text) => {
                  const newRiesgos = [...riesgos];
                  newRiesgos[0].academico = text;
                  setRiesgos(newRiesgos);
                }}
              />
            </View>
            <View style={styles.tableCell}>
              <TextInput
                style={styles.tableInput}
                placeholder="Número Personal"
                value={riesgos[0].personal}
                onChangeText={(text) => {
                  const newRiesgos = [...riesgos];
                  newRiesgos[0].personal = text;
                  setRiesgos(newRiesgos);
                }}
              />
            </View>
            <View style={styles.tableCell}>
              <TextInput
                style={styles.tableInput}
                placeholder="Número Socioeconómico"
                value={riesgos[0].socioeconomico}
                onChangeText={(text) => {
                  const newRiesgos = [...riesgos];
                  newRiesgos[0].socioeconomico = text;
                  setRiesgos(newRiesgos);
                }}
              />
            </View>
          </View>
        </View>

        <View style={styles.boxContainer}>
          <View style={styles.box}>
            <Text style={styles.boxHeader}>Total de alumnos que asistieron:</Text>
            <TextInput style={styles.boxInput} placeholder="Número" />
          </View>
          <View style={styles.box}>
            <Text style={styles.boxHeader}>Total de alumnos canalizados:</Text>
            <TextInput style={styles.boxInput} placeholder="Número" />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => console.log('Enviar')}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#990634',
  },
  header: {
    backgroundColor: '#62152D',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    height: 70,
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
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  datePicker: {
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  columnHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    paddingVertical: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
  },
  tableCell: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  tableInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  checkboxContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  checkboxChecked: {
    backgroundColor: '#62152D',
  },
  addButton: {
    backgroundColor: '#62152D',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  riskHeader: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  box: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  boxHeader: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  boxInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
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
