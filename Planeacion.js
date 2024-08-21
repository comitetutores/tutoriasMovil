import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; 
import { UserContext } from './UserContext'; 

export default function Planeacion() {
  const { user } = useContext(UserContext);
  const [carrera, setCarrera] = useState('');
  const [grupo, setGrupo] = useState('');
  const [tutor, setTutor] = useState('');
  const [cuatrimestre, setCuatrimestre] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [tutoriasGrupales, setTutoriasGrupales] = useState([{ id: 1, tema: '', semanas: '' }]);
  const [otrasActividades, setOtrasActividades] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [totalTutorias, setTotalTutorias] = useState(1);  

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://192.168.0.10:3300/api/planeacion', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        
        const data = response.data;
        setCarrera(data.carrera || '');
        setGrupo(data.grupo_tutor || '');
        setTutor(data.nombre_tutor || '');
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        Alert.alert('Error', 'No se pudo obtener los datos del usuario.');
      }
    };

    if (user && user.token) {
      fetchUserData();
    }
  }, [user]);

  const handleSubmit = () => {
    console.log('Registrando información:', {
      carrera,
      grupo,
      tutor,
      cuatrimestre,
      fecha,
      tutoriasGrupales,
      otrasActividades,
      observaciones,
    });
    Alert.alert('Registro exitoso', 'La información se ha registrado correctamente.');
  };

  const handleAtras = () => {
    navigation.navigate('Solicitudes');
  };

  const onChangeFecha = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setFecha(currentDate);
    setShowDatePicker(false);
  };

  const agregarFila = () => {
    const nuevaFila = { id: tutoriasGrupales.length + 1, tema: '', semanas: '' };
    setTutoriasGrupales([...tutoriasGrupales, nuevaFila]);
    setTotalTutorias(totalTutorias + 1);  
  };

  const borrarUltimaFila = () => {
    if (tutoriasGrupales.length > 1) {
      setTutoriasGrupales(tutoriasGrupales.slice(0, -1));
      setTotalTutorias(totalTutorias - 1); 
    } else {
      Alert.alert('Advertencia', 'Debe haber al menos una fila en la tabla.');
    }
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
        <Text style={styles.title}>Planeacion Cuatrimestral</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Carrera"
            value={carrera}
            onChangeText={setCarrera}
            editable={false} 
          />
          <TextInput
            style={styles.input}
            placeholder="Grupo"
            value={grupo}
            onChangeText={setGrupo}
            editable={false} 
          />
          <TextInput
            style={styles.input}
            placeholder="Tutor"
            value={tutor}
            onChangeText={setTutor}
            editable={false} 
          />
          <TextInput
            style={styles.input}
            placeholder="Cuatrimestre"
            value={cuatrimestre}
            onChangeText={setCuatrimestre}
            editable={false} 
          />
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
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
          <TouchableOpacity style={styles.addButton} onPress={borrarUltimaFila}>
            <Text style={styles.addButtonText}>Borrar última fila</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.totalContainer}>
          <Text>Total de tutorías grupales planeadas: {totalTutorias}</Text>
        </View>


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
