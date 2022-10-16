import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { Image } from '@rneui/themed';

const Evolucion = () => {
	const tw = useTailwind();
	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	});

	return (
		<ScrollView style={{ backgroundColor: '#95d7e7' }}>
			<Image
				source={require('../assets/evolucion.jpg')}
				containerStyle={{ width: '100%', aspectRatio: 3 / 2 }}
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
		</ScrollView>
	);
};
export default Evolucion;
