import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground, Animated, Dimensions, ScrollView } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window');

export default function FormularioRTI() {
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [correo, setCorreo] = useState('');
  const [matricula, setMatricula] = useState('');
  const [tipoTutoria, setTipoTutoria] = useState('Ninguna');
  const [comentarios, setComentarios] = useState('');

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuAnimation] = useState(new Animated.Value(-width));
  const navigation = useNavigation();

  const toggleMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: menuVisible ? -width : 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setMenuVisible(!menuVisible);
    });
  };

  const handleSolicitudesPress = () => {
    navigation.navigate('Solicitudes');
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
      comentarios
    });
  };

  return (
    <ImageBackground 
      source={require('./Imagenes/FondoPantalla.jpg')} 
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
              <Picker.Item label="Solicitar Tutoría" value="SolicitarTutoría" />
              <Picker.Item label="Solicitar Asesoría" value="TutoriaIndividual" />
              <Picker.Item label="Solicitud de Baja" value="SolicituddeBaja" />
              <Picker.Item label="Apoyo Informacion Becas y Tramites" value="ApoyoInformacionBecasyTramites" />
              <Picker.Item label="Apoyo Servicios al Estudiante" value="ApoyoServiciosalEstudiante" />

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
            <Text style={styles.buttonText}>Solicitar</Text>
          </TouchableOpacity>
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
          </View>
          <View style={[styles.menuBottomItem, { bottom: 20 }]}>
            <Image 
              source={require('./Imagenes/CerrarSesion.png')}
              style={styles.menuItemIcon}
            />
            <TouchableOpacity onPress={handleCSPress}>
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
    marginTop: 280, // Ajusta según sea necesario para más espacio vertical
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
    marginRight: 10,
  },
  menuText: {
    fontSize: 18,
    color: 'white',
  },
  menuBottomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 70, // Ajustar según sea necesario
    left: 15, // Ajustar según sea necesario
    width: '100%',
  },
});
