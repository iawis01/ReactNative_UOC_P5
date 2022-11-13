import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { Image } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';

const NuevoReto = () => {
	const tw = useTailwind();
	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					style={{ marginRight: 12 }}
					onPress={() => navigation.navigate('Evolucion')}
				>
					<AntDesign name='home' size={24} color='white' />
				</TouchableOpacity>
			),
			headerLeft: () => (
				<TouchableOpacity
					style={{ marginLeft: 12 }}
					onPress={() => navigation.goBack()}
				>
					<AntDesign name='left' size={24} color='white' />
				</TouchableOpacity>
			),
			title: 'Agregar Reto',
			headerStyle: {
				backgroundColor: '#998830',
			},
			headerTitleStyle: {
				color: navigation.isFocused ? '#fff' : 'gray',
				fontWeight: 'bold',
			},
		});
	}, [navigation]);

	return (
		<View style={{ backgroundColor: '#998830', height: '100%' }}>
			<Image
				source={require('../assets/new-goal.jpg')}
				containerStyle={{ width: '100%', height: 220 }}
				PlaceholderContent={<ActivityIndicator />}
			/>
			<Text
				style={{
					color: 'white',
					fontSize: 42,
					lineHeight: 84,
					margin: 5,
					fontWeight: 'bold',
					textAlign: 'center',
					backgroundColor: '#000000c0',
				}}
			>
				Contenido
			</Text>
		</View>
	);
};
export default NuevoReto;
