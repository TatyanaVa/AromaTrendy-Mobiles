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
      avatar:{
        flex:1,
        marginHorizontal:15,
        marginVertical:45,
        marginBottom: 40,
      },
      header:{
        flexDirection:'row',
        gap:15,
        alignItems:'center'
      },
      icon:{
        alignItems:"flex-end",
        flex:1
      },iconProfile:{
        alignItems:"flex-end",
        flex:1
      },
      modal:{
        padding:20,
        margin:20,
        marginHorizontal:20,
        backgroundColor:'#FF1493',
        
        shadowColor: '#000',
        borderRadius:10,
        gap:10,
      },
      modalProduct: {
        flex: 1,
        padding: 20,
        margin: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',  
        borderRadius: 10,
        justifyContent: 'center',
    },
      titleProfile: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#F5F5F5',
        
      },
      inputProfile: {
        marginBottom: 15,
      },
      buttonProfile: {
        marginTop: 10,
        backgroundColor: '#9400D3',
      },
      imageProfile: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        borderRadius: 10,  
      },
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover',  
        justifyContent: 'center',
        padding: 10,
        gap:10,
        marginBottom: 20,
        borderRadius: 10,  
      },
      rootListProduct:{
        flexDirection:'row',
        padding:30,
        alignItems:'center',
        gap:20,
        marginBottom:5,
      },
      fabProduct:{
        position:'absolute',
        bottom:20,
        right:15
      },
      rootInputsProducto:{
        flexDirection:'row',
        gap:35
      }
})