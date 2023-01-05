import React, { useCallback, useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@rneui/themed';
import Component from './components/MyComponent';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import Entypo from '@expo/vector-icons/Entypo';

SplashScreen.preventAutoHideAsync();

const theme = createTheme({
	lightColors: {},
	darkColors: {},
});

export default function App() {
	const [appIsReady, setAppIsReady] = useState(false);

	useEffect(() => {
		async function prepare() {
			try {
				// Pre-load fonts, make any API calls you need to do here
				await Font.loadAsync(Entypo.font);
				// Artificially delay for four seconds to simulate a slow loading
				await new Promise(resolve => setTimeout(resolve, 4000));
			} catch (e) {
				console.warn(e);
			} finally {
				// Tell the application to render
				setAppIsReady(true);
			}
		}

		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);
	return (
		<TailwindProvider utilities={utilities}>
			<NavigationContainer>
				<RootNavigator onLayout={onLayoutRootView} />
				<StatusBar style='auto' />
			</NavigationContainer>
		</TailwindProvider>
	);
}
