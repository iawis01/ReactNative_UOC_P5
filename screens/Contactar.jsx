import { View, Text, ActivityIndicator } from 'react-native';
import { Image } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect, useState } from 'react';
import {
	Button,
	InputAccessoryView,
	ScrollView,
	TextInput,
} from 'react-native';

const Contactar = () => {
	const inputAccessoryViewID = 'uniqueID';
	const initialText = '';
	const [text, setText] = useState(initialText);
	const navigation = useNavigation();

	// Estilo del Header
	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Formulario de contacto',
			headerStyle: {
				backgroundColor: '#008d92',
			},
			headerTitleStyle: {
				color: navigation.isFocused ? '#fff' : 'gray',
				fontWeight: 'bold',
			},
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
					inputAccessoryViewID={inputAccessoryViewID}
					onChangeText={setText}
					value={text}
					placeholder={'Quieres decirnos algo? escribelo aqui'}
				/>
			</ScrollView>
			<InputAccessoryView nativeID={inputAccessoryViewID}>
				<Button onPress={() => setText(initialText)} title='Clear text' />
			</InputAccessoryView>
		</View>
	);
};
export default Contactar;
