import React from 'react'
import { ImageBackground, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { styles } from '../../../theme/styles'

export const ProductCardComponent = () => {
    return (
        <ImageBackground
            source={require('../../../image/fondo6.png')} style={styles.backgroundImage}>
            <View style={styles.rootListProduct}>

                <View  >
                    <Text variant='labelLarge'>Nombre: Aron</Text>
                    <Text variant='bodyMedium'>Precio:54</Text>
                </View>
                <View style={styles.icon}>
                    <IconButton
                        icon="arrow-right-bold-circle-outline"
                        size={25}
                        mode='contained'
                        onPress={() => console.log('Pressed')}
                    />
                </View>
            </View>
        </ImageBackground>
    )
}
