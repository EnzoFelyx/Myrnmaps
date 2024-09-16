import { Bell, Headphones } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { Image, StyleSheet, Text, View } from 'react-native';

interface TopoProps {
    topo: string;  // Definindo o tipo da prop 'topo' como string
}

export default function Topo({ topo }: TopoProps) {

    return (
        <View style={styles.topo}>
            <Text style={styles.titulo}>{topo}</Text>

            <View style={styles.utils}>

                <TouchableOpacity>
                    <Bell color="black" size={25} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Headphones color="black" size={25} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image source={{ uri: 'https://avatars.githubusercontent.com/u/101266167?v=4' }} style={styles.foto} />
                </TouchableOpacity>

            </View>
        </View>

    )
}

const styles = StyleSheet.create({

    titulo: {
        fontSize: 24,
        fontWeight: "600",
    },
    topo: {
        paddingVertical: 20,
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
    },
    utils: {
        flexDirection: 'row',
        gap: 20,
        justifyContent: "space-between",
        alignItems: 'center',
        borderWidth: 0.5,
        borderRadius: 30,
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginRight: 8,
    },
    foto: {
        height: 30,
        width: 30,
        borderRadius: 25,

    }
})