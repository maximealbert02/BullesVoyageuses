import { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { AuthContext } from "../services/AuthContext";

export default function Index() {

  const [trips, setTrips] = useState([]);
  const [userBookings, setUserBookings] = useState([]);

  const auth = useContext(AuthContext);
  if (!auth) {
      throw new Error('Error fetching context : AuthContext');
  }
  const {make_api_call, isLoading, userToken} = auth

  useEffect(()=>{

    if (isLoading || !userToken) return;

    const fetchData = async () => {
      try{
        await make_api_call('GET', 'http://192.168.1.125:8000/api/bookings/').then((fetchedData)=>{
          setUserBookings(fetchedData);
        });
      }catch(err){
        throw new Error(`Error : ${err}`);
      }
    };
    fetchData();

    
  }, [isLoading, userToken])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{JSON.stringify(userBookings)}</Text>
    </View>
  );
}
