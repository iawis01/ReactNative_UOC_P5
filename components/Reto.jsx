import { useState, useEffect } from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function Reto({
	id,
	nombre,
	detalle,
	completado,
	categoria,
	tiempo,
	activo,
	prioridad,
	iconoURI
}) {
	const tw = useTailwind();
	const navigation = useNavigation();

	return (
		<View style={tw('m-1 ml-2')}>
			<TouchableOpacity
				activeOpacity={0.9}
				onPress={() =>
					navigation.navigate('DetalleReto', {
						id: id,
						nombre: nombre,
						detalle: detalle,
						completado: completado,
						categoria: categoria,
						tiempo: tiempo,
						activo: activo,
						prioridad: prioridad,
						iconoURI: iconoURI
					})
				}
			>
				<Text style={tw('uppercase text-xl font-bold')}>{nombre}</Text>
				<Text>{detalle}</Text>
				<Image source={{ uri: iconoURI }} style={{width: 20, height: 20}}></Image>
				<View style={tw('absolute bottom-0 right-8 bg-red-500 rounded-xl p-1')}>
					<Text style={tw('text-white')}>{completado}%</Text>
				</View>

				<AntDesign
					name='right'
					size={18}
					color='white'
					style={tw('absolute right-2 bottom-1/4')}
				/>
			</TouchableOpacity>
		</View>
	);
}
export default Reto;
