import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Locations from './app/locations';
import Home from "./app/index";

const Stack = createNativeStackNavigator();

export default function stackRoutes({ ComponentePrincipal = Home }) { //define home como default

    return <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={ComponentePrincipal} />
        <Stack.Screen name='Locations' component={Locations} />
    </Stack.Navigator>

}