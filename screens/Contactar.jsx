import { View, Text, ActivityIndicator } from 'react-native';
import { Image } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
const Contactar = () => {
	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	});

	return (
		<View style={{ backgroundColor: '#008d92' }}>
			<Image
				source={require('../assets/contactar.jpg')}
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
export default Contactar;
