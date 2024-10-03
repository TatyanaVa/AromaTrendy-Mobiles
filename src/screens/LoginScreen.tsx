import React, { useState } from "react";
import { View, ImageBackground } from "react-native";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { styles } from "../theme/styles";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";

interface FormLogin {
    email: string;
    password: string;
  }
interface ShowMessage {
    visible: boolean;
    message: string;
    color: string;
  }
export const LoginScreen = () => {
    const [formLogin, setFormLogin] = useState<FormLogin>({
        email:"",
        password:""
    });
const handleSetValues=(key:string,value:string)=>{
        setFormLogin({...formLogin,[key]:value});
    }

    const [showMessage, setShowMessage] = useState<ShowMessage>({
        visible: false,
        message: "",
        color: "#fff",
      });

const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

const navigation = useNavigation();

const handleSignIn=async()=>{
    if (!formLogin.email || !formLogin.password) {
        setShowMessage({
          visible: true,
          message: "Completa todos los campos",
          color: "#FF69B4",
        });
        return;
    }
   // console.log(formLogin);
    try{
    const response=await signInWithEmailAndPassword(
        auth,
        formLogin.email,
        formLogin.password
    );
   // console.log(response);
    }catch(e){
        console.log(e);
    setShowMessage({
        visible:true,
        message:'correo o contraseña incorrecta!',
        color:'#FF69B4'
        })
    }
}
  return (
    <ImageBackground
    source={require('../theme/perfume.jpg')}
    style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>
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
          onPress={handleSignIn}
          style={styles.registerButton}>
          Iniciar
        </Button>
        <Text style={styles.textRedirect}
        onPress={()=>navigation.dispatch(CommonActions.navigate({name:'Register'}))}>
        No tienes una cuenta? Regístrate ahora</Text>
        <Snackbar
          visible={showMessage.visible}
          onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
          style={{ ...styles.message, backgroundColor: showMessage.color }}
        >
          {showMessage.message}
        </Snackbar>
       
      </View>
      </ImageBackground>
  )
}
