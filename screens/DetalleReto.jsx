import React from 'react';
import { View, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';

const DetalleReto = ({ route, nombre, detalle, completado }) => {
	const tw = useTailwind();

	return (
		<View containerStyle={tw('flex-1 h-full bg-fuchsia-500')}>
			<Text style={tw('uppercase text-xl font-bold')}>
				{route.params.nombre}
			</Text>
			<Text>{route.params.detalle}</Text>
			<Text style={tw('absolute bottom-0 right-8 ')}>
				{route.params.completado}
			</Text>
		</View>
	);
};
export default DetalleReto;
