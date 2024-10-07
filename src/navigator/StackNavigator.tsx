import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegistroScreen } from '../screens/RegistroScreen';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { styles } from '../theme/styles';
import { DetailProductScreen } from '../screens/DetailProductScreen';

interface Routes{
  name:string;
  screen:()=> JSX.Element;
  headerShow?:boolean;
} 

const routeNoAuth: Routes[]=[
  {name:'Login',screen:LoginScreen},
  {name:'Register',screen:RegistroScreen}
];

const routesAuth:Routes[]=[
  {name:'Home',screen:HomeScreen},
  {name:'Detail',screen:DetailProductScreen,headerShow:true}
];

const Stack = createStackNavigator();

export const StackNavigator=()=> {

  const [isAuth, setIsAuth] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(()=>{
    setIsLoading(true);
    onAuthStateChanged(auth,(user)=>{
      if(user){
        //console.log(user);
        setIsAuth(true);
      }
      setIsLoading(false);
    });
  },[]);
  return (
    <>
    {isLoading?(
    <View style={styles.rootActivity}>
    <ActivityIndicator 
    animating={true} 
    size="large"
    color="#EE82EE"
     />
    </View>
    ):(
    <Stack.Navigator>
      {
        !isAuth?
        routeNoAuth.map((item,index)=>(
          <Stack.Screen key={index}
          name={item.name} 
          options={{headerShown:false}} 
          component={item.screen} />
        ))
        :
        routesAuth.map((item,index)=>(
          <Stack.Screen key={index}
          name={item.name} 
          options={{headerShown:item.headerShow ?? false}} 
          component={item.screen} />
        ))
      }
      
      {/*<Stack.Screen name="Register"  options={{headerShown:false}} component={RegistroScreen} />*/}
    </Stack.Navigator>
    )}
    </>
  );
}