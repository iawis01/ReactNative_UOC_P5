import {
	View,
	Button,
	ScrollView,
	ActivityIndicator,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { Image } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';
import { db } from '../db/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { ProgressBar } from 'react-native-paper';
import Reto from '../components/Reto';

const buttonStyle = {
	bottom: 0,
	color: 'white',
	fontSize: 42,
	lineHeight: 84,
	margin: 5,
	fontWeight: 'bold',
	textAlign: 'center',
	backgroundColor: '#000000c0',
	position: 'absolute',
	bottom: 50,
	right: 8,
	borderRadius: 50,
};

const Evolucion = () => {
	const tw = useTailwind();
	const navigation = useNavigation();
	const [selectedId, setSelectedId] = useState(null);
	const [loading, setLoading] = useState(true);
	const [goals, setGoals] = useState([]);
	const [status, setStatus] = useState(0.0);

	// Base de datos
	useEffect(() => {
		try {
			onSnapshot(collection(db, 'retos'), snapshot => {
				setGoals(snapshot.docs.map(doc => doc.data()));
			});
		} catch (error) {
			console.log(error);
		}
	}, [goals]);

	// Barra de cargado
	useEffect(() => {
		let value = 0.0;
		setLoading(true);
		const interval = setInterval(() => {
			value += 0.01;
			setStatus(value);
			if (value >= 1) {
				clearInterval(interval);
				setLoading(false);
			}
		}, 30);
	}, []);

	// Estilo del Header
	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<TouchableOpacity
					style={{ marginLeft: 12 }}
					onPress={() => navigation.goBack()}
				>
					<AntDesign name='left' size={24} color='white' />
				</TouchableOpacity>
			),
			headerRight: () => (
				<TouchableOpacity
					style={{ marginRight: 12 }}
					onPress={() => navigation.navigate('Contactar')}
				>
					<AntDesign name='team' size={24} color='white' />
				</TouchableOpacity>
			),
			title: 'Mi Evolucion',
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

	// Renderizar los retos en el FlatList
	const renderItem = ({ item }) => {
		// const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
		// const color = item.id === selectedId ? 'white' : 'black';
		return (
			<Reto
				key={item.id}
				nombre={item.nombre}
				detalle={item.detalle}
				completado={item.completado}
				categoria={item.categoria}
				tiempo={item.tiempo}
				activo={item.activo}
				prioridad={item.prioridad}
			/>
		);
	};

	return (
		// <View style={{ backgroundColor: '#95d7e7' }} flex={1}>
		<View style={tw('bg-mainBlue flex-1')}>
			<Image
				source={require('../assets/evolucion.jpg')}
				containerStyle={{ width: '100%', aspectRatio: 3 / 2 }}
				PlaceholderContent={<ActivityIndicator />}
			/>

			{loading ? (
				<ProgressBar
					style={{ marginTop: 100 }}
					progress={status}
					color='#49B5F2'
				/>
			) : (
				<>
					<FlatList
						data={goals}
						renderItem={renderItem}
						keyExtractor={item => item.id}
						extraData={selectedId}
					/>
					<TouchableOpacity style={buttonStyle}>
						<Button
							title='Nuevo Reto'
							onPress={() => navigation.navigate('NuevoReto')}
						/>
					</TouchableOpacity>
				</>
			)}
		</View>
	);
};
export default Evolucion;
