import {
  Button,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-paper";
import Layout from "../components/Layout/Layout";
import Card from "../components/Card/Card";
import places from "../services/places";
import { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FilterModal from "../components/Filter";

const Home = ({ navigation }) => {
  const [filter, setFilter] = useState("");
  const [petFriendly, setPetFriendly] = useState(false);
  const [activitiesItem, setActivitiesItem] = useState([]);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const handleOpenFilterModal = () => {
    setIsFilterModalVisible(true);
  };

  const renderItem = ({ item }) => {
    return (
      // Container clickable, button nao permite elementos. Touchable...
      <TouchableOpacity
        onPress={() => navigation.navigate("Details", { place: item })}
        key={item.id}
      >
        <Card title={item.title} descr={item.description}>
          <Text style={{ marginBottom: 10, zIndex: 10 }}>
            {item?.activityTagsAsCsv}
          </Text>
          <Image
            style={{ width: "100%", height: 100 }}
            source={{ uri: item.imageUrl }}
          />
        </Card>
      </TouchableOpacity>
    );
  };

  const filterItems = () => {
    const placesList = Object.values(places);
    const filterByTitle = placesList.filter((element) =>
      element.title.toLowerCase().includes(filter.toLowerCase())
    );
    const filterByPetFriendly = placesList.filter((itemPlace) =>
      petFriendly ? itemPlace.petFriendly === true : itemPlace
    );

    const filterByTags = placesList.filter((item) => {
      for (let i = 0; i < activitiesItem.length; i++) {
        if (
          item.activityTagsAsCsv &&
          item.activityTagsAsCsv.search(activitiesItem[i]) !== -1
        ) {
          return item;
        }
      }
    });

    if (activitiesItem.length) {
      return filterByTags;
    } else if (petFriendly) {
      return filterByPetFriendly;
    } else if (filter) {
      return filterByTitle;
    } else {
      return placesList;
    }
  };

  const onApplyFilter = (petFriendly, activitiesItem) => {
    setPetFriendly(petFriendly);
    setActivitiesItem(activitiesItem);
    setIsFilterModalVisible(false);
  };

  return (
    <Layout>
      <FilterModal
        isFilterModalVisible={isFilterModalVisible}
        setIsFilterModalVisible={setIsFilterModalVisible}
        onApplyFilter={(petFriendly, activitiesItem) =>
          onApplyFilter(petFriendly, activitiesItem)
        }
      />
      <View style={styles.inputSection}>
        <TextInput
          value={filter}
          onChangeText={setFilter}
          style={styles.input}
          placeholder="Type the place name"
        />
        <TouchableOpacity onPress={handleOpenFilterModal}>
          <MaterialCommunityIcons
            name="filter"
            size={30}
            color={"#22404c"}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      {/* ScrollView: sessoes diferentes q preciso scrollar, mais elementos q nao cabem na tela vs 
      FlatList has better performance for Lists (pagination) */}
      <FlatList
        data={filterItems()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 15,
    marginLeft: 15,
  },
  inputSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 0,
    height: 67,
    width: "100%",
    borderWidth: 2,
    borderColor: "grey",
  },
  input: {
    flex: 1,
    fontSize: 20,
    paddingTop: 0,
    paddingRight: 10,
    paddingBottom: 0,
    backgroundColor: "white",
  },
});

export default Home;
