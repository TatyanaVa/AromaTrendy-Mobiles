import React from 'react'
import { ImageBackground, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { styles } from '../../../theme/styles'
import { Product } from '../HomeScreen'
import { CommonActions, useNavigation } from '@react-navigation/native'

interface Props{
    product:Product;
}
export const ProductCardComponent = ({product}:Props) => {
   const navigation =useNavigation();

    return (
        <ImageBackground
            source={require('../../../image/fondo4.jpg')} style={styles.backgroundImage}>
            <View style={styles.rootListProduct}>

                <View  >
                    <Text variant='labelLarge'>{product.nameProduct}</Text>
                    <Text variant='bodyMedium'>$ {product.price}</Text>
                </View>
                <View style={styles.icon}>
                    <IconButton
                        icon="arrow-right-bold-circle-outline"
                        size={25}
                        mode='contained'
                        onPress={() => navigation.dispatch(CommonActions.navigate({name:'Detail',params:{product}}))}
                    />
                </View>
            </View>
        </ImageBackground>
    )
}
