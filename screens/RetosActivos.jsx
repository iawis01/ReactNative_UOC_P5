import { View, Text, ActivityIndicator } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { Image } from '@rneui/themed';

const RetosActivos = () => {
	const tw = useTailwind();
	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	});

	return (
		<View style={{ backgroundColor: '#e4d0a3' }}>
			<Image
				source={require('../assets/activos.jpg')}
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
				}}
			>
				Contenido
			</Text>
		</View>
	);
};
export default RetosActivos;
