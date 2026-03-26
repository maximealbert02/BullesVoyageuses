import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../services/AuthContext';


const styles = require('../style')

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
    