import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, Button, Image, ScrollView } from 'react-native';
import { StyleSheet } from "react-native";
import { useTailwind } from 'tailwind-rn';
import PhotoMenu from '../components/PhotoMenu';
import { useState } from 'react';

const DetalleReto = ({ route }) => {
	const [id, setId] = useState('');
	const tw = useTailwind();
	const navigation = useNavigation();
	const imageURL = route.params.iconoURI;


	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Tu Reto',
			headerTitleAlign: 'center',
			headerStyle: {
				backgroundColor: '#95d7e7',
			},
			headerTitleStyle: {
				color: navigation.isFocused ? '#fff' : 'gray',
				fontWeight: 'bold',
			},
		});
	}, [navigation]);

	return (
		<View style={tw('bg-mainBlue flex-1')}>
		<ScrollView>

			

			<Text
				style={tw('uppercase text-xl font-bold text-center mt-3 underline')}
			>
				{route.params.nombre}

			</Text>
			<View style={styles.image}>
			{imageURL && <Image source={{uri: imageURL}} style={{width: 50, height: 50}}></Image>}
			</View>
			<Text style={tw('text-base p-1')}>
				Descripcion: {route.params.detalle}
			</Text>

			<Text style={tw('text-base p-1')}>
				Categoria: {route.params.categoria}
			</Text>
			<Text style={tw('text-base p-1')}>tiempo: {route.params.tiempo}</Text>
			<Text style={tw('text-base p-1')}>
				{route.params.activo ? 'Activo' : 'Inactivo'}
			</Text>
			<Text style={tw('text-base p-1')}>
				prioridad: {route.params.prioridad}
			</Text>
			<View style={tw('text-base p-1 bg-red-500 rounded-xl p-1')}>
				<Text style={tw('text-white')}>
					Completado: {route.params.completado}%
				</Text>

			</View>

			<PhotoMenu passId={route.params.id} style={tw('flex-1')}/>

		</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
  buttonStyle: {
    color: "white",
    fontSize: 30,
    lineHeight: 70,
    margin: 15,
    marginHorizontal: 40,
    borderRadius: 15,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
    

  },
	image:{
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	}
});

export default DetalleReto;

