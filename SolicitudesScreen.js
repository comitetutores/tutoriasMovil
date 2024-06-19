import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Animated, Dimensions } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function SolicitudesScreen() {
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

  const handleListasPress = () => {
    navigation.navigate('FormularioRTI');
  };

  const handleRegistroTutoriaGrupalPress = () => {
    navigation.navigate('RegistroTG');
  };

  const handleInfoPress = () => {

  };

  const handleTutoriaIndividualRegistroPress = () => {
    
  };

  const handlePlaneacionPress = () => {
    navigation.navigate('Planeacion');
  };

  const handleRegistroGrupalPress = () => {
  };

  const handleSolicitudAsesoriaPress = () => {
    navigation.navigate('SolicitudA');  

  };

  const handleAccionRemedialPress = () => {
    navigation.navigate('SolicitudAR');  
  };

  const handleFormatoBajaPress = () => {
    navigation.navigate('SolicitudB');  
  };

  const handleSolicitudesPress = () => {
    navigation.navigate('Solicitudes');
  };

  const handleInicioPress = () => {
    navigation.navigate('Inicio');
  };

  const handleAyudaPress = () => {
    navigation.navigate('Ayuda');
  };

  const handleCSPress = () => {
    navigation.navigate('Login');
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
          <Text style={styles.title}>Solicitudes</Text>
        </View>


        <View style={styles.content}>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={handlePlaneacionPress}>
              <Image 
                source={require('./Imagenes/planeacion.png')}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Planeacion Cuatrimestral</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleListasPress}>
              <Image 
                source={require('./Imagenes/curriculum.png')}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Registro Tutoria Individual</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={handleInfoPress}>
              <Image 
                source={require('./Imagenes/notas.png')}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Informe de Tutor</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleTutoriaIndividualRegistroPress}>
              <Image 
                source={require('./Imagenes/aprobar.png')}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Tutoria Individual Registro</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={handleSolicitudAsesoriaPress}>
              <Image 
                source={require('./Imagenes/pdf.png')}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Solicitud de Asesoría</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleRegistroTutoriaGrupalPress}>
              <Image 
                source={require('./Imagenes/listas.png')}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Registro Tutoria Grupal</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={handleAccionRemedialPress}>
              <Image 
                source={require('./Imagenes/pdf.png')}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Solicitud Acciones Remediales </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleRegistroGrupalPress}>
              <Image 
                source={require('./Imagenes/listaVF.png')}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Tutoria Grupal Registro</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={handleFormatoBajaPress}>
              <Image 
                source={require('./Imagenes/pdf.png')}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Solicitud de Baja </Text>
            </TouchableOpacity>
          </View>
        </View>


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
            <TouchableOpacity style={styles.menuItem} onPress={handleSolicitudesPress}>
              <Image 
                source={require('./Imagenes/Solicitudes.png')}
                style={styles.menuItemIcon}
              />
              <Text style={styles.menuText}>Solicitudes</Text>
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
  content: {
    top: -10, //subir o bajar TODOS los botones a la vez
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#62152D',
    borderRadius: 10,
    width: '45%',
    padding: 10,
    alignItems: 'center',
  },
  buttonIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
    marginTop: 300, // Ajusta según sea necesario para más espacio vertical
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
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginBottom: -150,
    top: -200,
  },
});
