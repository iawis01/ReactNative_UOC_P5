import { View, Text, StyleSheet } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
const Navegador = () => {
	const tw = useTailwind();
	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.text}>Evolucion</Text>
			</View>
			<View>
				<Text style={styles.text}>Nuevo Reto</Text>
			</View>
			<Text style={styles.text}>Perfil</Text>
			<Text style={styles.text}>Contactar</Text>
			<Text style={styles.text}>Retos completados</Text>
			<Text style={styles.text}>Retos Activos</Text>
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
