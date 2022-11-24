import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect, useState } from 'react';
import { Button, ScrollView, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useTailwind } from 'tailwind-rn';

const Contactar = () => {
	const tw = useTailwind();

	const initialText = '';
	const [text, setText] = useState(initialText);
	const navigation = useNavigation();

	// Estilo del Header
	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Equipo',
			headerTitleAlign: 'center',
			headerStyle: {
				backgroundColor: '#008d92',
			},
			headerTitleStyle: {
				color: navigation.isFocused ? '#fff' : 'gray',
				fontWeight: 'bold',
			},
			headerLeft: () => (
				<TouchableOpacity
					style={{ marginLeft: 12 }}
					onPress={() => navigation.goBack()}
				>
					<AntDesign name='left' size={24} color='white' />
				</TouchableOpacity>
			),
		});
	}, [navigation]);

	return (
		<View style={{ backgroundColor: '#008d92', height: '100%' }}>
			<Image
				source={require('../assets/contactar.jpg')}
				containerStyle={{ width: '100%', height: 220 }}
				PlaceholderContent={<ActivityIndicator />}
			/>

			<ScrollView>
				<Text style={tw('text-2xl text-center font-bold mt-3')}>
					Conoce al Equipo
				</Text>
				<Text style={tw('text-xl text-center font-bold p-2')}>Iago</Text>
				<Text style={tw('text-center m-2')}>El Gallego intranquilo</Text>
				<Image
					source={require('../assets/gerard.jpg')}
					style={[
						tw('rounded-full w-20 h-20  left-2/4  mt-3 mb-1'),
						{ transform: [{ translateX: -40 }] },
					]}
				/>
				<Text style={tw('text-xl text-center font-bold p-2')}>Gerard</Text>
				<Text style={tw('text-center m-2')}>
					Nacido en Espana con sangre vikinga, viviendo a lo loco en Islandia
					entre hielo y lava
				</Text>
				<Text style={tw('text-xl text-center font-bold p-2')}>Niko</Text>
			</ScrollView>
		</View>
	);
};
export default Contactar;
