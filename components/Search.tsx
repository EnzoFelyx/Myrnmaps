import { X } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '../constants';

type PlaceDetails = {
    latitude: number;
    longitude: number;

} | null;

type SearchProps = {
    onCoordenadasChange: (coordenadas: PlaceDetails) => void;
};

export default function Search({ onCoordenadasChange }: SearchProps) {

    const googlePlacesRef = useRef<GooglePlacesAutocompleteRef>(null);
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleClearInput = () => {
        if (googlePlacesRef.current) {
            googlePlacesRef.current.setAddressText('');
            setInputValue('');
        }
    };

    return (
        <GooglePlacesAutocomplete
            ref={googlePlacesRef}
            fetchDetails={true}
            placeholder='Pesquisar'
            onPress={(data, details = null) => {
                if (details) {
                    const latitude = details.geometry.location.lat ?? 0;
                    const longitude = details.geometry.location.lng ?? 0;

                    const newCoordenadas: PlaceDetails = {
                        latitude: latitude,
                        longitude: longitude,
                    };

                    if (newCoordenadas.latitude && newCoordenadas.longitude) {
                        onCoordenadasChange(newCoordenadas);
                    } else {
                        console.log("Coordenadas inválidas, função não foi chamada");
                    }
                }
            }}
            query={{
                key: GOOGLE_MAPS_API_KEY,
                language: 'en',
            }}
            styles={toInputBoxStyles}
            onFail={(error) => console.log(error)}
            renderRightButton={() => (
                inputValue.length > 0 && isFocused === true ? (
                    <TouchableOpacity
                        onPress={handleClearInput}
                        style={{ position: 'absolute', right: 0, alignSelf: 'center', marginRight: 16 }}
                    >
                        <X color="black" size={16} style={{ backgroundColor: "#ffff", borderRadius: 15 }} />
                    </TouchableOpacity>
                ) : <></>
            )}
            textInputProps={{
                onChangeText: (text: string) => {
                    setInputValue(text);
                },
                onFocus: () => setIsFocused(true),
                onBlur: () => setIsFocused(false),
                cursorColor: "#DDDDDF"
            }}
        />

    );
}

const toInputBoxStyles = StyleSheet.create({

    container: {
        flex: 0,
        paddingHorizontal: 10,
        backgroundColor: "#FFFF",
        marginBottom: 16,
    },
    textInput: {
        paddingHorizontal: 16,
        height: 50,
        backgroundColor: "#DDDDDF",
        borderWidth: 0.5,
        borderRadius: 20,
        fontSize: 18,
    },

    TextInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    },
})

