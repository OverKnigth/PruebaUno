import { onValue, ref, set } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import { db } from '../config/config';
import { TextInput } from 'react-native-gesture-handler';


export default function RegistroScreen() {

    const [id, setID] = useState('');
    const [nombre, setNombre] = useState('');
    const [raza, setRaza] = useState('');
    const [edad, setEdad] = useState('');
    const [dueño, setDueño] = useState('');
    const [guardadoCorrectamente, setGuardadoCorrectamente] = useState(false);
  
    const guardarMascota = () => {
      if (id && nombre && raza && edad && dueño) {
        set(ref(db, 'id/' + id), {
          id: id,
          nombre: nombre,
          raza: raza,
          edad: edad,
          dueño: dueño
        })
        .then(() => {
          Alert.alert("Mensaje", "¡Usuario registrado correctamente!");
          setID('');
          setNombre('');
          setRaza('');
          setEdad('');
          setDueño('');
          setGuardadoCorrectamente(true);
        })
        .catch(error => {
          Alert.alert("Error", "Hubo un problema al registrar el usuario: " + error.message);
        });
      } else {
        Alert.alert("Advertencia", "Por favor ingresa un usuario y un email válidos.");
      }
    };
  
  
    useEffect(() => {
      const nodoUsuario = ref(db, 'id/' + id);
      const listener = onValue(nodoUsuario, (snapshot) => {
        const mascotaGuardado = snapshot.val();
        if (mascotaGuardado) {
          console.log("Mascota guardada correctamente:", mascotaGuardado);
        }
      });
  
      return () => {
      
        listener();
      };
    }, [id]);
  

    return (
        <ImageBackground source={{ uri: "https://pbs.twimg.com/media/F0wYfBxWYAEhZBR.png:large" }} style={styles.background}>
          <View style={styles.container}>
            <View style={styles.containerdos}>
              <Text style={styles.text}>¡AGREGA A TU MASCOTA!</Text>
              <Text style={styles.textDos}>ID</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingresa su ID"
                placeholderTextColor='#434242f7'
                value={id}
                onChangeText={text => setID(text)}
              />
              <Text style={styles.textDos}>Nombre</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingresa su nombre"
                placeholderTextColor='#434242f7'
                value={nombre}
                onChangeText={text => setNombre(text)}
              />
              <Text style={styles.textDos}>Raza</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingresa su raza"
                placeholderTextColor='#434242f7'
                value={raza}
                onChangeText={text => setRaza(text)}
              />
              <Text style={styles.textDos}>Edad</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingresa su edad"
                placeholderTextColor='#434242f7'
                value={edad}
                onChangeText={text => setEdad(text)}
              />
              <Text style={styles.textDos}>Dueño</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingresa su dueño"
                placeholderTextColor='#434242f7'
                value={dueño}
                onChangeText={text => setDueño(text)}
              />
            <TouchableOpacity style={styles.btn} onPress={() => { guardarMascota(); }}>
                <Text style={styles.btntext}>REGISTRAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      containerdos: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#BFF6C3',
        borderRadius: 30,
        padding: 20,
      },
      text: {
        fontSize: 22,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        color: "black",
        fontWeight: "bold",
      },
      textDos: {
        textAlign: "left",
        color: "black",
        fontSize: 19,
        marginVertical: 5,
      },
      btn: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#508D4E',
        borderRadius: 5,
        alignItems: 'center',
      },
      btntext: {
        fontSize: 15,
        color: "black",
        fontWeight: "bold",
      },
      input: {
        height: 50,
        width: "80%",
        marginVertical: 10,
        marginHorizontal: 15,
        borderRadius: 21,
        fontSize: 20,
        backgroundColor: '#1c1c1cf7',
        paddingHorizontal: 20,
        color: 'white',
        textAlign: "center",
      },
      background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
    });