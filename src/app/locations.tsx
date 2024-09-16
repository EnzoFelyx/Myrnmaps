import { NavigationProp, useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import localImagem from '../../assets/localImagem.png';
import Local, { RootStackParamList } from '../../components/Local';
import Topo from '../../components/Topo';
import { pinList } from '../../services/requests/newLocation';
import { styles } from "../../styles";
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


export default function Locations() {

  const [pinMarkers, setPinMarkers] = useState<MarkerType[]>([]);
  const estaNaTela = useIsFocused();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const aoPressionar = () => {
    navigation.navigate('Home');
  };

  const fetchData = async () => {
    try {
      const retorno = await pinList();
      setPinMarkers(retorno);
    } catch (error) {
      console.error("Erro ao buscar a lista de cesta:", error);
    }
  };

  const removerLocal = (id: number) => {
    setPinMarkers(prevMarkers => prevMarkers.filter(marker => marker.id !== id));
  };

  useEffect(() => {
    fetchData();
  }, [estaNaTela]);



  return (
    <View style={{ flex: 1, backgroundColor: "#FFFF" }}>
      <Topo topo='Localizações' />
      {pinMarkers.length > 0 ? (<View style={{ marginTop: 24 }}>
        <FlatList
          data={pinMarkers}
          renderItem={({ item }) => <Local {...item} removerLocal={removerLocal} />}
          keyExtractor={({ id }) => String(id)}
          scrollEnabled={true}
          style={{ marginBottom: 60 }}
        />
      </View>) :
        <>
          <View style={styles.checkpoints}>
            <Text style={styles.checkpointsLeg}>Parece que ainda você não seus lugares favoritos salvos!</Text>
            <Text style={styles.checkpointsLeg}>Use o mapa para salvar seus checkpoints!</Text>
            <Image source={localImagem} style={styles.imagem} />
          </View>
          <TouchableOpacity
            style={styles.caixa}
            onPress={aoPressionar}
          >
            <Text style={styles.texto}>Adicionar local</Text>
          </TouchableOpacity>
        </>
      }
    </View>

  )
}