import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';  

export default function SolicitudA() {
  const navigation = useNavigation();  

  const handleAtras = () => {
    navigation.navigate('Solicitudes');  
  };

  return (
    <ImageBackground 
      source={require('./Imagenes/FondoPantalla2.jpg')} 
      style={styles.background}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} onPress={handleAtras}>
            <Image 
              source={require('./Imagenes/atras.png')}
              style={styles.menuIcon}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Asesoría</Text>
        </View>

        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.whiteBox}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>SOLICITUD DE ASESORÍA</Text>
            </View>

            <Text style={styles.instructionText}>
              Para descargar el formato de{' '}
              <Text style={styles.boldText}>SOLICITUD DE ASESORÍA</Text>, presiona el link que está abajo de este texto.
            </Text>

            <View style={styles.imageContainer}>
              <Image 
                source={require('./Imagenes/flecha.png')}
                style={styles.image}
              />
              <Image 
                source={require('./Imagenes/flecha.png')}
                style={styles.image}
              />
            </View>

            <View style={styles.linkContainer}>
              <TouchableOpacity onPress={() => Linking.openURL('https://drive.google.com/file/d/17zUjVHLuR9PlTCrZt2RuM9XVAGoOUTYI/view?usp=drive_link ')}>
                <Text style={styles.linkText}>https://drive.google.com/file/d/17zUjVHLuR9PlTCrZt2RuM9XVAGoOUTYI/view?usp=drive_link </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
  contentContainer: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  whiteBox: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 50,  
  },
  titleContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4F1124',
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: '#000000', 
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
    lineHeight: 24,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#4F1124', 
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  image: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  linkContainer: {
    backgroundColor: '#CECCCC',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  linkText: {
    color: '#0000EE',
    textDecorationLine: 'underline',
  },
});
