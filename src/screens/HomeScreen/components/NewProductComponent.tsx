import React, { useState } from "react";
import { Button,Divider,IconButton,Modal,Portal,Snackbar,Text,TextInput,
} from "react-native-paper";
import { styles } from "../../../theme/styles";
import { ImageBackground, View } from "react-native";
import { dbRealTime } from "../../../config/firebaseConfig";
import { push, ref, set } from "firebase/database";

interface Props {
  showModalProduct: boolean;
  setShowModalProduct: Function;
}
interface FormProduct {
  code: string;
  nameProduct: string;
  price: number;
  stock: number;
  description: string;
}
interface ShowMessage {
  visible: boolean;
  message: string;
  color: string;
}
export const NewProductComponent = ({
  showModalProduct,
  setShowModalProduct,
}: Props) => {
  const [formProduct, setFormProduct] = useState<FormProduct>({
    code: "",
    nameProduct: "",
    price: 0,
    stock: 0,
    description: "",
  });

  const [showMessage, setShowMessage] = useState<ShowMessage>({
    visible: false,
    message: "",
    color: "#fff",
  });

  const handleSetValues = (key: string, value: string) => {
    setFormProduct({ ...formProduct, [key]: value });
  };

  const handleSaveProduct = async () => {
    if(!formProduct.code || !formProduct.nameProduct || !formProduct.price
            || !formProduct.stock || !formProduct.description){
            setShowMessage({
                visible: true,
                message: "Completa todos los campos",
                color: "#FF69B4",
              })
              return;
          }
    const dbRef=ref(dbRealTime,'products');
        const saveProduct=push(dbRef);
        try{
            await set(saveProduct,formProduct);
            setShowModalProduct(false);
        }catch(e){
            console.log(e);
            setShowMessage({
                visible: true,
                message: "No se completo la transacción, intentalo más tarde",
                color: "#FF69B4",
              });
        }
  };
  return (
    <>
      <Portal>
        <Modal
          visible={showModalProduct}
          contentContainerStyle={styles.modalProduct}
        >
          <ImageBackground
            source={require("../../../image/fondo2.jpg")}
            style={styles.backgroundImage}
          >
            <View style={styles.header}>
              <Text variant="headlineSmall">Nuevo Producto</Text>
              <View style={styles.icon}>
                <IconButton
                  icon="close-circle-outline"
                  size={30}
                  onPress={() => setShowModalProduct(false)}
                />
              </View>
            </View>
            <Divider />
            <TextInput
              label="Código"
              mode="outlined"
              onChangeText={(value) => handleSetValues("code", value)}
            />
            <TextInput
              label="Nombre"
              mode="outlined"
              onChangeText={(value) => handleSetValues("nameProduct", value)}
            />
            <View style={styles.rootInputsProducto}>
              <TextInput
                label="Precio"
                mode="outlined"
                keyboardType="numeric"
                style={{ width: "45%" }}
                onChangeText={(value) => handleSetValues("price", value)}
              />
              <TextInput
                label="Stock"
                mode="outlined"
                style={{ width: "45%" }}
                onChangeText={(value) => handleSetValues("stock", value)}
              />
            </View>
            <TextInput
              label="Descripción"
              mode="outlined"
              onChangeText={(value) => handleSetValues("description", value)}
              multiline
              numberOfLines={3}
            />
            <Button mode="contained" onPress={handleSaveProduct}>
              Agregar
            </Button>
          </ImageBackground>
        </Modal>
        <Snackbar
          visible={showMessage.visible}
          onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
          style={{ ...styles.message, backgroundColor: showMessage.color }}
        >
          {showMessage.message}
        </Snackbar>
      </Portal>
    </>
  );
};
