import { View, ImageBackground } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import { img } from '../assets/mobile-background.jpg';
import Navegador from './Navegador';
const Inicio = () => {
	const tw = useTailwind();

	return (
		<View style={{ flex: 1 }}>
			<ImageBackground
				source={require('../assets/mobile-background.jpg')}
				resizeMode='cover'
				style={{ flex: 1, justifyContent: 'center' }}
			>
				<Navegador />
			</ImageBackground>
		</View>
	);
};
export default Inicio;
