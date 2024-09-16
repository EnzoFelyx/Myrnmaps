import { ReactNode } from "react"
import { TextInput, TextInputProps, View, Platform, ViewProps, StyleSheet } from "react-native"


type InputProps = ViewProps & {
    children: ReactNode
}

function Input({ children }: InputProps) {
    return <View style={estilos.box}
    >{children}</View>
}

function Field({ ...rest }: TextInputProps) {
    return <TextInput style={estilos.texto}
        placeholderTextColor={"gray"}
        cursorColor={"white"}
        {...rest}
    />
}

Input.Field = Field

const estilos = StyleSheet.create({

    box: {
        flex: 1,
        minHeight: 64,
        maxHeight: 64, 
        borderRadius: 15,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        marginTop: 16,
        
    },
    texto: {
        flex: 1,
        fontSize: 18, //
        fontWeight: '400',
    }
})

export { Input }

