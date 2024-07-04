import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, TouchableOpacity, Image } from 'react-native';

export default function ApiScreen() {
  const API_PELIS = "https://jritsqmet.github.io/web-api/peliculas2.json"
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(API_PELIS)
    .then(response => response.json())
    .then(datos => setData(datos))

    console.log(data.peliculas);

  }, []) 

  function mensaje(peliculas:pelis){
    Alert.alert("Mensaje", `Descripcion: ${peliculas.descripcion} \nAño: ${peliculas.anio}`)
  }

  interface pelis{
    titulo: string,
    anio: String,
    descripcion: String,
    image: string,
    duracion: String
  }

  return (
    <View>
      <Text>Api</Text>
      <FlatList
        data={data.peliculas}
        renderItem={({item}: {item:pelis}) => (
          <TouchableOpacity onPress={() => mensaje(item)}>
            <Text>{item.titulo}</Text>
            <Image
              source={{uri: item.image}}
              style={styles.img}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 100
  }
})