import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import InicioScreen from './InicioScreen';
import InicioAlumnoScreen from './InicioAlumnoScreen';
import SolicitudesScreen from './SolicitudesScreen';
import RegistroTG from './RegistroTG';
import SolicitudA from './SolicitudA';
import SolicitudAR from './SolicitudAR';
import SolicitudB from './SolicitudB';
import AyudaScreen from './AyudaScreen';
import FormularioRTI from './FormularioRTI';
import FormularioRTIA from './FormularioRTIA';
import Planeacion from './Planeacion';
import InformeT from './InformeT';
import { UserProvider } from './UserContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Inicio" component={InicioScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="InicioAlumno" component={InicioAlumnoScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Solicitudes" component={SolicitudesScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="SolicitudA" component={SolicitudA} options={{ headerShown: false }}/>
          <Stack.Screen name="SolicitudAR" component={SolicitudAR} options={{ headerShown: false }}/>
          <Stack.Screen name="SolicitudB" component={SolicitudB} options={{ headerShown: false }}/>
          <Stack.Screen name="Ayuda" component={AyudaScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="FormularioRTI" component={FormularioRTI} options={{ headerShown: false }}/>
          <Stack.Screen name="FormularioRTIA" component={FormularioRTIA} options={{ headerShown: false }}/>
          <Stack.Screen name="RegistroTG" component={RegistroTG} options={{ headerShown: false }}/>
          <Stack.Screen name="Planeacion" component={Planeacion} options={{ headerShown: false }}/>
          <Stack.Screen name="InformeT" component={InformeT} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
