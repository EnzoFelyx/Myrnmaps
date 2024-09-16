import axios from 'axios';
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync
} from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';
import teste from '../../assets/teste.png';
import { Input } from '../../components/Input';
import { Modal } from '../../components/Modal';
import Search from '../../components/Search';
import Topo from '../../components/Topo';
import { GOOGLE_MAPS_API_KEY } from '../../constants';
import { newLocation, pinList } from '../../services/requests/newLocation';
import { styles } from '../../styles';
import { RouteProp, useIsFocused, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../components/Local';

type PlaceDetails = {
  latitude: number;
  longitude: number;

} | null;

enum MODAL {
  NONE = 0,
  UPDATE_TRIP = 1,
}

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
  subtitle: string,
}

type RoutePropType = RouteProp<RootStackParamList, 'Home'>;

export default function Home() {

  const [selectedPlace, setSelectedPlace] = useState<PlaceDetails>(null);
  const [marker, setMarker] = useState<PlaceDetails>(null);

  const [address, setAddress] = useState<string[] | null>(null);
  const [pinMarkers, setPinMarkers] = useState([]);

  const [pin, setPin] = useState("")
  const [subtitle, setSubtitle] = useState("")

  const [showModal, setShowModal] = useState(MODAL.NONE)

  const estaNaTela = useIsFocused();


  const route = useRoute<RoutePropType>();

  const handleCoordenadasChange = (newCoordenadas: PlaceDetails) => {
    setMarker(newCoordenadas)
    setSelectedPlace(null)
    setSelectedPlace(newCoordenadas)
  };

  const handleMapPress = (e: MapPressEvent) => {
    const newMarker = e.nativeEvent.coordinate;
    setMarker(newMarker);
  };

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();
    if (granted) {
      const currentPossition = await getCurrentPositionAsync();
      setSelectedPlace({
        latitude: currentPossition.coords.latitude,
        longitude: currentPossition.coords.longitude,
      });
    }
  }

  const fetchAddressFromCoordinates = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
      );
      if (response.data.results.length > 0) {
        const addressComponents = response.data.results[0]?.address_components || [];
        const resultado = [
          latitude,
          longitude,
          addressComponents[0]?.long_name,
          addressComponents[1]?.long_name,
          addressComponents[2]?.long_name,
          addressComponents[3]?.long_name,
          addressComponents[4]?.short_name,
          addressComponents[5]?.long_name,
          addressComponents[6]?.long_name
        ].filter(Boolean);
        setAddress(resultado);
      } else {
        setAddress(null);
      }

    } catch (error) {
      console.error(error);
      console.log('Erro ao buscar o endereço');
    }
  };

  async function CriarCheckPoint() {
    const args = [pin, subtitle, ...(address ?? [])];
    const sanitizedArgs = args.map(value => value ?? "");

    const resultado = await newLocation(...sanitizedArgs);

    const mensagem = resultado === 'Sucesso'
      ? 'Local salvo com sucesso!'
      : 'Erro ao criar localização';

    Alert.alert(mensagem);
  }

  const fetchData = async () => {
    try {
      const retorno = await pinList();
      setPinMarkers(retorno);
    } catch (error) {
      console.error("Erro ao buscar a lista de cesta:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [marker, estaNaTela]);

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  useEffect(() => {
    if (route.params?.latitude && route.params?.longitude) {
      setSelectedPlace({
        latitude: route.params.latitude,
        longitude: route.params.longitude,
      });
    }
  }, [route]);


  return (<>

    <StatusBar barStyle={'dark-content'} backgroundColor={"white"} />

    <View style={styles.container}>

      <Topo topo='MyMaps' />

      <Search onCoordenadasChange={handleCoordenadasChange} />

      <View style={styles.containerMapa}>
        {
          selectedPlace &&
          <MapView
            style={styles.map}
            showsUserLocation
            region={{
              latitude: selectedPlace.latitude,
              longitude: selectedPlace.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            onPress={handleMapPress}
          >

            {marker && (
              <Marker
                coordinate={{
                  latitude: marker?.latitude,
                  longitude: marker?.longitude,
                }}
              />
            )}

            {pinMarkers.map((marker: MarkerType) => (

              <Marker
                key={marker.id}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.nome}
                description={marker.subtitle}
                image={teste}
              />
            ))}
          </MapView>
        }
      </View>


      {marker &&
        <TouchableOpacity

          style={styles.caixa}
          onPress={() => {
            if (marker && marker.latitude !== undefined && marker.longitude !== undefined) {
              fetchAddressFromCoordinates(marker.latitude, marker.longitude);
            } else {
              console.log('Coordenadas não disponíveis');
            }
          }}
          onPressIn={() => setShowModal(MODAL.UPDATE_TRIP)}
        >
          <Text style={styles.texto}>Adicionar local</Text>

        </TouchableOpacity>
      }

      <Modal
        title="Dê um nome ao destino"
        subtitle="Confira os dados antes de salvar"
        visible={showModal === MODAL.UPDATE_TRIP}
        onClose={() => setShowModal(MODAL.NONE)}
      >
        <View style={{ marginVertical: 4 }}>
          <Input>
            <Input.Field
              placeholder="Dê um título para o pin"
              onChangeText={setPin}
            />
          </Input>

          <Input>
            <Input.Field
              placeholder="Sobre o que é?"
              onChangeText={setSubtitle}
            />
          </Input>

          <View style={styles.info}>
            {address?.[3] &&
              <Text style={styles.infoText}>{address?.[3]}, {address?.[2]}</Text>}
          </View>

          <View style={{ flexDirection: 'row', gap: 16 }}>

            <View style={styles.info}>
              <Text style={styles.infoText}>{address?.[5]}</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoText}>{address?.[4]}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', gap: 16 }}>

            <View style={styles.info}>
              <Text style={styles.infoText}>{address?.[8]}</Text>
            </View>

            <View style={styles.info}>
              {address?.[6] && address?.[7] &&
                <Text style={styles.infoText}>{address?.[6]} / {address?.[7]}</Text>}
            </View>

          </View>

          <TouchableOpacity
            style={styles.infoCaixa}
            onPress={() => {
              if (pin !== "") {
                CriarCheckPoint();
                setMarker(null)
                setShowModal(MODAL.NONE)
              } else {
                console.log('escolha um nome');
              }
            }}
          >
            <Text style={styles.texto}>Confirmar</Text>
          </TouchableOpacity>

        </View>

      </Modal>


    </View >
  </>

  );
}

const toInputBoxStyles = StyleSheet.create({

  container: {
    backgroundColor: "#ffff",
    flex: 0
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },

  TextInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
})

