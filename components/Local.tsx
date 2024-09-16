import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ChevronRight, Pin } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MarkerType {
    cep: string,
    city: string,
    country: string,
    id: number,
    latitude: number,
    lograd: string,
    longitude: number,
    neigh: string,
    nome: string,
    num: string,
    state: string,
    subtitle: string
}

// types.ts
export type RootStackParamList = {
    Home?: { latitude: number; longitude: number };
};


export default function Local({
    latitude,
    longitude,
    nome,
    subtitle,
    lograd = "",
    num = "",
    city = "",
    state = "",
    country = "",
}: MarkerType) {

    const formatAddressComponent = (component: string | undefined) => {
        return component && component.length > 0 ? `${component}, ` : '';
    };

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const aoPressionar = () => {
        navigation.navigate('Home', { latitude, longitude });  
    };

    const enderecoCompleto = `${formatAddressComponent(lograd)}${num ? `${num} - ` : ''}${formatAddressComponent(city)}${state ? `${state} - ` : ''}${formatAddressComponent(country)}`;

    const limitarTexto = (texto: string, limite: number) => {
        return texto.length > limite ? texto.slice(0, limite) + "..." : texto;
    };


    return <View style={{ marginHorizontal: 8 }}>
        <TouchableOpacity
            style={{}}
            onPress={aoPressionar}
        >
            <View style={estilos.container}>
                <Pin size={30} color={"#52514F"} style={{ marginLeft: 8 }} />
                <View style={{ paddingHorizontal: 16, marginLeft: 8, }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>{nome}</Text>
                    <Text style={{ fontSize: 14, fontWeight: "500" }}>{subtitle}</Text>
                    <Text>{limitarTexto(enderecoCompleto, 30)}</Text>
                </View>
                <ChevronRight size={16} color={"black"} style={{ right: 16, position: "absolute" }} />
            </View>
        </TouchableOpacity>
    </View>
}

const estilos = StyleSheet.create({
    container: {
        borderWidth: 0.5,
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginBottom: 24,

    },
})