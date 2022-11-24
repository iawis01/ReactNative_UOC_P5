import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';

const DetalleReto = ({ route }) => {
	const tw = useTailwind();
	const navigation = useNavigation();

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
		<View style={tw('bg-sky-100  h-full')}>
			<Text
				style={tw('uppercase text-xl font-bold text-center mt-3 underline')}
			>
				{route.params.nombre}
			</Text>
			<Text style={tw('text-base p-2')}>
				Descripcion: {route.params.detalle}
			</Text>
			<Text style={tw('text-base p-2')}>
				Categoria: {route.params.categoria}
			</Text>
			<Text style={tw('text-base p-2')}>tiempo: {route.params.tiempo}</Text>
			<Text style={tw('text-base p-2')}>
				{route.params.activo ? 'Activo' : 'Inactivo'}
			</Text>
			<Text style={tw('text-base p-2')}>
				prioridad: {route.params.prioridad}
			</Text>
			<View style={tw('absolute bottom-10 right-8 bg-red-500 rounded-xl p-1')}>
				<Text style={tw('text-white')}>
					Completado: {route.params.completado}%
				</Text>
			</View>
		</View>
	);
};
export default DetalleReto;
