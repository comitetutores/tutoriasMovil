import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground, Animated, Dimensions, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { UserContext } from './UserContext';

const { width } = Dimensions.get('window');

const FormularioRTIA = () => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    nombre: '',
    app: '',
    apm: '',
    correo: '',
    matricula: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://192.168.0.10:3300/api/usuario', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (user && user.token) {
      fetchUserData();
    }
  }, [user]);
  

  const navigation = useNavigation();

  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [correo, setCorreo] = useState('');
  const [matricula, setMatricula] = useState('');
  const [tipoTutoria, setTipoTutoria] = useState('Ninguna');
  const [comentarios, setComentarios] = useState('');

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuAnimation] = useState(new Animated.Value(-width));

  const toggleMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: menuVisible ? -width : 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setMenuVisible(!menuVisible);
    });
  };

  const handleInicioPress = () => {
    navigation.navigate('InicioAlumno');
  };

  const handleAyudaPress = () => {
    navigation.navigate('Ayuda');
  };

  const handleCSPress = () => {
    navigation.navigate('Login');
  };

  const handleSubmit = async () => {
      // Verificar si el tipo de tutoría es "Ninguna"
  if (tipoTutoria === 'Ninguna') {
    alert('Por favor, seleccione una opción válida en Asesoría.');
    return;
  }

    try {
      const response = await axios.post('http://192.168.0.10:3300/api/registro-tutoria', {
        matricula: formData.matricula,
        nombre_alumno: formData.nombre,
        app: formData.app,
        apm: formData.apm,
        correo_alumno: formData.correo,
        asesoria: tipoTutoria,
        comentarios: comentarios,
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
  
      // Mostrar mensaje de éxito
      Alert.alert('Éxito', 'El registro fue exitoso', [{ text: 'OK' }]);
      
      // Opcional: Puedes limpiar los campos del formulario o redirigir al usuario aquí
      setNombre('');
      setApellidoPaterno('');
      setApellidoMaterno('');
      setCorreo('');
      setMatricula('');
      setTipoTutoria('Ninguna');
      setComentarios('');
  
    } catch (error) {
      console.error('Error al guardar el registro:', error);
      // Mostrar mensaje de error
      Alert.alert('Error', 'Hubo un problema al guardar el registro. Inténtalo de nuevo más tarde.', [{ text: 'OK' }]);
    }
  };
  
  

  return (
    <ImageBackground
      source={require('./Imagenes/FondoPantalla2.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
            <Image
              source={require('./Imagenes/MenuDes.png')}
              style={styles.menuIcon}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Formulario</Text>
        </View>
        
        <ScrollView contentContainerStyle={styles.formContainer}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={formData.nombre}
              onChangeText={setNombre}
              editable={false} // No editable si obtienes el valor del usuario
            />
            <TextInput
              style={styles.input}
              placeholder="Apellido Paterno"
              value={formData.app}
              onChangeText={setApellidoPaterno}
              editable={false} // No editable si obtienes el valor del usuario
            />
            <TextInput
              style={styles.input}
              placeholder="Apellido Materno"
              value={formData.apm}
              onChangeText={setApellidoMaterno}
              editable={false} // No editable si obtienes el valor del usuario
            />
            <TextInput
              style={styles.input}
              placeholder="Correo Electrónico"
              value={formData.correo}
              onChangeText={setCorreo}
              keyboardType="email-address"
              editable={false} // No editable si obtienes el valor del usuario
            />
            <TextInput
              style={styles.input}
              placeholder="Matrícula"
              value={formData.matricula}
              onChangeText={setMatricula}
              editable={false} // No editable si obtienes el valor del usuario
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
                <Picker.Item label="Apoyo Informacion Becas y Tramites" value="ApoyoInformacionBecasyTramites" />
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
        
        <Animated.View style={[styles.menuContainer, { left: menuAnimation }]}>
          <TouchableOpacity style={styles.menuCloseButton} onPress={toggleMenu}>
            <Image
              source={require('./Imagenes/MenuDes.png')}
              style={styles.menuIcon}
            />
          </TouchableOpacity>
          <View style={styles.menuItemsContainer}>
            <View style={styles.circle}></View>
            <TouchableOpacity style={styles.menuItem} onPress={handleInicioPress}>
              <Image
                source={require('./Imagenes/Inicio.png')}
                style={styles.menuItemIcon}
              />
              <Text style={styles.menuText}>Inicio</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Image
                source={require('./Imagenes/mensaje.png')}
                style={styles.menuItemIcon}
              />
              <Text style={styles.menuText}>Mensajes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleAyudaPress}>
              <Image
                source={require('./Imagenes/Ayuda.png')}
                style={styles.menuItemIcon}
              />
              <Text style={styles.menuText}>Ayuda</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleCSPress}>
              <Image
                source={require('./Imagenes/CerrarSesion.png')}
                style={styles.menuItemIcon}
              />
              <Text style={styles.menuText}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
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
  menuBottomItem: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default FormularioRTIA;
