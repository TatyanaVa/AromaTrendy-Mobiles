import React, { useEffect, useState } from "react";
import { FlatList, ImageBackground, View } from "react-native";
import {Avatar, Button,Divider,FAB,IconButton,Modal,Portal,Text,TextInput,} from "react-native-paper";
import { styles } from "../../theme/styles";
import { auth, dbRealTime } from '../../config/firebaseConfig';
import firebase, { updateProfile } from "@firebase/auth";
import { ProductCardComponent } from "./components/ProductCardComponent";
import { NewProductComponent } from "./components/NewProductComponent";
import { onValue, ref } from "firebase/database";

interface FormUser {
  name: string;
}

export interface Product{
  id:string;
  code:string,
  nameProduct:string,
  price:number,
  stock:number,
  description:string,
}

export const HomeScreen = () => {
  const [formUser, setFormUser] = useState<FormUser>({
    name: "",
  });

  const [userData, setUserData] = useState<firebase.User | null>(null);

  const [products, setProducts] = useState<Product[]>([]);

  const [showModalProfile, setShowModalProfile] = useState<boolean>(false);

  const [showModalProduct, setShowModalProduct] = useState<boolean>(false);

  useEffect(() => {
    setUserData(auth.currentUser);
    setFormUser({ name: auth.currentUser?.displayName ?? "" })
    getAllProducts();
  }, []);

  const handelSetValues = (key: string, value: string) => {
    setFormUser({ ...formUser, [key]: value });
  };

  const handleUpdateUser = async () => {
    try {
      await updateProfile(userData!, { displayName: formUser.name });
    } catch (e) {
      console.log(e);
    }
    setShowModalProfile(false);
  };

  const getAllProducts=()=>{
    const dbRef=ref(dbRealTime,'products');
    onValue(dbRef,(snapshot)=>{
      const data=snapshot.val();
      const getKeys=Object.keys(data);
      const listProduct:Product[]=[];
      getKeys.forEach((key)=>{
        const value={...data[key],id:key}
        listProduct.push(value);
      });
      setProducts(listProduct);
    })
  }
  return (
    <>
      <View style={styles.avatar}>
        <View style={styles.header}>
          <Avatar.Image
            size={100}
            source={require("../../image/avatar1.jpg")}
          />
          <View>
            <Text variant="titleLarge">Bienvenid@</Text>
            <Text variant="labelLarge">{formUser.name}</Text>
          </View>
          <View style={styles.iconProfile}>
            <IconButton
              icon="account-edit"
              size={30}
              mode="contained"
              onPress={() => setShowModalProfile(true)}
            />
          </View>
        </View>
        <View>
        <FlatList
        data={products}
        renderItem={({item}) => <ProductCardComponent product={item}/>}
        keyExtractor={item => item.id}
      />
        </View>
      </View>
      <Portal>
        <Modal visible={showModalProfile} contentContainerStyle={styles.modal}>
          <View style={styles.header}>
            <Text variant="headlineSmall" style={styles.titleProfile}>
              Mi Perfil
            </Text>
            <View style={styles.icon}>
              <IconButton icon="close-circle-outline" size={30} onPress={() => setShowModalProfile(false)} />
            </View>
          </View>
          <Divider />
          <TextInput
            mode="outlined"
            label="Nombre"
            style={styles.inputProfile}
            value={formUser.name}
            onChangeText={(value) => handelSetValues("name", value)}
          />
          <TextInput
            mode="outlined"
            label="Correo"
            disabled
            style={styles.inputProfile}
            value={userData?.email!}
          />

          <Button
            mode="contained"
            icon="autorenew"
            onPress={handleUpdateUser}
            style={styles.buttonProfile}
            contentStyle={{ flexDirection: "row-reverse" }}
            labelStyle={{ fontSize: 16 }}
          >
            Actualizar
          </Button>
        </Modal>
      </Portal>
      <FAB
        icon="plus"
        style={styles.fabProduct}
        onPress={() => setShowModalProduct(true)}
      />
      <NewProductComponent showModalProduct={showModalProduct}setShowModalProduct={setShowModalProduct}/>
    </>
  );
};
