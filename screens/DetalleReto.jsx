import React from 'react';
import { View, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';

const DetalleReto = ({ route }) => {
	const tw = useTailwind();
	console.log(route.params);

	return (
		<View containerStyle={tw('flex-1 h-full bg-fuchsia-500')}>
			<Text style={tw('uppercase text-xl font-bold')}>
				{route.params.nombre}
			</Text>
			<Text>Descripcion: {route.params.detalle}</Text>
			<Text>Categoria: {route.params.categoria}</Text>
			<Text>tiempo: {route.params.tiempo}</Text>
			<Text>activo: {route.params.activo ? 'Activo' : 'Inactivo'}</Text>
			<Text>prioridad: {route.params.prioridad}</Text>
			<Text style={tw('absolute bottom-0 right-8 ')}>
				Completado: {route.params.completado}
			</Text>
		</View>
	);
};
export default DetalleReto;
