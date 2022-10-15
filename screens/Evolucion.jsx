import { View, Text, ScrollView } from 'react-native';
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
		<View>
			<Image
				source={require('../assets/mobile-background.jpg')}
				resizeMode='cover'
				containerStyle={tw('w-full h-full')}
			></Image>
		</View>
	);
};
export default Evolucion;
