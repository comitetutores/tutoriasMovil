import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground, Dimensions, ScrollView, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { UserContext } from './UserContext'; // Asegúrate de importar tu contexto de usuario

const { width } = Dimensions.get('window');

const FormularioRTI = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext); // Obtener el usuario del contexto

  const [fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [nombreAlumno, setNombreAlumno] = useState('');
  const [matricula, setMatricula] = useState('');
  const [carrera, setCarrera] = useState('');
  const [tutor, setTutor] = useState('');
  const [grupo, setGrupo] = useState('');
  const [temasTratados, setTemasTratados] = useState('');
  const [tendenciaAcademica, setTendenciaAcademica] = useState('');
  const [metasAcuerdos, setMetasAcuerdos] = useState('');
  const [apoyoTramite, setApoyoTramite] = useState('');
  const [herramientasDiagnostico, setHerramientasDiagnostico] = useState('');
  const [comentarios, setComentarios] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://192.168.0.10:3300/api/formulario', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        
        const data = response.data;
  
        setTutor(data.nombre_tutor || '');
        setGrupo(data.grupo_tutor || '');

        setNombreAlumno(data.nombre_alumno || '');
        setMatricula(data.matricula_alumno || '');
        setCarrera(data.carrera_alumno || '');
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        Alert.alert('Error', 'No se pudo obtener los datos del usuario.');
      }
    };
  
    if (user && user.token) {
      fetchUserData();
    }
  }, [user]);

  const handleAtras = () => {
    navigation.navigate('Solicitudes'); 
  };

  const handleRegistrar = () => {
    console.log('Registrando información:', {
      fecha,
      nombreAlumno,
      matricula,
      carrera,
      tutor,
      grupo,
      temasTratados,
      tendenciaAcademica,
      metasAcuerdos,
      apoyoTramite,
      herramientasDiagnostico,
      comentarios,
    });
    Alert.alert('Registro exitoso', 'La información se ha registrado correctamente.');
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setShowDatePicker(Platform.OS === 'ios');
    setFecha(currentDate);
  };
  
  return (
    <ImageBackground
      source={require('./Imagenes/FondoPantalla2.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={handleAtras}>
          <Image 
            source={require('./Imagenes/atras.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Formulario</Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.formContainer2}>
            <TouchableOpacity onPress={showDatepicker}>
              <Text style={styles.input}>{fecha.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={fecha}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Nombre del alumno"
              value={nombreAlumno}
              editable={false} 
            />
            <TextInput
              style={styles.input}
              placeholder="Matrícula"
              value={matricula}
              editable={false} 
            />
            <TextInput
              style={styles.input}
              placeholder="Carrera"
              value={carrera}
              editable={false} 
            />
            <TextInput
              style={styles.input}
              placeholder="Tutor"
              value={tutor}
              editable={false} 
            />
            <TextInput
              style={styles.input}
              placeholder="Grupo"
              value={grupo}
              editable={false} 
            />
          </View>

          <View style={styles.form}>
            <View style={styles.pickerContainer}>
              <Text style={styles.sectionTitle}>Temas Tratados</Text>
              <Picker
                selectedValue={temasTratados}
                onValueChange={(itemValue) => setTemasTratados(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Seleccione una opción" value="" />
                <Picker.Item label="Entrevista inicial" value="Entrevista inicial" />
                <Picker.Item label="Autoevaluación de tendencia académica" value="Autoevaluación de tendencia académica" />
                <Picker.Item label="Detección de hábitos de estudios" value="Detección de hábitos de estudios" />
                <Picker.Item label="Apoyo para tramite" value="Apoyo para tramite" />
                <Picker.Item label="Metas y acuerdos" value="Metas y acuerdos" />
                <Picker.Item label="Detección de necesidades Baja escolar no académica" value="Detección de necesidades Baja escolar no académica" />
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.sectionTitle}>Tendencia académica</Text>
              <Picker
                selectedValue={tendenciaAcademica}
                onValueChange={(itemValue) => setTendenciaAcademica(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Seleccione una opción" value="" />
                <Picker.Item label="Se anexa impresión UTZYN" value="Se anexa impresión UTZYN" />
                <Picker.Item label="Anexar formato de tendencia académica" value="Anexar formato de tendencia académica" />
                <Picker.Item label="El alumno tiene problemas en las materias" value="El alumno tiene problemas en las materias" />
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.sectionTitle}>Metas y Acuerdos</Text>
              <Picker
                selectedValue={metasAcuerdos}
                onValueChange={(itemValue) => setMetasAcuerdos(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Seleccione una opción" value="" />
                <Picker.Item label="Metas establecidas a corto plazo" value="Metas establecidas a corto plazo" />
                <Picker.Item label="Metas establecidas a largo plazo" value="Metas establecidas a largo plazo" />
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.sectionTitle}>Apoyo a trámites</Text>
              <Picker
                selectedValue={apoyoTramite}
                onValueChange={(itemValue) => setApoyoTramite(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Seleccione una opción" value="" />
                <Picker.Item label="Baja temporal" value="Baja temporal" />
                <Picker.Item label="Baja definitiva" value="Baja definitiva" />
                <Picker.Item label="Reingreso" value="Reingreso" />
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.sectionTitle}>Herramientas de Diagnóstico de Habilidades de Estudio</Text>
              <Picker
                selectedValue={herramientasDiagnostico}
                onValueChange={(itemValue) => setHerramientasDiagnostico(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Seleccione una opción" value="" />
                <Picker.Item label="Examen diagnóstico de matemáticas" value="Examen diagnóstico de matemáticas" />
                <Picker.Item label="Examen diagnóstico de lecto-escritura" value="Examen diagnóstico de lecto-escritura" />
              </Picker>
            </View>

            <View style={styles.textAreaContainer}>
              <Text style={styles.sectionTitle}>Comentarios adicionales</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Escribe aquí tus comentarios"
                value={comentarios}
                onChangeText={setComentarios}
                multiline={true}
                numberOfLines={4}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.button2} onPress={handleRegistrar}>
            <Text style={styles.buttonText2}>Registrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

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
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.75,
    height: '100%',
    backgroundColor: '#4F1124',
    padding: 20,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  menuCloseButton: {
    position: 'absolute',
    top: 30,
    right: 10,
  },
  menuItemsContainer: {
    marginTop: 280,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginBottom: -150,
    top: -200,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  menuItemIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  menuText: {
    fontSize: 18,
    color: 'white',
  },
  formContainer: {
    padding: 20,
  },
  formContainer2: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  input2: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    top: 20,
  },
  section: {
    marginBottom: 20,
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    backgroundColor: '#ccc',
    padding: 5,
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    backgroundColor: '#62152D',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    top: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  input3: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  comentariosInput: {
    height: 120,
  },
  button2: {
    backgroundColor: '#62152D',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20, // Ajuste adicional para el botón
  },

  buttonText2: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FormularioRTI;
