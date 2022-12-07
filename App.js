import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { TailwindProvider, useTailwind } from 'tailwind-rn';
import Inicio from './components/Inicio';
import Navegador from './components/Navegador';
import RootNavigator from './Navigation/RootNavigator';

import utilities from './tailwind.json';

export default function App() {
	const tw = useTailwind();
	return (
		<TailwindProvider utilities={utilities}>
			<NavigationContainer>
				<RootNavigator />
				 <StatusBar style='auto' />
			</NavigationContainer>
		</TailwindProvider>
	);
}
