import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { TailwindProvider, useTailwind } from 'tailwind-rn';
import Inicio from './components/Inicio';
import Navegador from './components/Navegador';

import utilities from './tailwind.json';

export default function App() {
	const tw = useTailwind();
	return (
		<TailwindProvider utilities={utilities}>
			<View style={{ flex: 1 }}>
				<ImageBackground
					source={require('./assets/mobile-background.jpg')}
					resizeMode='cover'
					style={{ flex: 1, justifyContent: 'center' }}
				>
					<Navegador />
				</ImageBackground>

				<StatusBar style='auto' />
			</View>
		</TailwindProvider>
	);
}
