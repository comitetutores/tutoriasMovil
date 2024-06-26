import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Importar DateTimePicker
import { useNavigation } from '@react-navigation/native'; // Importar useNavigation

export default function Planeacion() {
  const [carrera, setCarrera] = useState('');
  const [grupo, setGrupo] = useState('');
  const [tutor, setTutor] = useState('');
  const [cuatrimestre, setCuatrimestre] = useState('');
  const [fecha, setFecha] = useState(new Date()); // Inicializar fecha con la fecha actual
  const [showDatePicker, setShowDatePicker] = useState(false); // Estado para controlar la visibilidad del DatePicker

  // Datos de la tabla
  const [tutoriasGrupales, setTutoriasGrupales] = useState([{ id: 1, tema: '', semanas: '' }]);
  const [otrasActividades, setOtrasActividades] = useState('');
  const [observaciones, setObservaciones] = useState('');

  const navigation = useNavigation(); // Obtener la instancia de navigation

  const handleSubmit = () => {
    // Lógica para manejar el envío de los datos del formulario
    console.log({
      carrera,
      grupo,
      tutor,
      cuatrimestre,
      fecha,
      tutoriasGrupales,
      otrasActividades,
      observaciones,
    });
  };

  const handleAtras = () => {
    navigation.navigate('Solicitudes'); // Navegar hacia atrás
  };

  const onChangeFecha = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setFecha(currentDate);
    setShowDatePicker(false); // Ocultar el DatePicker después de seleccionar una fecha
  };

  const agregarFila = () => {
    const nuevaFila = { id: tutoriasGrupales.length + 1, tema: '', semanas: '' };
    setTutoriasGrupales([...tutoriasGrupales, nuevaFila]);
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={handleAtras}>
          <Image 
            source={require('./Imagenes/atras.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Planeacion Cuatrimestral</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Formulario */}
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
          <TextInput
            style={styles.input}
            placeholder="Cuatrimestre"
            value={cuatrimestre}
            onChangeText={setCuatrimestre}
          />
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)} // Mostrar DatePicker al presionar este campo
          >
            <Text>{fecha.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={fecha}
              mode="date"
              display="default"
              onChange={onChangeFecha}
              style={styles.datePicker}
            />
          )}
        </View>

        {/* Tabla de tutorías grupales */}
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <View style={styles.columnHeader}>
              <Text style={styles.headerText}>No</Text>
            </View>
            <View style={[styles.columnHeader, { flex: 2 }]}>
              <Text style={styles.headerText}>Tema o Título de la Tutoría Grupal</Text>
            </View>
            <View style={styles.columnHeader}>
              <Text style={styles.headerText}>Número de semana programada</Text>
            </View>
          </View>
          {tutoriasGrupales.map((item, index) => (
            <View key={item.id} style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text>{index + 1}</Text>
              </View>
              <View style={[styles.tableCell, { flex: 2 }]}>
                <TextInput
                  style={styles.tableInput}
                  value={item.tema}
                  onChangeText={(text) => {
                    const newItems = [...tutoriasGrupales];
                    newItems[index].tema = text;
                    setTutoriasGrupales(newItems);
                  }}
                />
              </View>
              <View style={styles.tableCell}>
                <TextInput
                  style={styles.tableInput}
                  value={item.semanas}
                  onChangeText={(text) => {
                    const newItems = [...tutoriasGrupales];
                    newItems[index].semanas = text;
                    setTutoriasGrupales(newItems);
                  }}
                />
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={agregarFila}>
            <Text style={styles.addButtonText}>Agregar fila</Text>
          </TouchableOpacity>
        </View>

        {/* Total de tutorías grupales planeadas */}
        <View style={styles.totalContainer}>
          <Text>Total de tutorías grupales planeadas: __________</Text>
        </View>

        {/* Cuadros con encabezados */}
        <View style={styles.boxContainer}>
          <View style={styles.box}>
            <Text style={styles.boxHeader}>Otras actividades planeadas en materia de tutorías:</Text>
            <TextInput
              style={styles.boxInput}
              multiline
              numberOfLines={4}
              value={otrasActividades}
              onChangeText={setOtrasActividades}
            />
          </View>
          <View style={styles.box}>
            <Text style={styles.boxHeader}>Observaciones y notas:</Text>
            <TextInput
              style={styles.boxInput2}
              multiline
              numberOfLines={4}
              value={observaciones}
              onChangeText={setObservaciones}
            />
          </View>
        </View>

        {/* Botón de enviar */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#990634', // Color de fondo actualizado
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
    backgroundColor: '#000000', // Color de fondo del encabezado de la tabla
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white', // Color del texto del encabezado de la tabla
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
  totalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
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
  },
  boxHeader: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  boxInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  },
  boxInput2: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
    top: 34,
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
