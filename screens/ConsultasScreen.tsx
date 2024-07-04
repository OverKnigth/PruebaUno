import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, Alert } from 'react-native';
import { ref, onValue, remove } from 'firebase/database';
import { db } from '../config/config';
import Informacion from '../components/Informacion';

export default function ConsultaScreen() {
    const [idConsulta, setIdConsulta] = useState('');
    const [mascotas, setMascotas] = useState([]);
    const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);

    useEffect(() => {
        const mascotasRef = ref(db, 'id/');
        onValue(mascotasRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const mascotasArray = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
                setMascotas(mascotasArray);
            } else {
                setMascotas([]);
            }
        });
    }, []);

    const buscarMascotaPorId = () => {
        if (idConsulta.trim() !== '') {
            const nodoMascota = ref(db, 'id/' + idConsulta);
            onValue(nodoMascota, (snapshot) => {
                const mascota = snapshot.val();
                if (mascota) {
                    setMascotaSeleccionada(mascota);
                } else {
                    setMascotaSeleccionada(null);
                    Alert.alert('Mensaje', 'No se encontró ninguna mascota con ese ID.');
                }
            });
        } else {
            Alert.alert('Advertencia', 'Por favor ingrese un ID válido.');
        }
    };

    const eliminarMascota = (id) => {
        remove(ref(db, 'mascotas/' + id));
        Alert.alert('Mensaje', 'Mascota eliminada con éxito.');
        // Actualizar la lista de mascotas después de eliminar
        const nuevasMascotas = mascotas.filter((mascota) => mascota.id !== id);
        setMascotas(nuevasMascotas);
        setMascotaSeleccionada(null); // Limpiar la mascota seleccionada si se eliminó
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text1}>Consulta de Mascotas</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => setIdConsulta(text)}
                    value={idConsulta}
                    placeholder="Ingrese ID completo para buscar mascota"
                />
                <Button title="Buscar" onPress={buscarMascotaPorId} />
            </View>
            <FlatList
                data={mascotas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>ID: {item.id}</Text>
                        <Text style={styles.itemText}>Nombre: {item.nombre}</Text>
                        <Text style={styles.itemText}>Raza: {item.raza}</Text>
                        <Text style={styles.itemText}>Edad: {item.edad}</Text>
                        <Text style={styles.itemText}>Dueño: {item.dueño}</Text>
                        <Button title="Ver Detalles" onPress={() => setMascotaSeleccionada(item)} />
                        <Button title="Eliminar" onPress={() => eliminarMascota(item.id)} color="#A91D3A" />
                    </View>
                )}
            />
            {mascotaSeleccionada ? (
                <View style={styles.infoContainer}>
                    <Informacion mascota={mascotaSeleccionada} />
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7AB2B2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text1: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#4D869C',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#4D869C',
        width: 300,
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#CDE8E5',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        marginVertical: 10,
        color: '#7AB2B2',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    infoContainer: {
        marginTop: 20,
        backgroundColor: '#BFF6C3',
        borderRadius: 10,
        padding: 10,
    },
    itemContainer: {
        backgroundColor: '#CDE8E5',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        width: 300,
    },
    itemText: {
        fontSize: 16,
        color: '#4D869C',
        marginBottom: 5,
    },
});

