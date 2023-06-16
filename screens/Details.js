import {
  Image,
  ScrollView,
  Text,
  StyleSheet,
  View,
  Button,
} from "react-native";
import Layout from "../components/Layout/Layout";
import OpenURLButton from "../components/OpenURLButton/OpenURLButton";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";

const Details = ({ route }) => {
  const place = route.params.place;
  return (
    <Layout>
      <ScrollView>
        <Image
          style={{ width: "100%", height: 200 }}
          source={{ uri: place.imageUrl }}
        />
        <View style={styles.box}>
          <Text style={styles.title}>{place.title}</Text>
          <Text style={styles.subTitle}>{place.subTitle}</Text>
          <Text style={styles.greenBox}>{place.imageDescription}</Text>
          <OpenURLButton
            url={`https://www.nationaltrust.org.uk/place-pages/${place.id}/pages/opening-times-calendar`}
            style={styles.openingTimeStatus}
          >
            <Text style={styles.buttonOpeningTimes}>Opening times</Text>
            {/* {place.openingTimeStatus} */}
          </OpenURLButton>
          <Text style={styles.subTitle}>{place.description}</Text>
          <Text style={styles.subTitle}>{place.activityTagsAsCsv}</Text>
          <OpenURLButton url={place.websiteUrl}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>
                Website <Icon name="external-link" />
              </Text>
            </View>
          </OpenURLButton>
          {/* location/ mapinha (lat, long) */}
          <MapView
            initialRegion={{
              latitude: place.location.latitude,
              longitude: place.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={styles.map}
          >
            <Marker
              title={place.title}
              description={place.subTitle}
              coordinate={place.location}
            />
          </MapView>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 5,
  },
  map: {
    height: 200,
    width: "100%",
  },
  box: {
    margin: 20,
  },
  subTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 20,
    color: "grey",
  },
  greenBox: {
    backgroundColor: "#22404c",
    padding: 20,
    color: "white",
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 20,
    marginBottom: 20,
  },
  openingTimeStatus: {
    color: "red",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#051E23",
    padding: 15,
    marginBottom: 20,
    width: "50%",
    marginLeft: "25%",
    borderRadius: 200,
    flex: 0.3,
    display: "block",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  buttonOpeningTimes: {
    textAlign: "center",
    color: "grey",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Details;
