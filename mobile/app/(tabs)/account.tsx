import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../services/AuthContext';

export default function Account(){
    
    const auth = useContext(AuthContext);
    if (!auth) {
        throw new Error('Error fetching context : AuthContext');
    }
    const { logout } = auth;
    
    
    return (
        <View style={styles.formContainer}>
            <Text>Hello world</Text>
            <TouchableOpacity 
            style={styles.button} 
            onPress={logout}
            >
                <Text style={styles.buttontext}>Disconnect</Text>
            </TouchableOpacity>
        </View>
    )}
    
    const styles = StyleSheet.create({
        button : {
            backgroundColor: '#1E88E5', // Un beau bleu iOS
            height: 55,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            shadowColor: '#007AFF',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 4,
            
        },
        formContainer: {
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 30,
        },
        buttontext : {
            fontWeight : "bold",
            color : "#fff",
            fontSize : 18
        }
    })