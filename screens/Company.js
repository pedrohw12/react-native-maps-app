import {
  Button,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Layout from "../components/Layout/Layout";
import Card from "../components/Card/Card";
import companies from "../services/company";
import { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Company = ({ navigation }) => {
  const renderItem = ({ item }) => {
    return (
      // Container clickable, button nao permite elementos. Touchable...
      <TouchableOpacity
        onPress={() => navigation.navigate("CompanyDetails", { company: item })}
        key={item.id}
      >
        <View style={styles.itemList}>
          <MaterialCommunityIcons
            name="arrow-right-thin"
            size={30}
            color={"#22404c"}
            style={styles.icon}
          />
          <Text style={styles.itemListText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Layout>
      {/* ScrollView: sessoes diferentes q preciso scrollar, mais elementos q nao cabem na tela vs 
      FlatList has better performance for Lists (pagination) */}
      <FlatList
        data={Object.values(companies)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  itemList: {
    padding: 30,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "left",
  },
  itemListText: {
    fontSize: 20,
  },
  icon: {
    marginRight: 15,
  },
});

export default Company;
