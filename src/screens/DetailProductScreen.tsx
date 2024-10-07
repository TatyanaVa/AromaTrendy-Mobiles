import React, { useEffect, useState } from "react";
import { ImageBackground, View } from "react-native";
import {Button, Divider,Text, TextInput, IconButton,} from "react-native-paper";
import { styles } from "../theme/styles";
import { useRoute, useNavigation } from '@react-navigation/native';
import { Product } from "./HomeScreen/HomeScreen";
import { ref, remove, update } from "firebase/database";
import { dbRealTime } from "../config/firebaseConfig";

export const DetailProductScreen = () => {

    const route=useRoute();
    //console.log(route);
    //@ts-ignore
    const {product}=route.params;
    console.log(product);

    const navigation=useNavigation();

    const [formEdit, setFormEdit] = useState<Product>({
        id:'',
        code:'',
        nameProduct:'',
        price:0,
        stock:0,
        description:''
    });
    useEffect(()=>{
        setFormEdit(product);
    },[]);

    const handleSetValues=(key:string,value:string)=>{
        setFormEdit({...formEdit,[key]:value})
    }

    const handleUpdateProduct=async()=>{
       // console.log(formEdit);
        const dbRef=ref(dbRealTime,'products/'+ formEdit.id)
        try{
        await update(dbRef,{
            code:formEdit.code,
            nameProduct:formEdit.nameProduct,
            price:formEdit.price,
            stock:formEdit.stock,
            description:formEdit.description
        });
        navigation.goBack();
    }catch(e){
        console.log(e);
    }
}
    

    const handleDeleteProduct=async()=>{
        const dbRef=ref(dbRealTime,'products/'+formEdit.id);
        try{
        await remove(dbRef);
        navigation.goBack();
    }catch(e){
        console.log(e);
       
    }
    
}

  return (
    <View style={styles.rootDetail}>
      <View></View>
      <View style={styles.containerDetail}>
        <Text variant="headlineSmall" style={styles.titleDetail}>
          Código:</Text>
        <TextInput value={formEdit.code}
        onChangeText={(value)=>handleSetValues('code',value)}
        />
        <View>
          <Text variant="bodyLarge" style={styles.titleDetail}>
            Nombre
          </Text>
          <TextInput value={formEdit.nameProduct} 
          onChangeText={(value)=>handleSetValues('nameProduct',value)}/>
        </View>
        <View>
          <Text variant="bodyLarge" style={styles.titleDetail}>
            Precio
          </Text>
          <TextInput value={formEdit.price.toString()} 
          onChangeText={(value)=>handleSetValues('price',value)}/>
        </View>
        <View>
          <Text variant="bodyLarge" style={styles.titleDetail}>
            Stock
          </Text>
          <TextInput value={formEdit.stock.toString()} 
          onChangeText={(value)=>handleSetValues('stock',value)}/>
        </View>
        <View>
          <Text variant="bodyLarge" style={styles.titleDetail}>
            Descripción</Text>
          <TextInput 
            value={formEdit.description}
            onChangeText={(value)=>handleSetValues('description',value)}
            multiline 
            numberOfLines={3} />
        </View>
        <View>
        <Button
          mode="outlined"
          icon="update"
          style={styles.buttonDetail}
          onPress={handleUpdateProduct}
        >
          Actualizar
        </Button>

        <Button
          mode="outlined"
          icon="delete"
          style={styles.buttonDetail}
          onPress={handleDeleteProduct}
        >
          Eliminar
        </Button>
      </View>
      </View>
      
      <Divider />
    </View>
  );
};
