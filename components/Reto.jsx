import {
	View,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { Image } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function Reto({ nombre, detalle, completado }) {
	const tw = useTailwind();
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			activeOpacity={0.9}
			onPress={() =>
				navigation.navigate('DetalleReto', {
					nombre: nombre,
					detalle: detalle,
					completado: completado,
				})
			}
		>
			<Text style={tw('uppercase text-xl font-bold')}>{nombre}</Text>
			<Text>{detalle}</Text>
			<View style={tw('absolute bottom-0 right-8 bg-red-500 rounded-xl p-1 ')}>
				<Text style={tw(' text-white')}>{completado}</Text>
			</View>

			<AntDesign
				name='right'
				size={18}
				color='white'
				style={tw('absolute right-2 bottom-1/4')}
			/>
		</TouchableOpacity>
	);
}
export default Reto;
