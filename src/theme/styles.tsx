import { StyleSheet } from "react-native";

export const styles=StyleSheet.create({
    root:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
       // padding:20,
        gap:10
    },
    text: {
        fontSize:25,
        fontWeight:'bold',
        textAlign:'center'
    },
    messages:{

        width:'90%',
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      container: {
        width: '80%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
      },
      title: {
        fontSize: 30,
        color: '#FA8072',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
      input: {
        marginBottom: 15,
        backgroundColor: '#F8F8FF',
      },
      registerButton: {
        backgroundColor: '#FF69B4',
      },
      message: {
        marginTop: 20,
      },
      textRedirect:{
        marginTop:20,
        textAlign:'center',
        fontSize:15,
        fontWeight:'bold',
        color:'#BA55D3'
      },
      rootActivity: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      },
})