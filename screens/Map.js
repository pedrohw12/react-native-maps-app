import {
  Button,
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Layout from "../components/Layout/Layout";
import MapView, { Marker, Callout } from "react-native-maps";
import places from "../services/places";

export default function Map({ navigation }) {
  return (
    <Layout>
      <MapView
        initialRegion={{
          latitude: 50.719391,
          longitude: -1.98114,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
      >
        {Object.values(places)
          // .slice(0, 10)
          .map((place) => (
            <Marker
              // onPress={() => navigation.navigate("Details", { place })}
              key={place.id}
              title={place.title}
              description={place.description}
              coordinate={{
                latitude: String(place.location.latitude),
                longitude: String(place.location.longitude),
              }}
            >
              <Callout tooltip={false}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Details", { place })}
                >
                  <Text>{place.title}</Text>
                  <Text>{place.description}</Text>
                </TouchableOpacity>
              </Callout>
            </Marker>
          ))}
      </MapView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
