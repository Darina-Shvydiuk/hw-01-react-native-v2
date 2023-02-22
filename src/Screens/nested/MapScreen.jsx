import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView,{Marker} from 'react-native-maps';
export default MapScreen = ({route}) => {
  const { latitude, longitude } = route.params.coordinates;
  const { title, location } = route.params;
  return (
    <View style={styles.container}>
      <MapView style={{ flex: 1 }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006
        }}>
        <Marker coordinate={{
          latitude,
          longitude,
        }}
        title={title}
        description={location}
        />
     </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})