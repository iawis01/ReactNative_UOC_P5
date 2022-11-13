import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

// import Icons
import { Icon } from '@rneui/themed';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	// Remove header information
	const navigations = useNavigation();
	useLayoutEffect(() => {
		navigations.setOptions({
			headerShown: false,
		});
	});

	// Icons and colors from navigation tab
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabActiveTintColor: 'green',
				tabBarIcon: ({ focused, color, size }) => {
					if (route.name === 'Evolucion') {
						return (
							<Icon
								name='area-graph'
								type='entypo'
								color={focused ? '#95d7e7' : 'gray'}
							/>
						);
					} else if (route.name === 'Nuevo Reto') {
						return (
							<Icon
								name='add-to-list'
								type='entypo'
								color={focused ? '#9a8830' : 'gray'}
							/>
						);
					} else if (route.name === 'Activos') {
						return (
							<Icon
								name='flag'
								type='entypo'
								color={focused ? '#e4d0a3' : 'gray'}
							/>
						);
					} else if (route.name === 'Completados') {
						return (
							<Icon
								name='box'
								type='entypo'
								color={focused ? '#b7c2dd' : 'gray'}
							/>
						);
					}
				},
			})}
		></Tab.Navigator>
	);
};
export default TabNavigator;
