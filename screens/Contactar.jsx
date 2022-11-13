import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect, useState } from 'react';
import { Button, ScrollView, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Contactar = () => {
	const initialText = '';
	const [text, setText] = useState(initialText);
	const navigation = useNavigation();

	// Estilo del Header
	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Formulario de contacto',
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

			<ScrollView keyboardDismissMode='interactive'>
				<TextInput
					style={{
						padding: 16,
						marginTop: 50,
					}}
					onChangeText={setText}
					value={text}
					placeholder={'Quieres decirnos algo? escribelo aqui'}
				/>
			</ScrollView>
		</View>
	);
};
export default Contactar;
