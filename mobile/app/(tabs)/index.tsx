import { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";

export default function Index() {

  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    console.log("la page vient d'arriver")
    fetch('http://192.168.1.125:8000/api/trips/').then(response => {
      if (!response.ok) throw new Error("Network error");
      return response.json()
    }).then(data => {
      console.log(data)
      setTrips(data);
      setIsLoading(false)
    }).catch(error => {
      console.log(error)
    })

  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{JSON.stringify(trips)}</Text>
    </View>
  );
}
