import { View, Text, Button } from 'react-native';
import { useTailwind } from 'tailwind-rn';

function Reto({ nombre, detalle, completado }) {
	const tw = useTailwind();

	return (
		<View containerStyle={tw('w-full')}>
			<Text style={tw('uppercase text-xl font-bold')}>{nombre}</Text>
			<Text>{detalle}</Text>
			<Text style={tw('absolute bottom-0 right-5')}>{completado}</Text>
		</View>
	);
}
export default Reto;
