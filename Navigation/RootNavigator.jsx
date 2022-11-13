import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
	return (
		<RootStack.Navigator>
			<RootStack.Group>
				<RootStack.Screen
					name='main'
					component={TabNavigator}
				></RootStack.Screen>
			</RootStack.Group>
		</RootStack.Navigator>
	);
};
export default RootNavigator;
