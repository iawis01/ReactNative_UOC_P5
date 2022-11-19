import {
	View,
	Text,
	Button,
	ScrollView,
	ActivityIndicator,
	Pressable,
	TouchableOpacity,
} from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { Image } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';

const buttonStyle = {
	color: 'white',
	fontSize: 42,
	lineHeight: 84,
	margin: 5,
	fontWeight: 'bold',
	textAlign: 'center',
	backgroundColor: '#000000c0',
};

const Evolucion = () => {
	const tw = useTailwind();
	const navigation = useNavigation();

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
		<ScrollView style={{ backgroundColor: '#95d7e7' }}>
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
		</ScrollView>
	);
};
export default Evolucion;
