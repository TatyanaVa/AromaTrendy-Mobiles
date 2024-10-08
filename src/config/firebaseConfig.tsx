
import { initializeApp } from "firebase/app";
import { initializeAuth,getReactNativePersistence} from "firebase/auth";
import  ReactNativeAsyncStorage  from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";



const firebaseConfig = {
    apiKey: "AIzaSyAZL8t38C8k1DPr2bWhtARI0LwocEBm5a4",
    authDomain: "mobiles-aromatrendy.firebaseapp.com",
    projectId: "mobiles-aromatrendy",
    storageBucket: "mobiles-aromatrendy.appspot.com",
    messagingSenderId: "456958860286",
    appId: "1:456958860286:web:f5a87b56e94554a66f3eaf",
    measurementId: "G-SRF4R7QMYL",
    databaseURL:'https://mobiles-aromatrendy-default-rtdb.firebaseio.com/'
  
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

//export const auth=getAuth(firebase);

export const auth=initializeAuth(firebase,{
    persistence:getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Realtime Database and get a reference to the service
export const dbRealTime = getDatabase(firebase);

