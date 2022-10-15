import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
const Navegador = () => {
	const tw = useTailwind();
	const onEvolucion = () => Alert.alert('Evolucion apretado');
	const onNuevoReto = () => Alert.alert('Nuevo Reto apretado');
	const onPerfil = () => Alert.alert('Perfil apretado');
	const onContactar = () => Alert.alert('Contactar apretado');
	const onCompletados = () => Alert.alert('Retos Completados apretado');
	const onActivos = () => Alert.alert('Retos Activos apretado');
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={onEvolucion}>
				<Text style={styles.text}>Evolucion</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={onNuevoReto}>
				<View>
					<Text style={styles.text}>Nuevo Reto</Text>
				</View>
			</TouchableOpacity>

			<TouchableOpacity onPress={onPerfil}>
				<View>
					<Text style={styles.text}>Perfil</Text>
				</View>
			</TouchableOpacity>

			<TouchableOpacity onPress={onContactar}>
				<View>
					<Text style={styles.text}>Contactar</Text>
				</View>
			</TouchableOpacity>

			<TouchableOpacity onPress={onCompletados}>
				<View>
					<Text style={styles.text}>Retos completados</Text>
				</View>
			</TouchableOpacity>

			<TouchableOpacity onPress={onActivos}>
				<View>
					<Text style={styles.text}>Retos Activos</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 30,
		left: 50,
	},
	text: {
		marginTop: 3,
		marginBottom: 'auto',
		fontSize: 36,
		color: 'white',
		textAlign: 'center',
		backgroundColor: '#000000c0',
	},
});
export default Navegador;
