import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Map, MapPinned } from 'lucide-react-native';
import home from "./app";
import locations from "./app/locations";

const Tab = createBottomTabNavigator();

function Routes() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#9fe801',
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "#171629",
                    borderTopWidth: 0,
                    position: "absolute",
                    height: 60,
                }
            }}
        >
            <Tab.Screen
                name='Home'
                component={home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Map size={size} color={color} />
                        }
                        return <Map size={size} color={color} />
                    }
                }}
            />
            <Tab.Screen
                name='Locais'
                component={locations}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <MapPinned size={size} color={color} />
                        }
                        return <MapPinned size={size} color={color} />
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default Routes;

