import {Slot, useRouter, useSegments} from 'expo-router'
import { AuthProvider, AuthContext } from './services/AuthContext'
import { useContext, useEffect } from 'react'

const RootLayoutNav = () => {
    const auth = useContext(AuthContext);
    if (!auth) {
        throw new Error('RootLayoutNav must be used within AuthProvider');
    }
    const { userToken, isLoading } = auth;
    const segments = useSegments();
    const router = useRouter();

    useEffect(()=> {
        if (isLoading) return;

        const inTabsGroup = segments[0] === '(tabs)';

        if (!userToken) {
            router.replace('/login');
        }else if (userToken && !inTabsGroup) {
            router.replace('/(tabs)')
        }
    }, [userToken, isLoading, segments])

    return <Slot/>

}

export default function Layout(){
    return(
        <AuthProvider>
            <RootLayoutNav/>
        </AuthProvider>
    )
}