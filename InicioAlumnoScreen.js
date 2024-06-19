import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Animated, Dimensions } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function InicioAlumnoScreen() {
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
    navigation.navigate('FormularioRTIA');
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
          <Text style={styles.title}>Inicio</Text>
        </View>
        <View style={styles.centerBox}>
          <Image 
            source={require('./Imagenes/LogoInicio.png')}
            style={styles.logo}
          />
          <Text style={styles.welcomeText}>
            ¡Bienvenido a la App asesorías UTZMG!
          </Text>
          <Text style={styles.description}>
            Con esta aplicación, puedes solicitar asesorías de forma rápida y sencilla en cualquier momento y lugar.
          </Text>
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
              <Text style={styles.menuText}>Solicitud</Text>
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
  profileCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'gray',
    position: 'absolute',
    top: 10,
    left: 70,
  },
  centerBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 200,
    marginBottom: 50,
    height: 340,  // Establecer una altura específica para reducir la altura vertical
    // Eliminar flex: 1 para evitar que se expanda verticalmente
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4F1124',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  description: {
    textAlign: 'center',
    color: '#333',
    fontSize: 17,
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
