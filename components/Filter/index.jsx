import { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  Modal,
} from "react-native";
// Imports Design Framework
import { RadioButton, TextInput } from "react-native-paper";
import Card from "../Card/Card";
import places from "../../services/places";
import activities from "../../services/activities";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const FilterModal = ({
  isFilterModalVisible,
  setIsFilterModalVisible,
  onApplyFilter,
}) => {
  const [filter, setFilter] = useState("");
  // const [results, setResults] = useState([]);
  const [petFriendly, setPetFriendly] = useState(false);
  const [activitiesItem, setActivitiesItem] = useState([]);

  const handlePetFriendly = () => {
    if (petFriendly === false) {
      setPetFriendly(true);
    } else {
      setPetFriendly(false);
    }
  };

  // useEffect(() => {
  //   if (filter !== "") {
  //     let content = Object.values(places);
  //     let items = content.filter((value) => value.title.includes(filter));
  //     setResults(items);
  //   } else {
  //     setResults([]);
  //   }
  // }, [filter]);

  // activities
  const selectItem = (item) => {
    if (activitiesItem.includes(item)) {
      const filterActivities = activitiesItem.filter((e) => e !== item);
      setActivitiesItem(filterActivities);
    } else {
      setActivitiesItem([...activitiesItem, item]);
    }
  };

  // const renderItem = ({ item }) => {
  //   return (
  //     // Container clickable, button nao permite elementos. Touchable...
  //     <TouchableOpacity
  //       onPress={() => navigation.navigate("Details", { place: item })}
  //       key={item.id}
  //     >
  //       <Card title={item.title} descr={item.description}>
  //         <Image
  //           style={{ width: "100%", height: 200 }}
  //           source={{ uri: item.imageUrl }}
  //         />
  //       </Card>
  //     </TouchableOpacity>
  //   );
  // };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isFilterModalVisible}
      onRequestClose={() => {
        setIsFilterModalVisible(false);
      }}
    >
      <View style={styles.modalView}>
        <TouchableOpacity onPress={handlePetFriendly}>
          <Text>
            Pet Friendly
            <RadioButton
              value={petFriendly}
              label="Pet Friendly"
              status={petFriendly === true ? "checked" : "unchecked"}
            />
          </Text>
        </TouchableOpacity>

        {/* activities */}
        <View>
          {activities.map((item) => (
            <TouchableOpacity key={item} onPress={() => selectItem(item)}>
              <Text>
                {item}
                <RadioButton
                  value={item}
                  label={item}
                  status={
                    activitiesItem.includes(item) ? "checked" : "unchecked"
                  }
                />
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View>
          {/* TouchableOpacity eh mais customizavel */}
          <TouchableOpacity
            onPress={() => onApplyFilter(petFriendly, activitiesItem)}
          >
            <Text>APPLY</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: "green",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default FilterModal;
