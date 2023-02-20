import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView,{Marker} from 'react-native-maps';
export default MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView style={{ flex: 1 }}
        initialRegion={{
          latitude: 50.50024847225177,
          longitude: 30.44164684541907,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006
        }}>
        <Marker coordinate={{
          latitude: 50.50024847225177,
          longitude: 30.44164684541907
        }} />
     </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})