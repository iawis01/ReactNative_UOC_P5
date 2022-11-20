import {
	View,
	Text,
	Button,
	ScrollView,
	ActivityIndicator,
	Pressable,
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

	const [goals, setGoals] = useState([]);
	useEffect(() => {
		onSnapshot(collection(db, 'retos'), snapshot => {
			setGoals(snapshot.docs.map(doc => doc.data()));
		});
	}, [goals]);

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
					<AntDesign name='mail' size={24} color='white' />
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

	return (
		// <View style={{ backgroundColor: '#95d7e7' }} flex={1}>
		<View style={tw('bg-mainBlue flex-1')}>
			<Image
				source={require('../assets/evolucion.jpg')}
				containerStyle={{ width: '100%', aspectRatio: 3 / 2 }}
				PlaceholderContent={<ActivityIndicator />}
			/>

			{/* <TouchableOpacity style={buttonStyle}>
				<Button
					title='Evolucion'
					onPress={() => navigation.navigate('Evolucion')}
				/>
			</TouchableOpacity> */}
			<ScrollView
				flex={1}
				space={1}
				mt='-20px'
				borderTopLeftRadius='20px'
				borderTopRightRadius='20px'
				pt='20px'
			>
				{goals.map((item, id) => (
					<Reto
						key={id}
						nombre={item.nombre}
						detalle={item.detalle}
						completado={item.completado}
					/>
				))}
			</ScrollView>
			<TouchableOpacity style={buttonStyle}>
				<Button
					title='Nuevo Reto'
					onPress={() => navigation.navigate('NuevoReto')}
				/>
			</TouchableOpacity>
			{/* 
			<TouchableOpacity style={buttonStyle}>
				<Button
					title='Retos Completados'
					onPress={() => navigation.navigate('Completados')}
				/>
			</TouchableOpacity>

			<TouchableOpacity style={buttonStyle}>
				<Button
					title='Retos Activos'
					onPress={() => navigation.navigate('Activos')}
				/>
			</TouchableOpacity> */}
		</View>
	);
};
export default Evolucion;
