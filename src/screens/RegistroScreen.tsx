import React, { useState } from "react";
import { View, ImageBackground } from "react-native";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { styles } from "../theme/styles";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";

//interface -FormRegister
interface FormRegister {
  email: string;
  password: string;
}
//interface-message
interface ShowMessage {
  visible: boolean;
  message: string;
  color: string;
}

export const RegistroScreen = () => {
  const [formRegister, setFormRegister] = useState<FormRegister>({
    email: "",
    password: "",
  });

  const [showMessage, setShowMessage] = useState<ShowMessage>({
    visible: false,
    message: "",
    color: "#fff",
  });

  const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

  const navigation = useNavigation();


  const handleSetValues = (key: string, value: string) => {
    setFormRegister({ ...formRegister, [key]: value });
  };

  const handleRegister = async () => {
    if (!formRegister.email || !formRegister.password) {
      setShowMessage({
        visible: true,
        message: "Completa todos los campos",
        color: "#FF69B4",
      });
      return;
    }
    console.log(formRegister);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        formRegister.email,
        formRegister.password
      );
      setShowMessage({
        visible: true,
        message: "Registro exitoso",
        color: "#3CB371",
      });
    } catch (e) {
      console.log(e);
      setShowMessage({
        visible: true,
        message: "No se logró completar la transacción, intente más tarde!",
        color: "#FF69B4",
      });
    }
  };

  return (
    <ImageBackground
    source={require('../theme/perfume.jpg')}
    style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Regístrate</Text>
        <TextInput
          label="Correo"
          mode="outlined"
          placeholder="Escribe tu correo"
          style={styles.input}
          onChangeText={(value) => handleSetValues("email", value)}
        />
        <TextInput
          label="Contraseña"
          mode="outlined"
          placeholder="Escribe tu contraseña"
          secureTextEntry={hiddenPassword}
          style={styles.input}
          right={<TextInput.Icon icon="eye" onPress={()=>setHiddenPassword(!hiddenPassword)}/>}
          onChangeText={(value) => handleSetValues("password", value)}
        />
        <Button
          mode="contained"
          onPress={handleRegister}
          style={styles.registerButton}
        >
          Registrar
        </Button>
        <Text style={styles.textRedirect}
        onPress={()=>navigation.dispatch(CommonActions.navigate({name:'Login'}))}>
        Ya tienes una cuenta?, Inicia Sesión</Text>
        <Snackbar
          visible={showMessage.visible}
          onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
          style={{ ...styles.message, backgroundColor: showMessage.color }}
        >
          {showMessage.message}
        </Snackbar>
      </View>
      </ImageBackground>
  );
};
