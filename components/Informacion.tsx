import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Informacion(props: any) {
    const { id } = props.mascota; // Aquí accedemos a la mascota desde props

    return (
        <View style={styles.container}>
            <Text>Nombre: {id.nombre}</Text>
            <Text>Raza: {id.raza}</Text>
            <Text>Edad: {id.edad}</Text>
            <Text>Dueño: {id.dueño}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4D869C',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
