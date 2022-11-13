import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';

const Perfil = () => {
	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Perfil',
			headerStyle: {
				backgroundColor: '#e0eab5',
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
		<View style={{ backgroundColor: '#e0eab5', height: '100%' }}>
			<Image
				source={require('../assets/perfil.jpg')}
				containerStyle={{ width: '100%', height: 220 }}
				PlaceholderContent={<ActivityIndicator />}
			/>
			<View></View>
			<Text
				style={{
					color: 'white',
					fontSize: 42,
					lineHeight: 84,
					margin: 5,
					fontWeight: 'bold',
					textAlign: 'center',
					backgroundColor: '#000000c0',
					height: 100,
				}}
			>
				Contenido
			</Text>
		</View>
	);
};
export default Perfil;
