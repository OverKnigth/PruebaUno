import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation } : any) {
  return (
    <ImageBackground 
      source={{ uri: 'https://p4.wallpaperbetter.com/wallpaper/675/208/1000/pokemon-video-games-pixel-art-pixels-wallpaper-preview.jpg' }} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Stalin Moposita</Text>
        <Image style={styles.image} source={{uri: 'https://i.gifer.com/2iiJ.gif'}}/>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={() => navigation.navigate('Main')}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  title: {
    fontSize: 40,
    color: 'white',
    marginBottom: 30,
  },
  image: {
    width: 150,
    height: 100,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#508D4E',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});
