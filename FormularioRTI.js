import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Animated, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function FormularioRTI({ route }) {
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [correo, setCorreo] = useState('');
  const [matricula, setMatricula] = useState('');
  const [tipoTutoria, setTipoTutoria] = useState('Ninguna');
  const [comentarios, setComentarios] = useState('');

  const { matriculaUsuario } = route.params;  // Obtener la matrícula desde los parámetros de la ruta
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuAnimation] = useState(new Animated.Value(-width));

  useEffect(() => {
    // Solicitar la información del usuario cuando el componente se monta
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://192.168.3.165:3300/api/usuario/${matriculaUsuario}`);
        const data = await response.json();

        if (response.ok) {
          setNombre(data.nombre);
          setApellidoPaterno(data.apellido_paterno);
          setApellidoMaterno(data.apellido_materno);
          setCorreo(data.correo);
          setMatricula(data.matricula);
        } else {
          console.error('Error al obtener la información del usuario:', data.error);
        }
      } catch (error) {
        console.error('Error al conectar con la API:', error);
      }
    };

    fetchUserInfo();
  }, [matriculaUsuario]);

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

  const handleSubmit = () => {
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
              value={nombre}
              editable={false}  // Campo no editable
            />
            <TextInput
              style={styles.input}
              placeholder="Apellido Paterno"
              value={apellidoPaterno}
              editable={false}  // Campo no editable
            />
            <TextInput
              style={styles.input}
              placeholder="Apellido Materno"
              value={apellidoMaterno}
              editable={false}  // Campo no editable
            />
            <TextInput
              style={styles.input}
              placeholder="Correo Electrónico"
              value={correo}
              editable={false}  // Campo no editable
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Matrícula"
              value={matricula}
              editable={false}  // Campo no editable
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
            <TouchableOpacity style={styles.menuItem}>
              <Image
                source={require('./Imagenes/calendario.png')}
                style={styles.menuItemIcon}
              />
              <Text style={styles.menuText}>Calendario</Text>
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
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
    backgroundColor: '#E86A33',
  },
  menuButton: {
    marginRight: 16,
  },
  menuIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  formContainer: {
    padding: 16,
    alignItems: 'center',
  },
  form: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    elevation: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  pickerContainer: {
    width: '100%',
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    height: '100%',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#58DC96',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: width,
    backgroundColor: '#FFFFFF',
    zIndex: 1000,
    padding: 20,
  },
  menuCloseButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  menuItemsContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#C4C4C4',
    alignSelf: 'center',
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuItemIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#333333',
  },
});
