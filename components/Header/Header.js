const { View, Image, StyleSheet, Text } = require("react-native");

{
  /* Header component */
}
const Header = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: 150,
    alignContent: "center",
  },
  container: {
    backgroundColor: "#22404c",
    alignContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 10,
  },
});

export default Header;
